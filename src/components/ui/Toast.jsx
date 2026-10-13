import { useStore } from '../../store/StoreContext.jsx'

/** Boutique confirmation toast. */
export default function Toast() {
  const { toast } = useStore()
  return (
    <div className={`toast${toast ? ' is-on' : ''}`} role="status" aria-live="polite">
      <span className="toast__dot" aria-hidden="true" />
      <span>{toast?.message || ''}</span>
    </div>
  )
}
