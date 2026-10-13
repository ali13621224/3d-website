import { BOUTIQUES } from '../data/site.js'
import { useReveal } from '../lib/hooks.js'
import { Link } from '../lib/router.jsx'
import { Sparkle, Shipping, TrustIcon } from '../components/ui/Icons.jsx'
import { SolitaireRing, metalTone } from '../components/art/JewelryArt.jsx'

const PILLARS = [
  {
    icon: 'certificate',
    title: 'Chosen by hand',
    copy: 'Every stone is bought loose, in person, and graded before it ever meets a setting.',
  },
  {
    icon: 'care',
    title: 'Finished in the atelier',
    copy: 'Claws are polished under a loupe, so the metal disappears and only the light remains.',
  },
  {
    icon: 'box',
    title: 'Kept for a lifetime',
    copy: 'Free cleaning, prong inspection and resizing for as long as the piece is yours.',
  },
]

export default function About() {
  const revealRef = useReveal()

  return (
    <>
      <section className="section about">
        <div className="shell about__intro">
          <div>
            <p className="eyebrow">The Maison</p>
            <h1 className="title-lg">Light, cut and kept by hand.</h1>
            <p className="lede about__lede">
              ÉCLAT began in a single Geneva workshop in 1974 with one rule: buy the stone you would
              want to wear, then build the piece around it. Half a century later we still cut no
              corners — and only the stones we would keep ourselves.
            </p>
            <p className="about__copy">
              We work directly with a handful of cutters, most of them family firms we have known for
              decades, and every diamond above half a carat travels with its original GIA or IGI
              report. Our gold is recycled, our platinum traceable, and our suppliers are audited
              members of the Responsible Jewellery Council.
            </p>
            <div className="about__actions">
              <Link to="/collections" className="btn btn--solid">
                <span>Discover the collections</span>
              </Link>
              <Link to="/about" className="btn">
                <span>Visit a boutique</span>
              </Link>
            </div>
          </div>

          <div className="about__visual">
            <div className="about__frame">
              <SolitaireRing tone={metalTone('white-gold')} />
            </div>
            <p className="about__caption micro">The Signature solitaire · 2.00 ct · GIA</p>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <ul className="pillars stagger" ref={revealRef}>
            {PILLARS.map((pillar) => (
              <li className="pillar" key={pillar.title}>
                <span className="pillar__icon" aria-hidden="true">
                  <TrustIcon name={pillar.icon} />
                </span>
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__copy">{pillar.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section boutiques">
        <div className="shell boutiques__inner">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="title-md">Salons &amp; Virtual Consultations</h2>
            <p className="boutiques__copy">
              Private rooms, no appointment queues and a glass of something cold. We will have your
              selection ready before you arrive.
            </p>
          </div>
          <ul className="boutiques__list">
            {BOUTIQUES.map((boutique) => (
              <li key={boutique}>
                <span className="boutiques__dot" aria-hidden="true">
                  <Sparkle />
                </span>
                {boutique}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell promise">
          <span className="promise__icon" aria-hidden="true">
            <Shipping />
          </span>
          <p className="promise__copy">
            Insured armoured delivery on high-value pieces, 30-day returns and a lifetime warranty
            on every setting.
          </p>
        </div>
      </section>
    </>
  )
}
