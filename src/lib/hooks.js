import { useEffect, useRef } from 'react'

/** Reveal an element once it scrolls into view (CSS handles the transition). */
export function useReveal(options) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-in')
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px', ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return ref
}

/** Lock body scroll while a drawer, modal or overlay is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [locked])
}

/** Close on Escape. */
export function useEscape(active, onClose) {
  useEffect(() => {
    if (!active) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
}


