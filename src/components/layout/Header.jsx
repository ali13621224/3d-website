import { useEffect, useRef, useState } from 'react'
import { CATEGORIES, JEWELS } from '../../data/products.js'
import { CURRENCIES } from '../../data/products.js'
import { CURRENCY_META } from '../../lib/currency.js'
import { Link, useRouter } from '../../lib/router.jsx'
import { NAV_LINKS } from '../../data/site.js'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt } from '../art/JewelryArt.jsx'
import { Bag, Chevron, Globe, Heart, Menu, Search, Sparkle, User } from '../ui/Icons.jsx'
import MobileNav from './MobileNav.jsx'

const MEGA_COLLECTIONS = [
  { label: 'Éclat Signature', note: 'Solitaires & studs', to: '/collection/rings' },
  { label: 'Rivière', note: 'Graduated lines of light', to: '/collection/necklaces' },
  { label: 'Couronne', note: 'Halo & crown settings', to: '/collection/engagement' },
  { label: 'Ligne', note: 'Bracelets & rivières', to: '/collection/bracelets' },
  { label: 'Serment', note: 'Wedding bands', to: '/collection/wedding' },
]

const FEATURED = JEWELS.find((jewel) => jewel.badge === 'High Jewelry') || JEWELS[0]

function CurrencyMenu() {
  const { currency, setCurrency } = useStore()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onDocClick = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  return (
    <div className="currency" ref={ref}>
      <button
        type="button"
        className="topbar__link currency__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="currency__globe" />
        <span className="num">{currency}</span>
        <Chevron dir={open ? 'up' : 'down'} className="currency__chev" />
      </button>
      {open && (
        <ul className="currency__menu" role="listbox" aria-label="Display currency">
          {CURRENCIES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === currency}
                className={`currency__option${code === currency ? ' is-active' : ''}`}
                onClick={() => {
                  setCurrency(code)
                  setOpen(false)
                }}
              >
                <span className="num currency__code">{code}</span>
                <span className="currency__name">{CURRENCY_META[code].name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Header() {
  const { cartCount, wishlist, openPanel } = useStore()
  const { pathname } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setNavOpen(false)
  }, [pathname])

  const isActive = (to) => to === pathname || (to !== '/' && pathname.startsWith(to))

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar">
          <div className="shell topbar__inner">
            <p className="topbar__note">
              Free Shipping on Orders Over $5,000
              <span className="topbar__dot" aria-hidden="true" />
              Guaranteed Secure Delivery
            </p>
            <div className="topbar__actions">
              <button type="button" className="topbar__link" onClick={() => openPanel('appointment')}>
                Book an Appointment
              </button>
              <span className="topbar__sep" aria-hidden="true" />
              <button type="button" className="topbar__link" onClick={() => openPanel('appointment')}>
                Track Order
              </button>
              <span className="topbar__sep" aria-hidden="true" />
              <CurrencyMenu />
            </div>
          </div>
        </div>

        <div
          className="navbar"
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="shell navbar__inner">
            <Link to="/" className="brand" aria-label="Éclat Diamonds — home">
              <span className="brand__mark" aria-hidden="true">
                <Sparkle />
              </span>
              <span className="brand__text">
                <span className="brand__name">ÉCLAT</span>
                <span className="brand__sub">Diamonds</span>
              </span>
            </Link>

            <nav className="navbar__nav" aria-label="Main">
              <ul className="navbar__links">
                {NAV_LINKS.map((link) => {
                  const hasMega = link.label === 'Collections'
                  return (
                    <li
                      key={link.label}
                      className={hasMega ? 'has-mega' : undefined}
                      onMouseEnter={hasMega ? () => setMegaOpen(true) : undefined}
                      onFocus={hasMega ? () => setMegaOpen(true) : undefined}
                    >
                      <Link
                        to={link.to}
                        className={`navbar__link${isActive(link.to) ? ' is-active' : ''}`}
                        aria-expanded={hasMega ? megaOpen : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="navbar__tools">
              <button
                type="button"
                className="icon-btn"
                onClick={() => openPanel('search')}
                aria-label="Search the boutique"
              >
                <Search />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => openPanel('appointment')}
                aria-label="VIP lounge and appointments"
              >
                <User />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => openPanel('wishlist')}
                aria-label={`Wishlist, ${wishlist.length} saved`}
              >
                <Heart filled={wishlist.length > 0} />
                {wishlist.length > 0 && <span className="icon-btn__count">{wishlist.length}</span>}
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--bag"
                onClick={() => openPanel('cart')}
                aria-label={`Shopping bag, ${cartCount} items`}
              >
                <Bag />
                {cartCount > 0 && <span className="icon-btn__count">{cartCount}</span>}
              </button>
              <button
                type="button"
                className="icon-btn navbar__burger"
                onClick={() => setNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu />
              </button>
            </div>
          </div>

          <div className={`mega${megaOpen ? ' is-open' : ''}`} onMouseLeave={() => setMegaOpen(false)}>
            <div className="shell mega__inner">
              <div className="mega__col">
                <p className="eyebrow eyebrow--muted">Shop by piece</p>
                <ul className="mega__list">
                  {CATEGORIES.map((category) => (
                    <li key={category.id}>
                      <Link to={`/collection/${category.id}`} className="mega__link">
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega__col">
                <p className="eyebrow eyebrow--muted">The collections</p>
                <ul className="mega__list">
                  {MEGA_COLLECTIONS.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="mega__link mega__link--rich">
                        <span>{item.label}</span>
                        <em>{item.note}</em>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mega__feature">
                <Link to={`/product/${FEATURED.slug}`} className="mega__card">
                  <JewelryArt art={FEATURED.art} metal={FEATURED.defaultMetal} className="mega__art" />
                  <div className="mega__card-body">
                    <p className="eyebrow">{FEATURED.badge}</p>
                    <h4>{FEATURED.name}</h4>
                    <p className="mega__note">The evening, in one line of light.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  )
}
