import { BEST_SELLERS } from '../../data/products.js'
import { useReveal } from '../../lib/hooks.js'
import { Link } from '../../lib/router.jsx'
import ProductCard from '../product/ProductCard.jsx'
import { ArrowLong } from '../ui/Icons.jsx'

export default function BestSellers() {
  const revealRef = useReveal()

  return (
    <section className="section bestsellers">
      <div className="shell">
        <header className="head-row">
          <div className="head-row__title">
            <h2 className="title-lg">Best Sellers</h2>
            <span className="head-row__line" aria-hidden="true" />
          </div>
          <Link to="/collections" className="link-arrow">
            View All
            <ArrowLong />
          </Link>
        </header>

        <div className="pgrid stagger" ref={revealRef}>
          {BEST_SELLERS.map((jewel) => (
            <ProductCard jewel={jewel} key={jewel.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
