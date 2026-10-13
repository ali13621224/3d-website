import { TRUST_BADGES } from '../../data/products.js'
import { useReveal } from '../../lib/hooks.js'
import { TrustIcon } from '../ui/Icons.jsx'

export default function TrustBar() {
  const revealRef = useReveal()

  return (
    <section className="trust">
      <div className="shell">
        <ul className="trust__grid stagger" ref={revealRef}>
          {TRUST_BADGES.map((badge) => (
            <li className="trust__item" key={badge.id}>
              <span className="trust__icon" aria-hidden="true">
                <TrustIcon name={badge.icon} />
              </span>
              <div>
                <h3 className="trust__title">{badge.title}</h3>
                <p className="trust__copy">{badge.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
