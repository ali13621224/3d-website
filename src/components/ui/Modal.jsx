import { useBodyLock, useEscape } from '../../lib/hooks.js'
import { Close } from './Icons.jsx'

/** Centred dialog with a champagne hairline frame. */
export default function Modal({ open, onClose, title, eyebrow, children, footer, size = 'md' }) {
  useBodyLock(open)
  useEscape(open, onClose)

  return (
    <div className={`modal${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <button
        type="button"
        className="scrim"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        aria-label="Close dialog"
      />
      <div className={`modal__panel modal__panel--${size}`} role="dialog" aria-modal="true" aria-label={title}>
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
      </div>
    </div>
  )
}
