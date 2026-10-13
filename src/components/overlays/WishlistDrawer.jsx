import { Link } from '../../lib/router.jsx'
import { useStore } from '../../store/StoreContext.jsx'
import { JewelryArt } from '../art/JewelryArt.jsx'
import Drawer from '../ui/Drawer.jsx'
import { ArrowLong, Close, Heart } from '../ui/Icons.jsx'
import Price from '../ui/Price.jsx'

export default function WishlistDrawer() {
  const { panel, closePanel, wishlistJewels, toggleWishlist, addToBag } = useStore()
  const open = panel === 'wishlist'

  return (
    <Drawer
      open={open}
      onClose={closePanel}
      eyebrow="Kept aside"
      title="Your Wishlist"
      label="Wishlist"
    >
      {wishlistJewels.length === 0 ? (
        <div className="empty">
          <span className="empty__mark" aria-hidden="true">
            <Heart />
          </span>
          <h4 className="empty__title">Nothing saved yet</h4>
          <p className="empty__copy">
            Tap the heart on any piece to keep it here while you decide.
          </p>
          <Link to="/collections" className="btn" onClick={closePanel}>
            <span>Browse the vault</span>
            <ArrowLong />
          </Link>
        </div>
      ) : (
        <ul className="bag__list">
          {wishlistJewels.map((jewel) => (
            <li className="bag__line" key={jewel.id}>
              <div className="bag__thumb">
                <JewelryArt art={jewel.art} metal={jewel.defaultMetal} />
              </div>
              <div className="bag__detail">
                <Link to={`/product/${jewel.slug}`} className="bag__name" onClick={closePanel}>
                  {jewel.name}
                </Link>
                <p className="bag__meta">
                  {jewel.collection} · {jewel.carat.toFixed(2)} ct
                </p>
                <Price usd={jewel.price} className="bag__price" />
                <button
                  type="button"
                  className="btn btn--sm wishlist__add"
                  onClick={() => {
                    addToBag(jewel)
                  }}
                >
                  <span>Add to Bag</span>
                  <ArrowLong />
                </button>
              </div>
              <button
                type="button"
                className="bag__remove"
                onClick={() => toggleWishlist(jewel)}
                aria-label={`Remove ${jewel.name} from wishlist`}
              >
                <Close />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
