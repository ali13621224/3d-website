import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * Minimal history router — no dependency, real URLs, back/forward aware.
 *
 * The dev server (and any static host with an SPA fallback) serves index.html
 * for unknown paths, so a refresh on /product/... re-renders the same view.
 * history.pushState/replaceState are wrapped so programmatic navigation from
 * anywhere is observed — pushState alone would not notify a listener.
 */

const RouterContext = createContext(null)

function parse(location) {
  const pathname = (location.pathname || '/').replace(/\/+$/, '') || '/'
  const query = Object.fromEntries(new URLSearchParams(location.search || ''))
  return { pathname, query }
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => parse(window.location))

  useEffect(() => {
    const sync = () => setRoute(parse(window.location))

    const pushState = window.history.pushState
    const replaceState = window.history.replaceState

    window.history.pushState = function patchedPush(...args) {
      const result = pushState.apply(this, args)
      sync()
      return result
    }
    window.history.replaceState = function patchedReplace(...args) {
      const result = replaceState.apply(this, args)
      sync()
      return result
    }

    window.addEventListener('popstate', sync)

    return () => {
      window.removeEventListener('popstate', sync)
      window.history.pushState = pushState
      window.history.replaceState = replaceState
    }
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    const target = to.startsWith('/') ? to : `/${to}`
    if (target === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const method = replace ? window.history.replaceState : window.history.pushState
    method.call(window.history, null, '', target)
  }, [])

  const value = useMemo(
    () => ({ pathname: route.pathname, query: route.query, navigate }),
    [route.pathname, route.query, navigate],
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) throw new Error('useRouter must be used inside RouterProvider')
  return context
}

export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useRouter()
  return (
    <a
      href={to}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        onClick?.(event)
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
