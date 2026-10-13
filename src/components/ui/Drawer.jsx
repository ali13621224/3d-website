import { useBodyLock, useEscape } from '../../lib/hooks.js'
import { Close } from './Icons.jsx'

/**
 * Right-hand slide-over used for the bag, the wishlist and the appointment
 * booking. Kept mounted so the velvet slide transition can play both ways.
 */
export default function Drawer({ open, onClose, title, eyebrow, children, footer, label }) {
  useBodyLock(open)
  useEscape(open, onClose)

  return (
    <div className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="scrim"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close panel"
      />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label={label || title}>
        <header className="panel__head">
          <div>
            {eyebrow && <p className="eyebrow eyebrow--muted panel__eyebrow">{eyebrow}</p>}
            <h3 className="panel__title">{title}</h3>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Close />
          </button>
        </header>
        <div className="panel__body">{children}</div>
        {footer && <div className="panel__foot">{footer}</div>}
      </aside>
    </div>
  )
}
