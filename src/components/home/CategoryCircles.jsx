import { CATEGORIES } from '../../data/products.js'
import { useReveal } from '../../lib/hooks.js'
import { Link } from '../../lib/router.jsx'
import { ART, metalTone } from '../art/JewelryArt.jsx'

/**
 * The circular halo gallery. Seven perfect circles; hovering draws a gold ring
 * around the piece and lifts the stone inside it.
 */
export default function CategoryCircles() {
  const revealRef = useReveal()

  return (
    <section className="section section--tight cats">
      <div className="shell">
        <header className="head-row cats__head">
          <div className="head-row__title">
            <h2 className="title-md">Shop by Piece</h2>
            <span className="head-row__line" aria-hidden="true" />
          </div>
          <p className="micro cats__hint">Swipe to explore</p>
        </header>

        <ul className="cats__rail stagger no-scrollbar" ref={revealRef}>
          {CATEGORIES.map((category) => {
            const Piece = ART[category.art]
            const tone = metalTone('yellow-gold')
            return (
              <li className="cat" key={category.id}>
                <Link to={`/collection/${category.id}`} className="cat__link">
                  <span className="cat__frame">
                    <svg className="cat__halo" viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r="48.5" pathLength="1" />
                    </svg>
                    <span className="cat__art">
                      <Piece tone={tone} />
                    </span>
                  </span>
                  <span className="cat__label">{category.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
