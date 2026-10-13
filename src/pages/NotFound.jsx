import { Link } from '../lib/router.jsx'
import { ArrowLong } from '../components/ui/Icons.jsx'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="shell notfound__inner">
        <p className="eyebrow">Page not found</p>
        <h1 className="title-lg">This piece has left the vault.</h1>
        <p className="lede">
          The page you were looking for is no longer here. Return to the boutique, or let one of our
          advisors find something better.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn--solid">
            <span>Return to the Maison</span>
            <ArrowLong />
          </Link>
          <Link to="/collections" className="btn">
            <span>Browse the collections</span>
            <ArrowLong />
          </Link>
        </div>
      </div>
    </section>
  )
}
