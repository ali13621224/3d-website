import { formatPrice } from '../../lib/currency.js'
import { useStore } from '../../store/StoreContext.jsx'

/** Price rendered in the boutique's currently selected display currency. */
export default function Price({ usd, className, as: Tag = 'span' }) {
  const { currency } = useStore()
  return (
    <Tag className={`price${className ? ` ${className}` : ''}`}>{formatPrice(usd, currency)}</Tag>
  )
}
