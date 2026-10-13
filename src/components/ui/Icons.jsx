/**
 * Hairline icon set — 1px strokes, drawn inline so the boutique ships no icon
 * font or sprite. Every icon inherits `currentColor`.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
}

export function ArrowLong({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 8" fill="none" aria-hidden="true">
      <path d="M0 4h21" stroke="currentColor" strokeWidth="1" />
      <path d="M18 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Search(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="M15.6 15.6L20 20" />
    </svg>
  )
}

export function User(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.4" r="3.6" />
      <path d="M5.2 20c.9-3.4 3.5-5.2 6.8-5.2S17.9 16.6 18.8 20" />
    </svg>
  )
}

export function Heart({ filled, ...props }) {
  return (
    <svg {...base} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M12 20s-7.4-4.3-7.4-9.3A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.4 2.8C19.4 15.7 12 20 12 20z" />
    </svg>
  )
}

export function Bag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.4 8.4h13.2L19.2 20H4.8L5.4 8.4z" />
      <path d="M9 8.4V7a3 3 0 0 1 6 0v1.4" />
    </svg>
  )
}

export function Close(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function Plus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  )
}

export function Minus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 12h13" />
    </svg>
  )
}

export function Check(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.6l4.4 4.4L19 7.4" />
    </svg>
  )
}

export function Chevron({ dir = 'down', ...props }) {
  const rotate = { down: 0, up: 180, left: 90, right: -90 }[dir]
  return (
    <svg {...base} transform={`rotate(${rotate})`} {...props}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  )
}

export function Menu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h17" />
    </svg>
  )
}

export function Certificate(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.8h10v12.4H7z" />
      <path d="M9.4 7.6h5.2M9.4 10.4h5.2M9.4 13.2h3" />
      <path d="M9.6 16.2l-.6 4 3-1.8 3 1.8-.6-4" />
    </svg>
  )
}

export function Shipping(props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.8 16.4V6.6h9.6v9.8" />
      <path d="M12.4 9.4h4l3.2 3.2v3.8h-7.2" />
      <circle cx="6.6" cy="17.6" r="1.9" />
      <circle cx="15.8" cy="17.6" r="1.9" />
    </svg>
  )
}

export function GiftBox(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.2 9.6h15.6v9.8H4.2z" />
      <path d="M3.2 6.4h17.6v3.2H3.2zM12 6.4v13" />
      <path d="M12 6.4S10.4 2.6 8.2 3.2 8.6 6.4 12 6.4zM12 6.4s1.6-3.8 3.8-3.2-.4 3.2-3.8 3.2z" />
    </svg>
  )
}

export function Care(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2l6.4 2.6v5.4c0 3.9-2.6 6.9-6.4 8.6-3.8-1.7-6.4-4.7-6.4-8.6V5.8L12 3.2z" />
      <path d="M12 8.6l1.1 2.3 2.3 1.1-2.3 1.1-1.1 2.3-1.1-2.3-2.3-1.1 2.3-1.1z" />
    </svg>
  )
}

export function Ruler(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.4 14.6l11.2-11.2 5.6 5.6L9 20.2z" />
      <path d="M7.4 10.6l1.8 1.8M10.2 7.8l1.8 1.8M13 5l1.8 1.8" />
    </svg>
  )
}

export function Globe(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8M12 3.6c2.4 2.6 2.4 14.2 0 16.8-2.4-2.6-2.4-14.2 0-16.8z" />
    </svg>
  )
}

export function Sparkle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.4l1.9 5.3 5.3 1.9-5.3 1.9L12 17.8l-1.9-5.3L4.8 10.6l5.3-1.9z" />
    </svg>
  )
}

const TRUST_ICONS = { certificate: Certificate, shipping: Shipping, box: GiftBox, care: Care }

export function TrustIcon({ name, ...props }) {
  const Component = TRUST_ICONS[name] || Certificate
  return <Component {...props} />
}

export function Instagram(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.4" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Facebook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.2 8.4h2.4V5.2h-2.4a3.6 3.6 0 0 0-3.6 3.6v2H8.2v3.2h2.4v6.8h3.2v-6.8h2.4l.6-3.2h-3v-1.6a.8.8 0 0 1 .8-.8z" />
    </svg>
  )
}

export function Pinterest(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M10.4 20l1.6-6.2" />
      <path d="M9.6 13.2c-1.4-2.4.2-5 2.8-5 2 0 3.4 1.3 3.4 3.3 0 2.3-1.3 4-3 4-.9 0-1.6-.5-1.4-1.4" />
    </svg>
  )
}
