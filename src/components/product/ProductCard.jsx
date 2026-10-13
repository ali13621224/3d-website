import { useState } from 'react'
import { computePrice, metalById } from '../../lib/pricing.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt, ModelScene, metalTone } from '../art/JewelryArt.jsx'
import { ArrowLong, Heart } from '../ui/Icons.jsx'
import MetalSwitcher from '../ui/MetalSwitcher.jsx'
import Price from '../ui/Price.jsx'

/**
 * The infinite detail grid card: no visible box, the piece floats on the
 * canvas, and the metal switcher re-lights it without leaving the page.
 */
export default function ProductCard({ jewel }) {
  const { addToBag, toggleWishlist, inWishlist, openQuickView } = useStore()
  const [metal, setMetal] = useState(jewel.defaultMetal)
  const saved = inWishlist(jewel.id)
  const price = computePrice(jewel, metal, jewel.carat)

  return (
    <article className="pcard">
      <div className="pcard__frame">
        <Link to={`/product/${jewel.slug}`} className="pcard__link" aria-label={jewel.name}>
          <span className="pcard__art pcard__art--main">
            <JewelryArt art={jewel.art} metal={metal} />
          </span>
          <span className="pcard__art pcard__art--alt">
            <ModelScene art={jewel.art} tone={metalTone(metal)} />
          </span>
        </Link>

        {jewel.badge && <span className="pcard__badge">{jewel.badge}</span>}

        <button
          type="button"
          className={`pcard__heart${saved ? ' is-on' : ''}`}
          onClick={() => toggleWishlist(jewel)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${jewel.name} from wishlist` : `Save ${jewel.name} to wishlist`}
        >
          <Heart filled={saved} />
        </button>

        <div className="pcard__actions">
          <button
            type="button"
            className="pcard__action"
            onClick={() => openQuickView(jewel)}
          >
            Quick View
          </button>
          <button
            type="button"
            className="pcard__action pcard__action--gold"
            onClick={() => addToBag(jewel, { metal })}
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="pcard__body">
        <p className="pcard__collection">{jewel.collection}</p>
        <h3 className="pcard__name">
          <Link to={`/product/${jewel.slug}`}>{jewel.name}</Link>
        </h3>
        <p className="pcard__spec num">
          {metalById(metal).label} · {jewel.carat.toFixed(2)} ct {jewel.clarity}
        </p>
        <Price usd={price} className="pcard__price" />
        <MetalSwitcher
          metals={jewel.metals}
          value={metal}
          onChange={setMetal}
          showLabel={false}
          compact
          label={`Metal for ${jewel.name}`}
        />
      </div>
    </article>
  )
}
