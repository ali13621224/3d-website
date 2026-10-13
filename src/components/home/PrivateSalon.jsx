import { useStore } from '../../store/StoreContext.jsx'
import { ArrowLong, Sparkle } from '../ui/Icons.jsx'

/** Appointment invitation closing the page — the human side of high jewelry. */
export default function PrivateSalon() {
  const { openPanel } = useStore()

  return (
    <section className="section salon">
      <div className="shell salon__panel">
        <span className="salon__mark" aria-hidden="true">
          <Sparkle />
        </span>
        <p className="eyebrow">The Private Salon</p>
        <h2 className="title-lg salon__title">Book a Private Viewing</h2>
        <p className="salon__copy">
          Nothing replaces trying a stone on your own hand. Reserve an hour with an advisor, in one
          of our salons or over a video call, and we will have the pieces you are considering laid
          out on velvet before you arrive.
        </p>
        <div className="salon__actions">
          <button type="button" className="btn btn--solid" onClick={() => openPanel('appointment')}>
            <span>Book an Appointment</span>
            <ArrowLong />
          </button>
          <button type="button" className="btn" onClick={() => openPanel('sizeGuide')}>
            <span>Ring Size Guide</span>
            <ArrowLong />
          </button>
        </div>
      </div>
    </section>
  )
}
