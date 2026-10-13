import { useMemo, useState } from 'react'
import { CATEGORIES, JEWELS } from '../../data/products.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt } from '../art/JewelryArt.jsx'
import Drawer from '../ui/Drawer.jsx'
import { Search } from '../ui/Icons.jsx'
import Price from '../ui/Price.jsx'

const SUGGESTIONS = ['Solitaire', 'Eternity', 'Rivière', 'Studs', 'Platinum']

/** Fold accents so "riviere" finds "Rivière" and "eclat" finds "Éclat". */
const fold = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

/** Instant search across the vault — name, collection, shape and category. */
export default function SearchOverlay() {
  const { panel, closePanel, openQuickView } = useStore()
  const [term, setTerm] = useState('')
  const open = panel === 'search'

  const results = useMemo(() => {
    const query = fold(term.trim())
    if (!query) return []
    return JEWELS.filter((jewel) =>
      fold(
        [jewel.name, jewel.collection, jewel.shape, jewel.category, jewel.blurb].join(' '),
      ).includes(query),
    ).slice(0, 6)
  }, [term])

  return (
    <Drawer open={open} onClose={closePanel} eyebrow="The boutique" title="Search" label="Search">
      <label className="search__field">
        <Search className="search__icon" />
        <span className="sr-only">Search pieces</span>
        <input
          type="search"
          value={term}
          autoFocus={open}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search a piece, a collection, a stone…"
        />
      </label>

      {!term && (
        <>
          <p className="eyebrow eyebrow--muted search__label">Suggested</p>
          <ul className="search__chips">
            {SUGGESTIONS.map((suggestion) => (
              <li key={suggestion}>
                <button type="button" className="search__chip" onClick={() => setTerm(suggestion)}>
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
          <p className="eyebrow eyebrow--muted search__label">Browse</p>
          <ul className="search__chips">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/collection/${category.id}`}
                  className="search__chip"
                  onClick={closePanel}
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {term && (
        <>
          <p className="eyebrow eyebrow--muted search__label">
            {results.length} {results.length === 1 ? 'piece' : 'pieces'}
          </p>
          {results.length === 0 ? (
            <p className="search__empty">
              Nothing in the vault matches “{term}”. Try a stone, a cut or a collection.
            </p>
          ) : (
            <ul className="search__results">
              {results.map((jewel) => (
                <li key={jewel.id}>
                  <div className="search__result">
                    <Link
                      to={`/product/${jewel.slug}`}
                      className="search__result-main"
                      onClick={closePanel}
                    >
                      <span className="search__thumb">
                        <JewelryArt art={jewel.art} metal={jewel.defaultMetal} />
                      </span>
                      <span className="search__meta">
                        <strong>{jewel.name}</strong>
                        <em>
                          {jewel.collection} · {jewel.carat.toFixed(2)} ct
                        </em>
                      </span>
                    </Link>
                    <Price usd={jewel.price} className="search__price" />
                    <button
                      type="button"
                      className="btn btn--sm btn--ghost"
                      onClick={() => {
                        closePanel()
                        openQuickView(jewel)
                      }}
                    >
                      <span>Quick View</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Drawer>
  )
}
