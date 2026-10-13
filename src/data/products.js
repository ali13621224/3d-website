/**
 * ÉCLAT catalogue — the single source of truth for every jewellery item.
 *
 * @typedef {'yellow-gold'|'rose-gold'|'white-gold'|'platinum'} MetalId
 * @typedef {'rings'|'earrings'|'necklaces'|'bracelets'|'engagement'|'wedding'|'gifts'} CategoryId
 * @typedef {'GIA'|'IGI'} Certificate
 *
 * @typedef {Object} Jewel
 * @property {string} id            stable identifier, also the cart key base
 * @property {string} slug          route slug for /product/:slug
 * @property {string} name          display name
 * @property {string} collection    maison collection the piece belongs to
 * @property {CategoryId} category  primary category
 * @property {CategoryId[]} categories every category the piece appears under
 * @property {string} art           key into the SVG art registry (see components/art)
 * @property {'round'|'cushion'|'pear'|'oval'|'marquise'|'emerald'} shape
 * @property {number} price         base price in USD at the default metal + carat
 * @property {number} carat         default centre-stone carat weight
 * @property {number[]} caratOptions selectable carat weights
 * @property {MetalId[]} metals     selectable metals
 * @property {MetalId} defaultMetal
 * @property {string} cut           GIA cut grade
 * @property {string} color         GIA colour grade
 * @property {string} clarity       GIA clarity grade
 * @property {Certificate} certificate
 * @property {number} goldGrams     finished metal weight in grams
 * @property {boolean} [totalWeight] true when carat is a total (multi-stone) weight
 * @property {string} blurb         one-line editorial note for cards
 * @property {string} description   PDP lead paragraph
 * @property {string[]} details     PDP spec bullets
 * @property {string} [badge]       small editorial flag
 * @property {boolean} [bestSeller]
 * @property {boolean} [newIn]
 * @property {boolean} [bespoke]    available for engraving
 */

/** @type {MetalId[]} */
export const ALL_METALS = ['yellow-gold', 'rose-gold', 'white-gold', 'platinum']

export const CATEGORIES = [
  { id: 'rings', label: 'Rings', art: 'solitaireRing' },
  { id: 'earrings', label: 'Earrings', art: 'studEarrings' },
  { id: 'necklaces', label: 'Necklaces', art: 'pendantNecklace' },
  { id: 'bracelets', label: 'Bracelets', art: 'tennisBracelet' },
  { id: 'engagement', label: 'Engagement', art: 'haloRing' },
  { id: 'wedding', label: 'Wedding Bands', art: 'weddingBands' },
  { id: 'gifts', label: 'Gifts & High Jewelry', art: 'giftBox' },
]

/** @type {Jewel[]} */
export const JEWELS = [
  {
    id: 'solitaire-grace-ring',
    slug: 'solitaire-grace-ring',
    name: 'Solitaire Grace Ring',
    collection: 'Éclat Signature',
    category: 'rings',
    categories: ['rings', 'engagement', 'gifts'],
    art: 'solitaireRing',
    shape: 'round',
    price: 8500,
    carat: 2.0,
    caratOptions: [1.0, 1.5, 2.0, 2.5, 3.0],
    metals: ALL_METALS,
    defaultMetal: 'white-gold',
    cut: 'Excellent',
    color: 'D',
    clarity: 'VS1',
    certificate: 'GIA',
    goldGrams: 6.4,
    bespoke: true,
    badge: 'Signature',
    bestSeller: true,
    blurb: 'A single brilliant, held in four hand-polished claws — the quietest way to say everything.',
    description:
      'Our signature solitaire suspends a GIA-certified brilliant above a knife-edge band, cut to gather light from every angle and return it in a single, steady fire. Each stone is chosen by hand and set in our atelier, so the prongs disappear and only the light remains.',
    details: [
      'Hand-set GIA-certified round brilliant',
      'Four-claw basket setting, hand-finished',
      'Knife-edge band, 2.1 mm wide',
      'Engraving available inside the band',
    ],
  },
  {
    id: 'pear-drop-earrings',
    slug: 'pear-drop-diamond-earrings',
    name: 'Pear Drop Diamond Earrings',
    collection: 'Rivière',
    category: 'earrings',
    categories: ['earrings', 'gifts'],
    art: 'pearDrop',
    shape: 'pear',
    price: 11200,
    carat: 3.2,
    totalWeight: true,
    caratOptions: [2.0, 3.2, 4.0, 5.0],
    metals: ALL_METALS,
    defaultMetal: 'platinum',
    cut: 'Excellent',
    color: 'E',
    clarity: 'VS1',
    certificate: 'GIA',
    goldGrams: 5.9,
    bestSeller: true,
    blurb: 'Matched pear brilliants that trace the jaw — movement, light and a little theatre.',
    description:
      'A pair of matched pear brilliants, graded for shape and fire as a couple, suspended from a discreet articulated fitting so the stones turn with every movement. Crafted in platinum with a friction-post closure.',
    details: [
      'Matched pair, GIA-certified',
      'Articulated drop fitting for movement',
      'Friction-post with secure butterfly back',
      'Total diamond weight across the pair',
    ],
  },
  {
    id: 'halo-cushion-ring',
    slug: 'halo-cushion-diamond-ring',
    name: 'Halo Cushion Diamond Ring',
    collection: 'Couronne',
    category: 'rings',
    categories: ['rings', 'engagement'],
    art: 'haloRing',
    shape: 'cushion',
    price: 7800,
    carat: 1.75,
    caratOptions: [1.0, 1.5, 1.75, 2.25, 3.0],
    metals: ALL_METALS,
    defaultMetal: 'yellow-gold',
    cut: 'Very Good',
    color: 'E',
    clarity: 'VS2',
    certificate: 'IGI',
    goldGrams: 5.8,
    bespoke: true,
    bestSeller: true,
    blurb: 'A cushion centre framed by a halo of pavé, drawn in warm 18K gold.',
    description:
      'A cushion-cut centre stone encircled by a fine halo of pavé brilliants, so the ring reads larger than its carat and warmer in candlelight. The gallery is pierced to let light pass beneath the stone.',
    details: [
      'IGI-certified cushion centre',
      'Pavé halo, 18 stones set by hand',
      'Pierced gallery for light return',
      'Milgrain-free contemporary edge',
    ],
  },
  {
    id: 'classic-tennis-bracelet',
    slug: 'classic-diamond-tennis-bracelet',
    name: 'Classic Tennis Bracelet',
    collection: 'Ligne',
    category: 'bracelets',
    categories: ['bracelets', 'gifts'],
    art: 'tennisBracelet',
    shape: 'round',
    price: 9400,
    carat: 5.0,
    totalWeight: true,
    caratOptions: [3.0, 5.0, 7.0, 9.0],
    metals: ALL_METALS,
    defaultMetal: 'white-gold',
    cut: 'Excellent',
    color: 'F',
    clarity: 'VS2',
    certificate: 'IGI',
    goldGrams: 12.4,
    bestSeller: true,
    blurb: 'Forty-six brilliants in an unbroken line — the most versatile piece we make.',
    description:
      'A continuous line of round brilliants, each four-claw set in a link that folds against the wrist like silk. The concealed box clasp sits flush with the line so the bracelet reads as one uninterrupted ribbon of light.',
    details: [
      'Round brilliants, four-claw set',
      'Concealed box clasp with double safety',
      'Articulated links, 3.0 mm width',
      'Sized to order at no charge',
    ],
  },
  {
    id: 'classic-pear-pendant',
    slug: 'classic-pear-pendant-necklace',
    name: 'Classic Pear Pendant Necklace',
    collection: 'Rivière',
    category: 'necklaces',
    categories: ['necklaces', 'gifts'],
    art: 'pendantNecklace',
    shape: 'pear',
    price: 5600,
    carat: 1.2,
    caratOptions: [0.7, 1.2, 1.8, 2.5],
    metals: ALL_METALS,
    defaultMetal: 'platinum',
    cut: 'Excellent',
    color: 'D',
    clarity: 'VS1',
    certificate: 'GIA',
    goldGrams: 3.2,
    bestSeller: true,
    blurb: 'A single pear brilliant on the finest adjustable cable chain.',
    description:
      'One GIA-certified pear brilliant, set in a whisper-thin bezel so the outline stays unbroken against the skin. The chain adjusts across three lengths and fastens with a lobster clasp.',
    details: [
      'GIA-certified pear brilliant',
      'Near-invisible bezel setting',
      'Adjustable 40 / 42 / 45 cm chain',
      'Lobster clasp with ÉCLAT tag',
    ],
  },
  {
    id: 'eternite-diamond-band',
    slug: 'eternite-diamond-band',
    name: 'Éternité Diamond Band',
    collection: 'Serment',
    category: 'wedding',
    categories: ['wedding', 'rings'],
    art: 'eternityBand',
    shape: 'round',
    price: 3200,
    carat: 0.6,
    totalWeight: true,
    caratOptions: [0.4, 0.6, 1.0, 1.5],
    metals: ALL_METALS,
    defaultMetal: 'rose-gold',
    cut: 'Excellent',
    color: 'F',
    clarity: 'VS1',
    certificate: 'IGI',
    goldGrams: 3.1,
    bespoke: true,
    blurb: 'A full circle of channel-set brilliants — no beginning, no end.',
    description:
      'A true eternity band, channel-set with a continuous ring of brilliants so the metal and the light trade places around the finger. Comfort-fitted inside for daily wear.',
    details: [
      'Channel-set round brilliants',
      'Comfort-fit interior profile',
      '2.2 mm width, stackable',
      'Matching plain band available',
    ],
  },
  {
    id: 'aurora-stud-earrings',
    slug: 'aurora-diamond-stud-earrings',
    name: 'Aurora Stud Earrings',
    collection: 'Éclat Signature',
    category: 'earrings',
    categories: ['earrings', 'gifts'],
    art: 'studEarrings',
    shape: 'round',
    price: 4100,
    carat: 1.0,
    totalWeight: true,
    caratOptions: [0.5, 1.0, 1.5, 2.0],
    metals: ALL_METALS,
    defaultMetal: 'white-gold',
    cut: 'Excellent',
    color: 'D',
    clarity: 'VS1',
    certificate: 'GIA',
    goldGrams: 1.9,
    newIn: true,
    blurb: 'The first piece in any jewellery wardrobe, and the last one you take off.',
    description:
      'Two matched brilliants in a four-claw martini setting that lifts the stone toward the light and keeps the profile low against the lobe. Graded as a pair for colour and clarity.',
    details: [
      'Matched pair, GIA-certified',
      'Martini four-claw setting',
      'Friction-post and butterfly back',
      'Also available in larger carats',
    ],
  },
  {
    id: 'riviera-riviere-necklace',
    slug: 'riviera-riviere-necklace',
    name: 'Riviera Rivière Necklace',
    collection: 'Rivière',
    category: 'necklaces',
    categories: ['necklaces', 'gifts'],
    art: 'riviereNecklace',
    shape: 'round',
    price: 18600,
    carat: 8.0,
    totalWeight: true,
    caratOptions: [6.0, 8.0, 10.0, 12.0],
    metals: ALL_METALS,
    defaultMetal: 'white-gold',
    cut: 'Excellent',
    color: 'E',
    clarity: 'VS1',
    certificate: 'GIA',
    goldGrams: 18.6,
    badge: 'High Jewelry',
    blurb: 'Graduated brilliants that swell to the centre — the evening in one line.',
    description:
      'A graduated rivière of sixty-three brilliants, matched stone by stone across four grades so the necklace brightens imperceptibly toward the centre. Each link articulates independently, so it lies flat against the collarbone.',
    details: [
      'Graduated round brilliants, matched by hand',
      'Fully articulated link construction',
      'Concealed clasp with double safety catch',
      'Presented in the ÉCLAT velvet vault',
    ],
  },
  {
    id: 'imperial-cushion-ring',
    slug: 'imperial-cushion-ring',
    name: 'Imperial Cushion Ring',
    collection: 'Couronne',
    category: 'rings',
    categories: ['rings', 'engagement'],
    art: 'haloRing',
    shape: 'cushion',
    price: 12400,
    carat: 3.0,
    caratOptions: [2.0, 2.5, 3.0, 4.0],
    metals: ALL_METALS,
    defaultMetal: 'yellow-gold',
    cut: 'Excellent',
    color: 'D',
    clarity: 'VVS2',
    certificate: 'GIA',
    goldGrams: 7.9,
    badge: 'Atelier',
    newIn: true,
    blurb: 'A three-carat cushion in a hand-pierced crown of gold.',
    description:
      'Our heaviest cushion, raised on a hand-pierced crown so light passes under the stone rather than around it. The band is drawn from a single billet of 18K gold and finished by hand.',
    details: [
      'GIA-certified cushion centre, 3.0 ct',
      'Hand-pierced crown gallery',
      'Single-billet 18K band',
      'Certificate and appraisal included',
    ],
  },
  {
    id: 'marquise-line-bracelet',
    slug: 'marquise-line-bracelet',
    name: 'Marquise Line Bracelet',
    collection: 'Ligne',
    category: 'bracelets',
    categories: ['bracelets'],
    art: 'tennisBracelet',
    shape: 'marquise',
    price: 7200,
    carat: 4.2,
    totalWeight: true,
    caratOptions: [3.0, 4.2, 5.5],
    metals: ALL_METALS,
    defaultMetal: 'yellow-gold',
    cut: 'Very Good',
    color: 'F',
    clarity: 'VS2',
    certificate: 'IGI',
    goldGrams: 10.8,
    blurb: 'Marquise brilliants set point-to-point for a ribbon of pure light.',
    description:
      'Marquise brilliants set tip to tip so the bracelet reads as a single ribbon rather than a line of stones. Each link is bevelled so the edges catch light as the wrist turns.',
    details: [
      'Marquise brilliants, tip-set',
      'Bevelled link edges',
      'Concealed clasp with safety catch',
      'Also made to order in longer lengths',
    ],
  },
  {
    id: 'celeste-diamond-hoops',
    slug: 'celeste-diamond-hoops',
    name: 'Céleste Diamond Hoops',
    collection: 'Couronne',
    category: 'earrings',
    categories: ['earrings'],
    art: 'hoopEarrings',
    shape: 'round',
    price: 6400,
    carat: 2.4,
    totalWeight: true,
    caratOptions: [1.6, 2.4, 3.2],
    metals: ALL_METALS,
    defaultMetal: 'rose-gold',
    cut: 'Excellent',
    color: 'F',
    clarity: 'VS1',
    certificate: 'IGI',
    goldGrams: 4.6,
    newIn: true,
    blurb: 'Inside-out pavé hoops — light on the way in and on the way out.',
    description:
      'Hinged hoops set with pavé brilliants on both faces, so the earrings stay brilliant from any angle, including the one only you can see. The snap closure sits flush at the base of the hoop.',
    details: [
      'Pavé set inside and out',
      'Hinged snap closure',
      '26 mm hoop diameter',
      'Lightweight tubular construction',
    ],
  },
  {
    id: 'vow-wedding-pair',
    slug: 'vow-wedding-band-pair',
    name: 'Vow Wedding Band Pair',
    collection: 'Serment',
    category: 'wedding',
    categories: ['wedding', 'gifts'],
    art: 'weddingBands',
    shape: 'round',
    price: 4900,
    carat: 1.1,
    totalWeight: true,
    caratOptions: [0.75, 1.1, 1.6],
    metals: ALL_METALS,
    defaultMetal: 'white-gold',
    cut: 'Very Good',
    color: 'F',
    clarity: 'VS2',
    certificate: 'IGI',
    goldGrams: 7.2,
    bespoke: true,
    blurb: 'His and hers, drawn to the same profile and engraved inside.',
    description:
      'A matched pair of bands, one pavé-set and one plain, drawn to the same 2.4 mm profile so they sit flush together. Both are engraved with the date of your choosing.',
    details: [
      'Matched pair, one pavé-set band',
      '2.4 mm profile, sits flush',
      'Complimentary inside engraving',
      'Presented in a twin velvet case',
    ],
  },
  {
    id: 'eclat-keepsake-set',
    slug: 'eclat-keepsake-gift-set',
    name: 'The ÉCLAT Keepsake Set',
    collection: 'Maison',
    category: 'gifts',
    categories: ['gifts', 'earrings', 'necklaces'],
    art: 'giftBox',
    shape: 'round',
    price: 2800,
    carat: 0.85,
    totalWeight: true,
    caratOptions: [0.85, 1.4],
    metals: ALL_METALS,
    defaultMetal: 'rose-gold',
    cut: 'Very Good',
    color: 'G',
    clarity: 'VS2',
    certificate: 'IGI',
    goldGrams: 4.1,
    badge: 'Gift',
    blurb: 'Studs and a fine chain, boxed in emerald velvet with a gold ribbon.',
    description:
      'Our gift set pairs a matched pair of pavé studs with a delicate 42 cm chain, presented in the ÉCLAT emerald vault box and hand-tied with a champagne ribbon. A handwritten card is included on request.',
    details: [
      'Matched studs and chain',
      'ÉCLAT velvet vault box',
      'Hand-tied champagne ribbon',
      'Complimentary handwritten card',
    ],
  },
]

/** @param {string} slug */
export function jewelBySlug(slug) {
  return JEWELS.find((jewel) => jewel.slug === slug)
}

/** @param {string} id */
export function jewelById(id) {
  return JEWELS.find((jewel) => jewel.id === id)
}

/** @param {CategoryId} categoryId */
export function jewelsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return JEWELS
  return JEWELS.filter((jewel) => jewel.categories.includes(categoryId))
}

export const BEST_SELLERS = JEWELS.filter((jewel) => jewel.bestSeller).slice(0, 5)

/** @param {string} slug */
export function categoryById(slug) {
  return CATEGORIES.find((category) => category.id === slug)
}

/* ---------- Maison editorial content ---------- */

export const TRUST_BADGES = [
  { id: 'certified', title: 'Certified Diamonds', copy: 'GIA & IGI certified, with authenticity card', icon: 'certificate' },
  { id: 'shipping', title: 'Insured Express Shipping', copy: 'Secured, armoured delivery on high-value pieces', icon: 'shipping' },
  { id: 'packaging', title: 'Luxury Bespoke Packaging', copy: 'Signature velvet jewel box & champagne ribbon', icon: 'box' },
  { id: 'care', title: 'Lifetime Warranty & Care', copy: 'Free ultrasonic cleaning & prong inspection', icon: 'care' },
]

export const CURRENCIES = ['USD', 'EUR', 'AED', 'IRR']
