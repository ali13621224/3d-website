import { CATEGORIES, JEWELS } from '../data/products.js'
import { useReveal } from '../lib/hooks.js'
import { Link } from '../lib/router.jsx'
import { ART, metalTone } from '../components/art/JewelryArt.jsx'
import EditorialBanners from '../components/home/EditorialBanners.jsx'
import { ArrowLong } from '../components/ui/Icons.jsx'

/** Entry point to the vault: the named collections and every category. */
export default function Collections() {
  const revealRef = useReveal()

  return (
    <>
      <section className="section vault">
        <div className="shell">
          <header className="page-head">
            <p className="eyebrow">The Vault</p>
            <h1 className="title-lg">Collections</h1>
            <p className="lede">
              Five houses, one atelier. Each collection is built around a single idea — a stone, a
              line, a promise — and finished by hand in Geneva.
            </p>
          </header>

          <ul className="vault__grid stagger" ref={revealRef}>
            {CATEGORIES.map((category) => {
              const Piece = ART[category.art]
              const count = JEWELS.filter((jewel) => jewel.categories.includes(category.id)).length
              return (
                <li className="vault__card" key={category.id}>
                  <Link to={`/collection/${category.id}`} className="vault__link">
                    <span className="vault__art">
                      <Piece tone={metalTone('yellow-gold')} />
                    </span>
                    <span className="vault__body">
                      <span className="vault__label">{category.label}</span>
                      <span className="vault__count micro">{count} pieces</span>
                      <span className="link-arrow vault__arrow">
                        Explore
                        <ArrowLong />
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <EditorialBanners />
    </>
  )
}
