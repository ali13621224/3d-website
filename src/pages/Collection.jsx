import { useMemo, useState } from 'react'
import { JEWELS, categoryById, jewelsByCategory } from '../data/products.js'
import { computePrice, METALS } from '../lib/pricing.js'
import { useReveal } from '../lib/hooks.js'
import ProductCard from '../components/product/ProductCard.jsx'
import { ArrowLong } from '../components/ui/Icons.jsx'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · low to high' },
  { id: 'price-desc', label: 'Price · high to low' },
  { id: 'carat', label: 'Carat · largest first' },
]

/**
 * A single collection, with the metal filter and sort controls a jewellery
 * listing actually needs.
 */
export default function Collection({ categoryId }) {
  const category = categoryById(categoryId)
  const [sort, setSort] = useState('featured')
  const [metal, setMetal] = useState('all')
  const revealRef = useReveal()

  const pieces = useMemo(() => {
    const base = category ? jewelsByCategory(category.id) : JEWELS
    const filtered = metal === 'all' ? base : base.filter((jewel) => jewel.metals.includes(metal))
    const list = [...filtered]
    if (sort === 'price-asc') list.sort((a, b) => computePrice(a, a.defaultMetal, a.carat) - computePrice(b, b.defaultMetal, b.carat))
    if (sort === 'price-desc') list.sort((a, b) => computePrice(b, b.defaultMetal, b.carat) - computePrice(a, a.defaultMetal, a.carat))
    if (sort === 'carat') list.sort((a, b) => b.carat - a.carat)
    return list
  }, [category, sort, metal])

  return (
    <section className="section listing">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">{category ? category.label : 'The complete vault'}</p>
          <h1 className="title-lg">{category ? category.label : 'All Pieces'}</h1>
          <p className="lede">
            {category
              ? `Every ${category.label.toLowerCase().replace(' & high jewelry', '')} piece in the maison, hand-finished and certified.`
              : 'Every piece in the maison — solitaires, rivières, bands and gifts.'}
          </p>
        </header>

        <div className="listing__controls">
          <ul className="listing__filters no-scrollbar">
            <li>
              <button
                type="button"
                className={`chip${metal === 'all' ? ' is-active' : ''}`}
                onClick={() => setMetal('all')}
              >
                All metals
              </button>
            </li>
            {METALS.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={`chip${metal === option.id ? ' is-active' : ''}`}
                  onClick={() => setMetal(option.id)}
                >
                  {option.short}
                </button>
              </li>
            ))}
          </ul>

          <label className="listing__sort">
            <span className="micro">Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="listing__count micro">
          {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}
        </p>

        {pieces.length === 0 ? (
          <p className="listing__empty">
            Nothing in this selection yet — try another metal, or
            <Link to="/collections"> browse the full vault</Link>.
          </p>
        ) : (
          <div className="pgrid pgrid--listing stagger" ref={revealRef}>
            {pieces.map((jewel) => (
              <ProductCard jewel={jewel} key={jewel.id} />
            ))}
          </div>
        )}

        <div className="listing__foot">
          <ArrowLong className="listing__foot-rule" />
          <p>Every piece is certified, insured in transit and resized free within the first year.</p>
        </div>
      </div>
    </section>
  )
}
