/**
 * The Velvet Vault — boutique content that is not part of the product catalogue.
 */

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: 'Rings', to: '/collection/rings' },
  { label: 'Earrings', to: '/collection/earrings' },
  { label: 'Necklaces', to: '/collection/necklaces' },
  { label: 'Bracelets', to: '/collection/bracelets' },
  { label: 'About', to: '/about' },
]

export const FOOTER_COLUMNS = [
  {
    title: 'The Maison',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'The Atelier', to: '/about' },
      { label: 'Ethical Sourcing', to: '/about' },
      { label: 'Boutiques', to: '/about' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Book an Appointment', action: 'appointment' },
      { label: 'Ring Size Guide', action: 'sizeGuide' },
      { label: 'Track Your Order', action: 'appointment' },
      { label: 'Contact Us', action: 'appointment' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Bespoke Design', action: 'appointment' },
      { label: 'Resizing & Redesign', action: 'appointment' },
      { label: 'Cleaning & Care', action: 'appointment' },
      { label: 'Diamond Exchange', action: 'appointment' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', to: '/legal' },
      { label: 'Privacy Policy', to: '/legal' },
      { label: 'Returns & Exchanges', to: '/legal' },
      { label: 'Diamond Warranty', to: '/legal' },
    ],
  },
]

export const SECURITY_BADGES = [
  { label: 'GIA Certified', note: 'Gemological Institute of America' },
  { label: 'RJC Member', note: 'Responsible Jewellery Council' },
  { label: '100% Conflict-Free', note: 'Kimberley Process compliant' },
]

export const BOUTIQUES = [
  'Éclat Maison — Dubai Mall, Fashion Avenue',
  'Éclat Maison — Karachi, Clifton Boulevard',
  'Éclat Atelier — Geneva, Rue du Rhône',
  'Virtual consultation — wherever you are',
]

export const APPOINTMENT_TYPES = [
  'Private salon viewing',
  'Virtual consultation',
  'Engagement consultation',
  'Bespoke design session',
]

export const TIME_SLOTS = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30']

export const HERO_SLIDES = [
  {
    id: 'brilliant',
    eyebrow: 'A Brighter Tomorrow',
    title: ['Diamonds', "For Life's Most", 'Beautiful Moments'],
    copy: 'Timeless elegance. Ethically sourced. Expertly crafted. Always yours.',
  },
  {
    id: 'riviere',
    eyebrow: 'The Rivière Edit',
    title: ['Light,', 'Set In A', 'Single Line'],
    copy: 'Sixty-three brilliants, matched by hand, drawn to the collarbone.',
  },
  {
    id: 'atelier',
    eyebrow: 'Maison Atelier',
    title: ['Crafted By', 'Hand, Made', 'For Forever'],
    copy: 'Every stone chosen, every claw polished, under one roof in Geneva.',
  },
]

/* Ring size reference — US / EU / UK, with inner diameter in millimetres. */
export const RING_SIZES = [
  { us: '4', eu: '47', uk: 'H½', diameter: 14.9 },
  { us: '4½', eu: '48', uk: 'I½', diameter: 15.3 },
  { us: '5', eu: '49', uk: 'J½', diameter: 15.7 },
  { us: '5½', eu: '51', uk: 'K½', diameter: 16.1 },
  { us: '6', eu: '52', uk: 'L½', diameter: 16.5 },
  { us: '6½', eu: '53', uk: 'M½', diameter: 16.9 },
  { us: '7', eu: '54', uk: 'N½', diameter: 17.3 },
  { us: '7½', eu: '56', uk: 'O½', diameter: 17.7 },
  { us: '8', eu: '57', uk: 'P½', diameter: 18.1 },
  { us: '8½', eu: '58', uk: 'Q½', diameter: 18.5 },
  { us: '9', eu: '59', uk: 'R½', diameter: 18.9 },
  { us: '9½', eu: '61', uk: 'S½', diameter: 19.4 },
  { us: '10', eu: '62', uk: 'T½', diameter: 19.8 },
]

/** Nearest size row for a measured inner diameter in millimetres. */
export function sizeFromDiameter(mm) {
  const value = Number(mm)
  if (!Number.isFinite(value) || value <= 0) return null
  return RING_SIZES.reduce((best, row) =>
    Math.abs(row.diameter - value) < Math.abs(best.diameter - value) ? row : best,
  )
}
