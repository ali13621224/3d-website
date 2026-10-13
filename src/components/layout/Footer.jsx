import { useState } from 'react'
import { FOOTER_COLUMNS, SECURITY_BADGES } from '../../data/site.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { ArrowLong, Facebook, Instagram, Pinterest, Sparkle } from '../ui/Icons.jsx'

export default function Footer() {
  const { openPanel, notify } = useStore()
  const [email, setEmail] = useState('')

  const handleAction = (link) => {
    if (link.action) openPanel(link.action)
  }

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    notify('Welcome to the ÉCLAT private salon')
    setEmail('')
  }

  return (
    <footer className="footer">
      <section className="footer__club">
        <div className="shell footer__club-inner">
          <div className="footer__club-copy">
            <p className="eyebrow">The Private Salon</p>
            <h3 className="title-md">Receive Private Salon Invitations &amp; New Releases</h3>
            <p className="footer__club-note">
              One letter a month — new stones, atelier notes and first access to high jewelry.
            </p>
          </div>
          <form className="footer__form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email address"
              autoComplete="email"
            />
            <button type="submit" className="btn btn--solid">
              <span>Subscribe</span>
              <ArrowLong />
            </button>
          </form>
        </div>
      </section>

      <div className="shell footer__main">
        <div className="footer__brand">
          <Link to="/" className="brand brand--footer" aria-label="Éclat Diamonds — home">
            <span className="brand__mark" aria-hidden="true">
              <Sparkle />
            </span>
            <span className="brand__text">
              <span className="brand__name">ÉCLAT</span>
              <span className="brand__sub">Diamonds</span>
            </span>
          </Link>
          <p className="footer__brand-copy">
            Haute joaillerie from Geneva. Every stone hand-chosen, every claw polished in the
            atelier, every piece made to be kept.
          </p>
          <div className="footer__social">
            <Link to="/about" className="icon-btn" aria-label="Instagram">
              <Instagram />
            </Link>
            <Link to="/about" className="icon-btn" aria-label="Facebook">
              <Facebook />
            </Link>
            <Link to="/about" className="icon-btn" aria-label="Pinterest">
              <Pinterest />
            </Link>
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav className="footer__col" key={column.title} aria-label={column.title}>
            <h4 className="footer__col-title">{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  ) : (
                    <button type="button" className="footer__link" onClick={() => handleAction(link)}>
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="shell footer__badges">
        {SECURITY_BADGES.map((badge) => (
          <div className="footer__badge" key={badge.label}>
            <span className="footer__badge-mark" aria-hidden="true" />
            <div>
              <strong>{badge.label}</strong>
              <span>{badge.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="shell footer__base">
        <p>© {new Date().getFullYear()} ÉCLAT Jewelry &amp; Diamonds. All rights reserved.</p>
        <p className="footer__base-links">
          <Link to="/legal">Terms</Link>
          <span aria-hidden="true">·</span>
          <Link to="/legal">Privacy</Link>
          <span aria-hidden="true">·</span>
          <Link to="/legal">Warranty</Link>
        </p>
      </div>
    </footer>
  )
}
