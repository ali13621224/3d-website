import { metalById } from '../../lib/pricing.js'
import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt } from '../art/JewelryArt.jsx'
import Drawer from '../ui/Drawer.jsx'
import { ArrowLong, Bag, Close, Minus, Plus, Sparkle } from '../ui/Icons.jsx'
import Price from '../ui/Price.jsx'

export default function CartDrawer() {
  const { panel, closePanel, cart, cartSubtotal, setQty, removeLine, notify } = useStore()
  const open = panel === 'cart'

  const checkout = () => {
    notify('Secure checkout is not connected in this preview', 'muted')
  }

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      eyebrow="Your selection"
      title={cart.length ? 'Shopping Bag' : 'Your Bag'}
      label="Shopping bag"
      footer={
        cart.length > 0 && (
          <div className="bag__foot">
            <div className="bag__subtotal">
              <span className="micro">Subtotal</span>
              <Price usd={cartSubtotal} className="bag__total" />
            </div>
            <p className="bag__note">
              Insured, armoured delivery and duties calculated at checkout. Complimentary returns
              within 30 days.
            </p>
            <button type="button" className="btn btn--solid btn--block" onClick={checkout}>
              <span>Proceed to Secure Checkout</span>
              <ArrowLong />
            </button>
          </div>
        )
      }
    >
      {cart.length === 0 ? (
        <div className="empty">
          <span className="empty__mark" aria-hidden="true">
            <Bag />
          </span>
          <h4 className="empty__title">Your bag is empty</h4>
          <p className="empty__copy">
            Begin with a solitaire, or let one of our advisors guide you through the vault.
          </p>
          <div className="empty__actions">
            <Link to="/collections" className="btn" onClick={closePanel}>
              <span>Discover the collections</span>
              <ArrowLong />
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                closePanel()
                notify('An advisor will reach out shortly')
              }}
            >
              <span>Speak to an advisor</span>
            </button>
          </div>
        </div>
      ) : (
        <ul className="bag__list">
          {cart.map((line) => (
            <li className="bag__line" key={line.key}>
              <div className="bag__thumb">
                <JewelryArt art={line.jewel.art} metal={line.metal} />
              </div>
              <div className="bag__detail">
                <Link to={`/product/${line.jewel.slug}`} className="bag__name" onClick={closePanel}>
                  {line.jewel.name}
                </Link>
                <p className="bag__meta">
                  {metalById(line.metal).label} · {line.carat.toFixed(2)} ct
                  {line.size ? ` · Size ${line.size}` : ''}
                </p>
                {line.engraving && <p className="bag__engraving">Engraved “{line.engraving}”</p>}
                <div className="bag__row">
                  <div className="stepper" role="group" aria-label={`Quantity for ${line.jewel.name}`}>
                    <button
                      type="button"
                      className="stepper__btn"
                      onClick={() => setQty(line.key, line.qty - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </button>
                    <span className="stepper__value num">{line.qty}</span>
                    <button
                      type="button"
                      className="stepper__btn"
                      onClick={() => setQty(line.key, line.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </button>
                  </div>
                  <Price usd={line.unitPrice * line.qty} className="bag__price" />
                </div>
              </div>
              <button
                type="button"
                className="bag__remove"
                onClick={() => removeLine(line.key)}
                aria-label={`Remove ${line.jewel.name}`}
              >
                <Close />
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <p className="bag__assurance">
          <Sparkle className="bag__assurance-icon" />
          Presented in the ÉCLAT emerald vault box, hand-tied with a champagne ribbon.
        </p>
      )}
    </Drawer>
  )
}
