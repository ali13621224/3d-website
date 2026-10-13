import { Link } from '../lib/router.jsx'

const SECTIONS = [
  {
    title: 'Terms of Service',
    body: 'Orders are confirmed once an advisor has verified availability, payment and delivery address. Prices are quoted in the display currency and settled in USD; any duty or import tax is payable on delivery.',
  },
  {
    title: 'Privacy Policy',
    body: 'We hold only what we need to serve you: your contact details, your order history and any sizing or engraving notes. We never sell data, and you may ask us to delete your file at any time.',
  },
  {
    title: 'Returns & Exchanges',
    body: 'Unworn pieces may be returned within 30 days in their original packaging with the certificate. Engraved and bespoke pieces are made for you alone and cannot be returned.',
  },
  {
    title: 'Diamond Warranty',
    body: 'Every setting carries a lifetime warranty against manufacturing fault. Complimentary ultrasonic cleaning, prong inspection and one resize within the first year are included.',
  },
  {
    title: 'Ethical Sourcing',
    body: 'All diamonds are purchased through Kimberley Process compliant channels and every supplier is a member of the Responsible Jewellery Council. Gold and platinum are recycled or traceable.',
  },
]

export default function Legal() {
  return (
    <section className="section legal">
      <div className="shell legal__inner">
        <header className="page-head">
          <p className="eyebrow">Fine print</p>
          <h1 className="title-lg">Terms, Care &amp; Privacy</h1>
          <p className="lede">
            The short version: buy with confidence, keep it a lifetime, and ask us anything.
          </p>
        </header>

        <div className="legal__list">
          {SECTIONS.map((section) => (
            <article className="legal__item" key={section.title}>
              <h2 className="legal__title">{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>

        <p className="legal__contact">
          Questions? <Link to="/about" className="legal__link">Speak to an advisor</Link> or write to
          care@eclat-diamonds.example.
        </p>
      </div>
    </section>
  )
}
