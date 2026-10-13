import { useReveal } from '../../lib/hooks.js'
import { Link } from '../../lib/router.jsx'
import { GiftBoxArt, SolitaireRing, metalTone } from '../art/JewelryArt.jsx'
import { ArrowLong } from '../ui/Icons.jsx'

/** The dual editorial block: the forever banner and the gift banner. */
export default function EditorialBanners() {
  const revealRef = useReveal()
  const gold = metalTone('yellow-gold')

  return (
    <section className="section banners">
      <div className="shell banners__grid stagger" ref={revealRef}>
        <article className="banner banner--forever">
          <div className="banner__art" aria-hidden="true">
            <SolitaireRing tone={gold} />
          </div>
          <div className="banner__veil" aria-hidden="true" />
          <div className="banner__body">
            <p className="eyebrow">Featured Collection</p>
            <h3 className="banner__title">The Art Of Forever</h3>
            <p className="banner__copy">Exceptional diamonds for extraordinary people.</p>
            <Link to="/collection/engagement" className="btn banner__cta">
              <span>Explore Collection</span>
              <ArrowLong />
            </Link>
          </div>
        </article>

        <article className="banner banner--gift">
          <div className="banner__art banner__art--box" aria-hidden="true">
            <GiftBoxArt tone={gold} />
          </div>
          <div className="banner__veil" aria-hidden="true" />
          <div className="banner__body">
            <p className="eyebrow">A Gift That</p>
            <h3 className="banner__title banner__title--shimmer">Speaks Love</h3>
            <p className="banner__copy">Beautifully packaged. Ready to make memories.</p>
            <Link to="/collection/gifts" className="btn banner__cta">
              <span>Shop Gifts</span>
              <ArrowLong />
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
