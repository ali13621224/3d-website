import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { jewelById } from '../data/products.js'
import { computePrice } from '../lib/pricing.js'

/**
 * Boutique state: bag, wishlist, display currency and every overlay in the
 * experience. Persisted to localStorage so the bag survives a reload.
 */

const StoreContext = createContext(null)

const STORAGE_KEY = 'eclat.boutique.v1'

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function lineKey({ id, metal, carat, size, engraving }) {
  return [id, metal, carat, size, engraving || ''].join('|')
}

export function StoreProvider({ children }) {
  const saved = useMemo(readStorage, [])

  const [cart, setCart] = useState(() => saved?.cart || [])
  const [wishlist, setWishlist] = useState(() => saved?.wishlist || [])
  const [currency, setCurrency] = useState(() => saved?.currency || 'USD')

  const [panel, setPanel] = useState(null) // 'cart' | 'wishlist' | 'search' | 'appointment' | 'sizeGuide'
  const [quickView, setQuickView] = useState(null) // jewel being previewed
  const [toast, setToast] = useState(null)

  /* ---------- persistence ---------- */

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, currency }))
    } catch {
      /* storage unavailable (private mode) — the session still works */
    }
  }, [cart, wishlist, currency])

  /* ---------- toast ---------- */

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = useCallback((message, tone = 'gold') => setToast({ message, tone }), [])

  /* ---------- bag ---------- */

  const addToBag = useCallback(
    (jewel, { metal, carat, size = '', engraving = '', qty = 1 } = {}) => {
      const chosenMetal = metal || jewel.defaultMetal
      const chosenCarat = carat ?? jewel.carat
      const line = { id: jewel.id, metal: chosenMetal, carat: chosenCarat, size, engraving }
      const key = lineKey(line)

      setCart((current) => {
        const existing = current.find((item) => item.key === key)
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, qty: Math.min(item.qty + qty, 9) } : item,
          )
        }
        return [...current, { ...line, key, qty }]
      })
      notify(`${jewel.name} added to your bag`)
      setPanel('cart')
    },
    [notify],
  )

  const removeLine = useCallback((key) => {
    setCart((current) => current.filter((item) => item.key !== key))
  }, [])

  const setQty = useCallback((key, qty) => {
    setCart((current) =>
      current
        .map((item) => (item.key === key ? { ...item, qty: Math.max(0, Math.min(qty, 9)) } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const clearBag = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  const cartLines = useMemo(
    () =>
      cart.map((item) => {
        const jewel = jewelById(item.id)
        return {
          ...item,
          jewel,
          unitPrice: jewel ? computePrice(jewel, item.metal, item.carat) : 0,
        }
      }),
    [cart],
  )

  const cartSubtotal = cartLines.reduce((total, line) => total + line.unitPrice * line.qty, 0)

  /* ---------- wishlist ---------- */

  const toggleWishlist = useCallback(
    (jewel) => {
      setWishlist((current) => {
        if (current.includes(jewel.id)) {
          notify(`${jewel.name} removed from your wishlist`, 'muted')
          return current.filter((id) => id !== jewel.id)
        }
        notify(`${jewel.name} saved to your wishlist`)
        return [...current, jewel.id]
      })
    },
    [notify],
  )

  const inWishlist = useCallback((id) => wishlist.includes(id), [wishlist])

  const wishlistJewels = useMemo(
    () => wishlist.map((id) => jewelById(id)).filter(Boolean),
    [wishlist],
  )

  /* ---------- overlays ---------- */

  const openPanel = useCallback((name) => setPanel(name), [])
  const closePanel = useCallback(() => setPanel(null), [])
  const openQuickView = useCallback((jewel) => setQuickView(jewel), [])
  const closeQuickView = useCallback(() => setQuickView(null), [])

  const value = useMemo(
    () => ({
      cart: cartLines,
      cartCount,
      cartSubtotal,
      addToBag,
      removeLine,
      setQty,
      clearBag,
      wishlist,
      wishlistJewels,
      toggleWishlist,
      inWishlist,
      currency,
      setCurrency,
      panel,
      openPanel,
      closePanel,
      quickView,
      openQuickView,
      closeQuickView,
      toast,
      notify,
    }),
    [
      cartLines,
      cartCount,
      cartSubtotal,
      addToBag,
      removeLine,
      setQty,
      clearBag,
      wishlist,
      wishlistJewels,
      toggleWishlist,
      inWishlist,
      currency,
      panel,
      openPanel,
      closePanel,
      quickView,
      openQuickView,
      closeQuickView,
      toast,
      notify,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
