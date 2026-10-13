import { CATEGORIES } from '../../data/products.js'
import { CURRENCIES } from '../../data/products.js'
import { NAV_LINKS } from '../../data/site.js'
import { useBodyLock, useEscape } from '../../lib/hooks.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { Close, Globe, Heart, Search, Sparkle } from '../ui/Icons.jsx'

/** Touch-optimised navigation drawer. */
export default function MobileNav({ open, onClose }) {
  const { openPanel, wishlist, setCurrency, currency } = useStore()
  useBodyLock(open)
  useEscape(open, onClose)

  const go = (panel) => {
    onClose()
    openPanel(panel)
  }

  return (
    <div className={`drawer drawer--left${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button type="button" className="scrim" onClick={onClose} tabIndex={open ? 0 : -1} aria-label="Close menu" />
      <aside className="drawer__panel drawer__panel--left" role="dialog" aria-modal="true" aria-label="Menu">
        <header className="panel__head">
          <div>
            <p className="eyebrow eyebrow--muted panel__eyebrow">Éclat Diamonds</p>
            <h3 className="panel__title">The Maison</h3>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </header>

        <div className="panel__body">
          <ul className="mnav__primary">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="mnav__link" onClick={onClose}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mnav__block">
            <p className="eyebrow eyebrow--muted">Shop by piece</p>
            <ul className="mnav__chips">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link to={`/collection/${category.id}`} className="mnav__chip" onClick={onClose}>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mnav__block">
            <p className="eyebrow eyebrow--muted">Services</p>
            <ul className="mnav__list">
              <li>
                <button type="button" className="mnav__row" onClick={() => go('search')}>
                  <Search /> Search the boutique
                </button>
              </li>
              <li>
                <button type="button" className="mnav__row" onClick={() => go('wishlist')}>
                  <Heart /> Wishlist ({wishlist.length})
                </button>
              </li>
              <li>
                <button type="button" className="mnav__row" onClick={() => go('appointment')}>
                  <Sparkle /> Book an appointment
                </button>
              </li>
              <li>
                <button type="button" className="mnav__row" onClick={() => go('sizeGuide')}>
                  <Globe /> Ring size guide
                </button>
              </li>
            </ul>
          </div>

          <div className="mnav__block">
            <p className="eyebrow eyebrow--muted">Currency</p>
            <div className="mnav__currencies">
              {CURRENCIES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={`mnav__chip num${code === currency ? ' is-active' : ''}`}
                  onClick={() => setCurrency(code)}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
