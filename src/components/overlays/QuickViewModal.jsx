import { useEffect, useState } from 'react'
import { fourCs, metalById, computePrice } from '../../lib/pricing.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt } from '../art/JewelryArt.jsx'
import MetalSwitcher from '../ui/MetalSwitcher.jsx'
import Modal from '../ui/Modal.jsx'
import Price from '../ui/Price.jsx'
import SpecsModal from './SpecsModal.jsx'
import { ArrowLong, Heart } from '../ui/Icons.jsx'

/** Hover-level quick view: switch the metal, read the 4 Cs, add to the bag. */
export default function QuickViewModal() {
  const { quickView, closeQuickView, addToBag, toggleWishlist, inWishlist, closePanel } = useStore()
  const [metal, setMetal] = useState(quickView?.defaultMetal)
  const [carat, setCarat] = useState(quickView?.carat)
  const [specsOpen, setSpecsOpen] = useState(false)

  useEffect(() => {
    setMetal(quickView?.defaultMetal)
    setCarat(quickView?.carat)
    setSpecsOpen(false)
  }, [quickView])

  if (!quickView) return null

  const jewel = quickView
  const price = computePrice(jewel, metal, carat)
  const saved = inWishlist(jewel.id)

  return (
    <>
      <Modal
        open={Boolean(quickView) && !specsOpen}
        onClose={closeQuickView}
        eyebrow={jewel.collection}
        title={jewel.name}
        size="lg"
        footer={
          <div className="quick__foot">
            <button
              type="button"
              className="btn btn--solid btn--block"
              onClick={() => {
                addToBag(jewel, { metal, carat })
                closeQuickView()
                closePanel()
              }}
            >
              <span>Add to Bag —</span>
              <Price usd={price} className="quick__cta-price" />
            </button>
            <Link to={`/product/${jewel.slug}`} className="btn btn--ghost btn--block" onClick={closeQuickView}>
              <span>View full details</span>
              <ArrowLong />
            </Link>
          </div>
        }
      >
        <div className="quick">
          <div className="quick__art">
            <JewelryArt art={jewel.art} metal={metal} />
            <button
              type="button"
              className={`quick__heart${saved ? ' is-on' : ''}`}
              onClick={() => toggleWishlist(jewel)}
              aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart filled={saved} />
            </button>
          </div>

          <div className="quick__body">
            <p className="quick__blurb">{jewel.blurb}</p>

            <MetalSwitcher metals={jewel.metals} value={metal} onChange={setMetal} />

            <label className="field quick__carat">
              <span>Centre stone</span>
              <select value={carat} onChange={(event) => setCarat(Number(event.target.value))}>
                {jewel.caratOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.toFixed(2)} ct {jewel.totalWeight ? 'total' : ''}
                  </option>
                ))}
              </select>
            </label>

            <div className="quick__price">
              <Price usd={price} className="quick__amount" />
              <span className="quick__metal">{metalById(metal).label}</span>
            </div>

            <dl className="quick__cs">
              {fourCs({ ...jewel, carat }).map((entry) => (
                <div key={entry.key}>
                  <dt>{entry.key}</dt>
                  <dd>{entry.value}</dd>
                </div>
              ))}
            </dl>

            <button type="button" className="link-arrow quick__specs" onClick={() => setSpecsOpen(true)}>
              Diamond specification &amp; certificate
              <ArrowLong />
            </button>
          </div>
        </div>
      </Modal>

      <SpecsModal jewel={jewel} open={specsOpen} onClose={() => setSpecsOpen(false)} metal={metal} />
    </>
  )
}
