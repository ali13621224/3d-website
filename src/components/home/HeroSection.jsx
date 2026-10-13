import { useState } from 'react'
import { HERO_SLIDES } from '../../data/site.js'
import { Link } from '../../lib/router.jsx'
import { useReveal } from '../../lib/hooks.js'
import { NecklaceModel, metalTone } from '../art/JewelryArt.jsx'
import { ArrowLong } from '../ui/Icons.jsx'

/**
 * Split editorial hero: the copy column on the left, the shadowed portrait on
 * the right, with the slider index beneath the headline.
 */
export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const revealRef = useReveal()
  const slide = HERO_SLIDES[index]
  const total = String(HERO_SLIDES.length).padStart(2, '0')

  return (
    <section className="hero">
      <div className="shell hero__inner">
        <div className="hero__copy reveal" ref={revealRef}>
          <p className="eyebrow hero__eyebrow" key={`eyebrow-${slide.id}`}>
            {slide.eyebrow}
          </p>

          <h1 className="display hero__title" key={`title-${slide.id}`}>
            {slide.title.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h1>

          <p className="lede hero__lede" key={`copy-${slide.id}`}>
            {slide.copy}
          </p>

          <div className="hero__actions">
            <Link to="/collections" className="btn">
              <span>Shop Our Collection</span>
              <ArrowLong />
            </Link>
            <Link to="/collection/engagement" className="link-arrow hero__ghost-link">
              Engagement
              <ArrowLong />
            </Link>
          </div>

          <div className="hero__pager">
            <span className="hero__index num">
              {String(index + 1).padStart(2, '0')}
              <em>—</em>
              {total}
            </span>
            <ul className="hero__dots">
              {HERO_SLIDES.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`hero__dot${i === index ? ' is-active' : ''}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}: ${item.eyebrow}`}
                    aria-current={i === index}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <NecklaceModel tone={metalTone('white-gold')} />
          </div>
          <figure className="hero__quote">
            <blockquote>More Than Jewellery, A Feeling</blockquote>
            <figcaption className="micro">The Éclat Signature Collection</figcaption>
          </figure>
        </div>
      </div>

      <div className="shell hero__strip">
        <span className="micro">Est. 1974 · Geneva</span>
        <span className="hero__strip-rule" aria-hidden="true" />
        <span className="micro">GIA &amp; IGI certified stones</span>
        <span className="hero__strip-rule" aria-hidden="true" />
        <span className="micro">Hand-finished in the atelier</span>
      </div>
    </section>
  )
}
