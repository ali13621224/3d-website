import { useState } from 'react'
import { METALS } from '../../lib/pricing.js'

/**
 * Metal selector — three champagne-ringed swatches that re-light the product
 * artwork and re-price the piece.
 */
export default function MetalSwitcher({
  metals = METALS.map((metal) => metal.id),
  value,
  onChange,
  showLabel = true,
  compact = false,
  label = 'Metal',
}) {
  const options = METALS.filter((metal) => metals.includes(metal.id))
  const active = options.find((metal) => metal.id === value) || options[0]

  return (
    <div className={`metal${compact ? ' metal--compact' : ''}`}>
      <div className="metal__head">
        <span className="metal__label">{label}</span>
        {showLabel && active && <span className="metal__value">{active.label}</span>}
      </div>
      <div className="metal__row" role="radiogroup" aria-label={label}>
        {options.map((metal) => (
          <button
            key={metal.id}
            type="button"
            role="radio"
            aria-checked={metal.id === value}
            aria-label={metal.label}
            title={metal.label}
            className={`metal__swatch metal__swatch--${metal.id}${metal.id === value ? ' is-active' : ''}`}
            onClick={() => onChange(metal.id)}
          />
        ))}
      </div>
    </div>
  )
}
