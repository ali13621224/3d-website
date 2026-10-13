/**
 * Metal definitions and live pricing.
 *
 * Price = base × carat scaling × metal factor, and the finished metal weight is
 * valued against a daily spot reference so the PDP can show where the value of
 * a piece sits. The spot figure is a static reference in this build (no market
 * feed is wired up), but every other component reads it from here so a real
 * feed only has to replace SPOT.
 */

/** @typedef {import('../data/products.js').MetalId} MetalId */

export const SPOT = {
  goldUsdPerGram: 74.2,
  currency: 'USD',
  asOf: '2026-10-13',
}

export const METALS = [
  {
    id: 'yellow-gold',
    label: '18K Yellow Gold',
    short: 'Yellow Gold',
    karat: '18K / 750',
    purity: 0.75,
    priceFactor: 1,
  },
  {
    id: 'rose-gold',
    label: '18K Rose Gold',
    short: 'Rose Gold',
    karat: '18K / 750',
    purity: 0.75,
    priceFactor: 1,
  },
  {
    id: 'white-gold',
    label: '18K White Gold',
    short: 'White Gold',
    karat: '18K / 750',
    purity: 0.75,
    priceFactor: 1,
  },
  {
    id: 'platinum',
    label: '950 Platinum',
    short: 'Platinum',
    karat: 'PT 950',
    purity: 0.95,
    priceFactor: 1.18,
  },
]

/** @param {MetalId|string} id */
export function metalById(id) {
  return METALS.find((metal) => metal.id === id) || METALS[0]
}

/**
 * Price a jewel for a given metal and centre-stone carat.
 * Diamond value scales faster than weight, hence the 1.5 exponent.
 * @param {import('../data/products.js').Jewel} jewel
 * @param {MetalId|string} metalId
 * @param {number} carat
 */
export function computePrice(jewel, metalId, carat) {
  const metal = metalById(metalId)
  const centre = carat || jewel.carat
  const caratFactor = Math.pow(centre / jewel.carat, 1.5)
  const raw = jewel.price * caratFactor * metal.priceFactor
  return Math.round(raw / 50) * 50
}

/**
 * Value of the finished metal at the reference spot price.
 * @param {import('../data/products.js').Jewel} jewel
 * @param {MetalId|string} metalId
 */
export function metalValue(jewel, metalId) {
  const metal = metalById(metalId)
  return jewel.goldGrams * SPOT.goldUsdPerGram * metal.purity
}

/** "18K / 750 · 6.4 g · USD 74.20/g spot" */
export function metalMeta(jewel, metalId) {
  const metal = metalById(metalId)
  return `${metal.karat} · ${jewel.goldGrams} g · USD ${SPOT.goldUsdPerGram.toFixed(2)}/g spot`
}

/* ---------- 4 Cs ---------- */

/** @param {import('../data/products.js').Jewel} jewel */
export function fourCs(jewel) {
  return [
    { key: 'Carat', value: `${jewel.carat.toFixed(2)} ct${jewel.totalWeight ? ' total' : ''}` },
    { key: 'Cut', value: jewel.cut },
    { key: 'Color', value: jewel.color },
    { key: 'Clarity', value: jewel.clarity },
  ]
}
