/**
 * Currency formatting. Rates are reference figures for this build; the currency
 * selector converts the USD base price into the chosen display currency.
 */

export const RATES = {
  USD: { rate: 1, symbol: '$', locale: 'en-US', decimals: 0 },
  EUR: { rate: 0.92, symbol: '€', locale: 'de-DE', decimals: 0 },
  AED: { rate: 3.67, symbol: 'AED ', locale: 'en-AE', decimals: 0 },
  IRR: { rate: 620000, symbol: '', locale: 'en-US', decimals: 0, suffix: ' IRR' },
}

export const CURRENCY_META = {
  USD: { label: 'USD', name: 'US Dollar', flag: 'United States' },
  EUR: { label: 'EUR', name: 'Euro', flag: 'Eurozone' },
  AED: { label: 'AED', name: 'UAE Dirham', flag: 'United Arab Emirates' },
  IRR: { label: 'IRR', name: 'Iranian Rial', flag: 'Iran' },
}

/**
 * @param {number} usd
 * @param {keyof typeof RATES} currency
 */
export function formatPrice(usd, currency = 'USD') {
  const config = RATES[currency] || RATES.USD
  const value = Math.round(usd * config.rate)
  const formatted = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(value)
  if (currency === 'IRR') return `${formatted}${config.suffix}`
  return `${config.symbol}${formatted}`
}


