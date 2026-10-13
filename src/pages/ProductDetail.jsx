import { useMemo, useState } from 'react'
import { JEWELS, jewelBySlug } from '../data/products.js'
import { RING_SIZES } from '../data/site.js'
import { computePrice, fourCs, metalById, metalValue } from '../lib/pricing.js'
import { formatPrice } from '../lib/currency.js'
import { Link } from '../lib/router.jsx'
import { useStore } from '../store/StoreContext.jsx'
import {
  CertificateCard,
  JewelryArt,
  ModelScene,
  metalTone,
} from '../components/art/JewelryArt.jsx'
import ProductCard from '../components/product/ProductCard.jsx'
import MetalSwitcher from '../components/ui/MetalSwitcher.jsx'
import Price from '../components/ui/Price.jsx'
import SpecsModal from '../components/overlays/SpecsModal.jsx'
import NotFound from './NotFound.jsx'
import { ArrowLong, Certificate, Heart, Ruler, Shipping, Sparkle } from '../components/ui/Icons.jsx'

const SIZED_CATEGORIES = ['rings', 'engagement', 'wedding']

export default function ProductDetail({ slug }) {
  const jewel = jewelBySlug(slug)
  const { addToBag, toggleWishlist, inWishlist, openPanel, currency } = useStore()

  const [metal, setMetal] = useState(jewel?.defaultMetal || 'yellow-gold')
  const [carat, setCarat] = useState(jewel?.carat || 1)
  const [size, setSize] = useState('7')
  const [engraving, setEngraving] = useState('')
  const [view, setView] = useState('macro')
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const [specsOpen, setSpecsOpen] = useState(false)

  const related = useMemo(() => {
    if (!jewel) return []
    return JEWELS.filter(
      (item) => item.id !== jewel.id && item.categories.some((id) => jewel.categories.includes(id)),
    ).slice(0, 4)
  }, [jewel])

  if (!jewel) return <NotFound />

  const price = computePrice(jewel, metal, carat)
  const saved = inWishlist(jewel.id)
  const needsSize = jewel.categories.some((id) => SIZED_CATEGORIES.includes(id))
  const tone = metalTone(metal)

  const VIEWS = [
    { id: 'macro', label: 'Macro' },
    { id: 'profile', label: 'Profile' },
    { id: 'model', label: 'On model' },
    { id: 'certificate', label: 'Certificate' },
  ]

  const onStageMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setOrigin(`${x}% ${y}%`)
  }

  const renderStage = () => {
    if (view === 'macro') {
      return (
        <span className="pdp__macro">
          <JewelryArt art={jewel.art} metal={metal} />
        </span>
      )
    }
    if (view === 'model') return <ModelScene art={jewel.art} tone={tone} />
    if (view === 'certificate') return <CertificateCard tone={tone} />
    return <JewelryArt art={jewel.art} metal={metal} />
  }

  return (
    <>
      <section className="section pdp">
        <div className="shell">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/collection/${jewel.category}`}>{jewel.category}</Link>
            <span aria-hidden="true">/</span>
            <em>{jewel.name}</em>
          </nav>

          <div className="pdp__grid">
            <div className="pdp__gallery">
              <ul className="pdp__thumbs" aria-label="Product views">
                {VIEWS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`pdp__thumb${view === item.id ? ' is-active' : ''}`}
                      onClick={() => {
                        setView(item.id)
                        setZoomed(false)
                      }}
                      aria-pressed={view === item.id}
                      aria-label={`${item.label} view`}
                    >
                      <span className="pdp__thumb-art">
                        {item.id === 'macro' && <JewelryArt art={jewel.art} metal={metal} />}
                        {item.id === 'profile' && <JewelryArt art={jewel.art} metal={metal} />}
                        {item.id === 'model' && <ModelScene art={jewel.art} tone={tone} />}
                        {item.id === 'certificate' && <CertificateCard tone={tone} />}
                      </span>
                      <span className="pdp__thumb-label">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className={`pdp__stage${zoomed ? ' is-zoomed' : ''}`}
                onMouseMove={onStageMove}
                onClick={() => setZoomed((value) => !value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') setZoomed((value) => !value)
                }}
                role="button"
                tabIndex={0}
                aria-label={zoomed ? 'Zoom out' : 'Zoom in on the piece'}
                style={{ '--zoom-origin': origin }}
              >
                {renderStage()}
                <span className="pdp__zoom-hint micro">{zoomed ? 'Click to zoom out' : 'Click to zoom'}</span>
              </div>
            </div>

            <div className="pdp__buy">
              <p className="eyebrow">{jewel.collection}</p>
              <h1 className="pdp__name">{jewel.name}</h1>
              <p className="pdp__blurb">{jewel.blurb}</p>

              <div className="pdp__price">
                <Price usd={price} className="pdp__amount" />
                <span className="pdp__meta num">
                  {metalById(metal).label} · {carat.toFixed(2)} ct · {jewel.certificate}
                </span>
              </div>

              <MetalSwitcher metals={jewel.metals} value={metal} onChange={setMetal} />

              <label className="field">
                <span>Centre stone</span>
                <select value={carat} onChange={(event) => setCarat(Number(event.target.value))}>
                  {jewel.caratOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.toFixed(2)} ct {jewel.totalWeight ? 'total' : ''} —{' '}
                      {formatPrice(computePrice(jewel, metal, option), currency)}
                    </option>
                  ))}
                </select>
              </label>

              {needsSize && (
                <div className="field">
                  <span>Ring size</span>
                  <div className="pdp__size">
                    <select value={size} onChange={(event) => setSize(event.target.value)}>
                      {RING_SIZES.map((row) => (
                        <option key={row.us} value={row.us}>
                          US {row.us} · EU {row.eu} · UK {row.uk}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="btn btn--sm" onClick={() => openPanel('sizeGuide')}>
                      <Ruler />
                      <span>Size Guide</span>
                    </button>
                  </div>
                </div>
              )}

              {jewel.bespoke && (
                <label className="field">
                  <span>Engraving (optional)</span>
                  <input
                    type="text"
                    maxLength={22}
                    value={engraving}
                    onChange={(event) => setEngraving(event.target.value)}
                    placeholder="A date, a name, three words"
                  />
                  <em className="field__hint">Hand-engraved in the atelier · {engraving.length}/22</em>
                </label>
              )}

              <div className="pdp__actions">
                <button
                  type="button"
                  className="btn btn--solid btn--block"
                  onClick={() =>
                    addToBag(jewel, {
                      metal,
                      carat,
                      size: needsSize ? size : '',
                      engraving: engraving.trim(),
                    })
                  }
                >
                  <span>Add to Bag</span>
                  <ArrowLong />
                </button>
                <button
                  type="button"
                  className="btn btn--block"
                  onClick={() => openPanel('appointment')}
                >
                  <span>Book In-Store Appointment</span>
                </button>
                <button
                  type="button"
                  className={`pdp__wish${saved ? ' is-on' : ''}`}
                  onClick={() => toggleWishlist(jewel)}
                  aria-pressed={saved}
                >
                  <Heart filled={saved} />
                  <span>{saved ? 'Saved to wishlist' : 'Save to wishlist'}</span>
                </button>
              </div>

              <ul className="pdp__assure">
                <li>
                  <Shipping />
                  Insured, armoured delivery on this piece
                </li>
                <li>
                  <Certificate />
                  {jewel.certificate} report &amp; ÉCLAT authenticity card
                </li>
                <li>
                  <Sparkle />
                  Metal value {formatPrice(metalValue(jewel, metal), currency)} at today&rsquo;s spot
                </li>
              </ul>

              <div className="accordion">
                <details open>
                  <summary>Certificate &amp; Quality</summary>
                  <div className="accordion__body">
                    <dl className="specs__cs">
                      {fourCs({ ...jewel, carat }).map((entry) => (
                        <div className="specs__cs-item" key={entry.key}>
                          <dt>{entry.key}</dt>
                          <dd>{entry.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p>{jewel.description}</p>
                    <button
                      type="button"
                      className="link-arrow"
                      onClick={() => setSpecsOpen(true)}
                    >
                      View full specification
                      <ArrowLong />
                    </button>
                  </div>
                </details>

                <details>
                  <summary>Delivery &amp; Insured Shipping</summary>
                  <div className="accordion__body">
                    <p>
                      Dispatched from Geneva within 3–5 working days, fully insured and requiring a
                      signature on delivery. High-value pieces travel with an armoured courier and a
                      dedicated tracking link.
                    </p>
                  </div>
                </details>

                <details>
                  <summary>Lifetime Care</summary>
                  <div className="accordion__body">
                    <p>
                      Complimentary ultrasonic cleaning and prong inspection for as long as the piece
                      is yours, one free resize in the first year, and a lifetime warranty against
                      manufacturing fault.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <header className="head-row">
            <div className="head-row__title">
              <h2 className="title-md">The Detail</h2>
              <span className="head-row__line" aria-hidden="true" />
            </div>
          </header>
          <div className="pdp__detail">
            <div className="pdp__detail-copy">
              <p>{jewel.description}</p>
              <ul className="pdp__detail-list">
                {jewel.details.map((detail) => (
                  <li key={detail}>
                    <span className="pdp__detail-dot" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pdp__detail-art">
              <ModelScene art={jewel.art} tone={tone} />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="shell">
            <header className="head-row">
              <div className="head-row__title">
                <h2 className="title-md">You May Also Like</h2>
                <span className="head-row__line" aria-hidden="true" />
              </div>
              <Link to="/collections" className="link-arrow">
                View All
                <ArrowLong />
              </Link>
            </header>
            <div className="pgrid">
              {related.map((item) => (
                <ProductCard jewel={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="quickbar">
        <div className="quickbar__info">
          <span className="quickbar__name">{jewel.name}</span>
          <Price usd={price} className="quickbar__price" />
        </div>
        <button
          type="button"
          className="btn btn--solid btn--sm"
          onClick={() =>
            addToBag(jewel, { metal, carat, size: needsSize ? size : '', engraving: engraving.trim() })
          }
        >
          <span>Add to Bag</span>
        </button>
      </div>

      <SpecsModal jewel={jewel} open={specsOpen} onClose={() => setSpecsOpen(false)} metal={metal} />
    </>
  )
}
