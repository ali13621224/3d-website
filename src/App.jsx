import { useEffect, useState } from 'react'
import Footer from './components/layout/Footer.jsx'
import Header from './components/layout/Header.jsx'
import AppointmentDrawer from './components/overlays/AppointmentDrawer.jsx'
import CartDrawer from './components/overlays/CartDrawer.jsx'
import QuickViewModal from './components/overlays/QuickViewModal.jsx'
import SearchOverlay from './components/overlays/SearchOverlay.jsx'
import SizeGuideModal from './components/overlays/SizeGuideModal.jsx'
import WishlistDrawer from './components/overlays/WishlistDrawer.jsx'
import GoldCursor from './components/ui/GoldCursor.jsx'
import Toast from './components/ui/Toast.jsx'
import { RouterProvider, useRouter } from './lib/router.jsx'
import About from './pages/About.jsx'
import Collection from './pages/Collection.jsx'
import Collections from './pages/Collections.jsx'
import Home from './pages/Home.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import { StoreProvider, useStore } from './store/StoreContext.jsx'

function Routes() {
  const { pathname } = useRouter()
  const segments = pathname.split('/').filter(Boolean)
  const [first, second] = segments

  if (segments.length === 0) return <Home />

  switch (first) {
    case 'collections':
      return <Collections />
    case 'collection':
      return second ? <Collection categoryId={second} /> : <Collections />
    case 'product':
      return second ? <ProductDetail slug={second} /> : <Collections />
    case 'about':
      return <About />
    case 'legal':
      return <Legal />
    default:
      return <NotFound />
  }
}

function Shell() {
  const { pathname } = useRouter()
  const { closePanel, closeQuickView } = useStore()
  const [veil, setVeil] = useState(false)

  /* Velvet wipe + reset on every route change. */
  useEffect(() => {
    closePanel()
    closeQuickView()
    window.scrollTo({ top: 0 })
    setVeil(true)
    const timer = setTimeout(() => setVeil(false), 220)
    return () => clearTimeout(timer)
  }, [pathname, closePanel, closeQuickView])

  return (
    <>
      <GoldCursor />
      <Header />
      <main className="content" key={pathname}>
        <Routes />
      </main>
      <Footer />

      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <AppointmentDrawer />
      <SizeGuideModal />
      <QuickViewModal />
      <Toast />
      <div className={`veil${veil ? ' is-on' : ''}`} aria-hidden="true" />
    </>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <Shell />
      </RouterProvider>
    </StoreProvider>
  )
}
