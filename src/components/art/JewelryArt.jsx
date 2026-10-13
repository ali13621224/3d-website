import { useId } from 'react'

/**
 * Every jewellery visual in the boutique is drawn as inline SVG: crisp at any
 * size, recoloured instantly by the metal switcher, and shipped without a
 * single binary asset. Metal tones drive the gradients, so switching from 18K
 * yellow gold to platinum re-lights the whole piece.
 */

export const METAL_TONES = {
  'yellow-gold': { light: '#FBEDB4', mid: '#D4AF37', deep: '#7E5F1B', edge: '#FFF8DC' },
  'rose-gold': { light: '#F7D3C4', mid: '#D08C6E', deep: '#7F402C', edge: '#FFEFE8' },
  'white-gold': { light: '#FDFEFF', mid: '#D7DFE6', deep: '#8A98A4', edge: '#FFFFFF' },
  platinum: { light: '#FFFFFF', mid: '#E4EAEF', deep: '#7E8B96', edge: '#FFFFFF' },
  emerald: { light: '#7FE0B4', mid: '#1F7A55', deep: '#062017', edge: '#CFF7E4' },
}

export function metalTone(id) {
  return METAL_TONES[id] || METAL_TONES['yellow-gold']
}

/* ---------- geometry helpers ---------- */

const P = (angle, radius, cx = 0, cy = 0) => [
  cx + Math.cos(angle) * radius,
  cy + Math.sin(angle) * radius,
]

const poly = (points) => points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

const ringPoints = (count, radius, cx = 0, cy = 0, phase = 0) =>
  Array.from({ length: count }, (_, i) => P(phase + (i * Math.PI * 2) / count, radius, cx, cy))

/* ---------- shared gradients ---------- */

export function ArtDefs({ uid, tone }) {
  return (
    <defs>
      <radialGradient id={`${uid}-gem`} cx="36%" cy="27%" r="80%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="42%" stopColor="#f1f6f9" />
        <stop offset="76%" stopColor="#bccad3" />
        <stop offset="100%" stopColor="#7d8f9c" />
      </radialGradient>
      <linearGradient id={`${uid}-table`} x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="65%" stopColor="#e8f1f7" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#c2d1db" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id={`${uid}-metal`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={tone.edge} />
        <stop offset="20%" stopColor={tone.light} />
        <stop offset="48%" stopColor={tone.mid} />
        <stop offset="76%" stopColor={tone.deep} />
        <stop offset="100%" stopColor={tone.mid} />
      </linearGradient>
      <linearGradient id={`${uid}-metal-v`} x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor={tone.deep} />
        <stop offset="45%" stopColor={tone.mid} />
        <stop offset="100%" stopColor={tone.light} />
      </linearGradient>
      <radialGradient id={`${uid}-bloom`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="55%" stopColor="#dcefff" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#155C41" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#0C3325" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#04100B" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-velvet`} cx="50%" cy="34%" r="78%">
        <stop offset="0%" stopColor="#123A2B" />
        <stop offset="52%" stopColor="#0A231A" />
        <stop offset="100%" stopColor="#03100A" />
      </radialGradient>
      <linearGradient id={`${uid}-skin`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#12261D" />
        <stop offset="55%" stopColor="#071710" />
        <stop offset="100%" stopColor="#020A06" />
      </linearGradient>
      <linearGradient id={`${uid}-box`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14402F" />
        <stop offset="55%" stopColor="#0A241A" />
        <stop offset="100%" stopColor="#05150E" />
      </linearGradient>

    </defs>
  )
}

/* ---------- atoms ---------- */

/** Four-point diamond twinkle. Opacity-only animation so it never fights transforms. */
export function Sparkle({ x = 0, y = 0, s = 1, delay = 0, opacity = 1 }) {
  return (
    <g className="sparkle" style={{ animationDelay: `${delay}s` }} opacity={opacity} transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 -11 L1.6 -1.6 L11 0 L1.6 1.6 L0 11 L-1.6 1.6 L-11 0 L-1.6 -1.6 Z"
        fill="#ffffff"
      />
      <circle r="1.6" fill="#ffffff" />
    </g>
  )
}

/**
 * A faceted stone. `shape` re-cuts the outline and facet pattern.
 */
export function Gem({ shape = 'round', r = 22, cx = 0, cy = 0, uid, bloom = true }) {
  const fill = `url(#${uid}-gem)`
  const table = `url(#${uid}-table)`
  const stroke = 'rgba(255,255,255,0.55)'

  const facets = (outerCount, tableRadius, phase) => {
    const outer = ringPoints(outerCount, r, cx, cy, phase)
    const inner = ringPoints(outerCount / 2, tableRadius, cx, cy, phase)
    const lines = []
    for (let i = 0; i < inner.length; i += 1) {
      const [tx, ty] = inner[i]
      const a = outer[i * 2]
      const b = outer[i * 2 + 1]
      lines.push(
        <line key={`f${i}a`} x1={tx} y1={ty} x2={a[0]} y2={a[1]} stroke={stroke} strokeWidth={r * 0.028} />,
      )
      lines.push(
        <line key={`f${i}b`} x1={tx} y1={ty} x2={b[0]} y2={b[1]} stroke={stroke} strokeWidth={r * 0.028} />,
      )
    }
    return { outer, inner, lines }
  }

  if (shape === 'cushion') {
    const side = r * 1.72
    const inner = r * 0.86
    return (
      <g>
        {bloom && <circle cx={cx} cy={cy} r={r * 1.55} fill={`url(#${uid}-bloom)`} />}
        <rect x={cx - side / 2} y={cy - side / 2} width={side} height={side} rx={r * 0.42} fill={fill} />
        <rect
          x={cx - inner / 2}
          y={cy - inner / 2}
          width={inner}
          height={inner}
          rx={r * 0.22}
          fill={table}
        />
        <rect
          x={cx - side / 2}
          y={cy - side / 2}
          width={side}
          height={side}
          rx={r * 0.42}
          fill="none"
          stroke={stroke}
          strokeWidth={r * 0.05}
        />
        {[
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].map(([sx, sy]) => (
          <line
            key={`${sx}${sy}`}
            x1={cx + sx * inner * 0.5}
            y1={cy + sy * inner * 0.5}
            x2={cx + sx * side * 0.5}
            y2={cy + sy * side * 0.5}
            stroke={stroke}
            strokeWidth={r * 0.05}
          />
        ))}
        <ellipse
          cx={cx - r * 0.3}
          cy={cy - r * 0.36}
          rx={r * 0.24}
          ry={r * 0.15}
          fill="#fff"
          opacity="0.7"
          transform={`rotate(-30 ${cx - r * 0.3} ${cy - r * 0.36})`}
        />
      </g>
    )
  }

  if (shape === 'pear') {
    const path = [
      `M ${cx} ${cy - r}`,
      `C ${cx + r * 0.6} ${cy - r * 0.52} ${cx + r * 0.86} ${cy + r * 0.18} ${cx + r * 0.5} ${cy + r * 0.62}`,
      `C ${cx + r * 0.22} ${cy + r * 0.98} ${cx - r * 0.22} ${cy + r * 0.98} ${cx - r * 0.5} ${cy + r * 0.62}`,
      `C ${cx - r * 0.86} ${cy + r * 0.18} ${cx - r * 0.6} ${cy - r * 0.52} ${cx} ${cy - r}`,
      'Z',
    ].join(' ')
    const inner = [
      `M ${cx} ${cy - r * 0.52}`,
      `C ${cx + r * 0.3} ${cy - r * 0.26} ${cx + r * 0.43} ${cy + r * 0.1} ${cx + r * 0.25} ${cy + r * 0.32}`,
      `C ${cx + r * 0.11} ${cy + r * 0.5} ${cx - r * 0.11} ${cy + r * 0.5} ${cx - r * 0.25} ${cy + r * 0.32}`,
      `C ${cx - r * 0.43} ${cy + r * 0.1} ${cx - r * 0.3} ${cy - r * 0.26} ${cx} ${cy - r * 0.52}`,
      'Z',
    ].join(' ')
    return (
      <g>
        {bloom && <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#${uid}-bloom)`} />}
        <path d={path} fill={fill} />
        <path d={inner} fill={table} opacity="0.75" />
        <path d={path} fill="none" stroke={stroke} strokeWidth={r * 0.05} />
        {[-1, 1].map((sx) => (
          <line
            key={sx}
            x1={cx}
            y1={cy - r * 0.52}
            x2={cx + sx * r * 0.66}
            y2={cy + r * 0.08}
            stroke={stroke}
            strokeWidth={r * 0.045}
          />
        ))}
        <ellipse cx={cx - r * 0.2} cy={cy + r * 0.1} rx={r * 0.14} ry={r * 0.22} fill="#fff" opacity="0.55" />
      </g>
    )
  }

  if (shape === 'oval' || shape === 'marquise') {
    const rx = shape === 'oval' ? r * 0.72 : r * 0.42
    const outline =
      shape === 'oval'
        ? `M ${cx} ${cy - r} A ${rx} ${r} 0 1 1 ${cx} ${cy + r} A ${rx} ${r} 0 1 1 ${cx} ${cy - r} Z`
        : `M ${cx} ${cy - r} Q ${cx + r * 0.78} ${cy} ${cx} ${cy + r} Q ${cx - r * 0.78} ${cy} ${cx} ${cy - r} Z`
    const inner =
      shape === 'oval'
        ? `M ${cx} ${cy - r * 0.56} A ${rx * 0.52} ${r * 0.56} 0 1 1 ${cx} ${cy + r * 0.56} A ${rx * 0.52} ${r * 0.56} 0 1 1 ${cx} ${cy - r * 0.56} Z`
        : `M ${cx} ${cy - r * 0.5} Q ${cx + r * 0.34} ${cy} ${cx} ${cy + r * 0.5} Q ${cx - r * 0.34} ${cy} ${cx} ${cy - r * 0.5} Z`
    return (
      <g>
        {bloom && <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#${uid}-bloom)`} />}
        <path d={outline} fill={fill} />
        <path d={inner} fill={table} opacity="0.7" />
        <path d={outline} fill="none" stroke={stroke} strokeWidth={r * 0.05} />
        <line x1={cx} y1={cy - r * 0.9} x2={cx} y2={cy + r * 0.9} stroke={stroke} strokeWidth={r * 0.04} opacity="0.6" />
        <ellipse cx={cx - r * 0.16} cy={cy - r * 0.3} rx={r * 0.12} ry={r * 0.24} fill="#fff" opacity="0.6" />
      </g>
    )
  }

  if (shape === 'emerald') {
    const side = r * 1.5
    return (
      <g>
        {bloom && <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#${uid}-bloom)`} />}
        <rect x={cx - side / 2} y={cy - r} width={side} height={r * 2} rx={r * 0.14} fill={fill} />
        <rect x={cx - r * 0.4} y={cy - r * 0.62} width={r * 0.8} height={r * 1.24} rx={r * 0.08} fill={table} />
        <rect
          x={cx - side / 2}
          y={cy - r}
          width={side}
          height={r * 2}
          rx={r * 0.14}
          fill="none"
          stroke={stroke}
          strokeWidth={r * 0.05}
        />
        <ellipse cx={cx - r * 0.34} cy={cy - r * 0.4} rx={r * 0.1} ry={r * 0.26} fill="#fff" opacity="0.55" />
      </g>
    )
  }

  /* round brilliant */
  const { outer, inner, lines } = facets(16, r * 0.52, -Math.PI / 2)
  return (
    <g>
      {bloom && <circle cx={cx} cy={cy} r={r * 1.5} fill={`url(#${uid}-bloom)`} />}
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <polygon points={poly(inner)} fill={table} />
      {lines}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={r * 0.045} />
      <polygon points={poly(inner)} fill="none" stroke={stroke} strokeWidth={r * 0.045} />
      {outer.length === 16 && (
        <ellipse
          cx={cx - r * 0.33}
          cy={cy - r * 0.4}
          rx={r * 0.22}
          ry={r * 0.13}
          fill="#ffffff"
          opacity="0.8"
          transform={`rotate(-28 ${cx - r * 0.33} ${cy - r * 0.4})`}
        />
      )}
    </g>
  )
}

/** A pavé-scale stone. */
function MiniGem({ x, y, r = 3.4, uid }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={`url(#${uid}-gem)`} />
      <circle cx={x} cy={y} r={r} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={r * 0.22} />
      <circle cx={x - r * 0.25} cy={y - r * 0.3} r={r * 0.26} fill="#fff" opacity="0.85" />
    </g>
  )
}

/** A plain metal band seen face-on. */
function Band({ cx, cy, r, w, uid, soft = false }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth={w} opacity="0.5" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={soft ? `url(#${uid}-metal-v)` : `url(#${uid}-metal)`}
        strokeWidth={w}
      />
      <path
        d={`M ${cx - r * 0.72} ${cy - r * 0.72} A ${r} ${r} 0 0 1 ${cx + r * 0.1} ${cy - r * 0.99}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth={w * 0.16}
        strokeLinecap="round"
      />
    </g>
  )
}

function Shadow({ cx, cy, rx, ry }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#000" opacity="0.5" />
}

const FRAME = { viewBox: '0 0 240 240', className: 'art', 'aria-hidden': 'true' }

/* ==========================================================================
   Ring family
   ========================================================================== */

export function SolitaireRing({ tone }) {
  const uid = useId()
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={196} rx={62} ry={9} />
      <Band cx={120} cy={138} r={56} w={12} uid={uid} />
      <Gem shape="round" r={30} cx={120} cy={72} uid={uid} />
      {/* four hand-polished claws */}
      {[
        [102, 92],
        [138, 92],
        [104, 62],
        [136, 62],
      ].map(([x, y]) => (
        <ellipse key={`${x}${y}`} cx={x} cy={y} rx="4.6" ry="6.4" fill={`url(#${uid}-metal)`} transform={`rotate(-18 ${x} ${y})`} />
      ))}
      <Sparkle x={92} y={54} s={0.85} delay={0.2} />
      <Sparkle x={150} y={80} s={0.6} delay={1.4} />
      <Sparkle x={118} y={34} s={0.45} delay={2.1} />
    </svg>
  )
}

export function HaloRing({ tone }) {
  const uid = useId()
  const halo = ringPoints(14, 41, 120, 74)
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={196} rx={60} ry={9} />
      <Band cx={120} cy={138} r={55} w={11} uid={uid} />
      <Gem shape="round" r={22} cx={120} cy={74} uid={uid} />
      {halo.map(([x, y], i) => (
        <MiniGem key={i} x={x} y={y} r={5.2} uid={uid} />
      ))}
      <circle cx={120} cy={74} r={41} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={3} opacity="0.9" />
      <Sparkle x={86} y={52} s={0.8} delay={0.5} />
      <Sparkle x={158} y={92} s={0.55} delay={1.7} />
    </svg>
  )
}

export function EternityBand({ tone }) {
  const uid = useId()
  const stones = ringPoints(22, 56, 120, 138)
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={196} rx={62} ry={9} />
      <Band cx={120} cy={138} r={56} w={13} uid={uid} />
      {stones.map(([x, y], i) => (
        <MiniGem key={i} x={x} y={y} r={5.4} uid={uid} />
      ))}
      <Sparkle x={120} y={70} s={0.7} delay={0.3} />
      <Sparkle x={62} y={120} s={0.5} delay={1.9} />
    </svg>
  )
}

export function WeddingBands({ tone }) {
  const uid = useId()
  const stones = ringPoints(9, 46, 92, 142, -Math.PI * 0.62)
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={124} cy={198} rx={76} ry={9} />
      <Band cx={148} cy={142} r={46} w={10} uid={uid} soft />
      <Band cx={92} cy={142} r={46} w={10} uid={uid} />
      {stones.map(([x, y], i) => (
        <MiniGem key={i} x={x} y={y} r={4.4} uid={uid} />
      ))}
      <Sparkle x={62} y={112} s={0.6} delay={0.4} />
      <Sparkle x={166} y={116} s={0.5} delay={1.6} />
    </svg>
  )
}

/* ==========================================================================
   Earring family
   ========================================================================== */

export function StudEarrings({ tone }) {
  const uid = useId()
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={176} rx={72} ry={8} />
      <Gem shape="round" r={31} cx={88} cy={110} uid={uid} />
      <Gem shape="round" r={31} cx={156} cy={126} uid={uid} bloom={false} />
      {[
        [88, 110],
        [156, 126],
      ].map(([cx, cy]) =>
        [
          [-1, -0.6],
          [1, -0.6],
          [-1, 0.7],
          [1, 0.7],
        ].map(([sx, sy], i) => (
          <ellipse
            key={`${cx}${cy}${i}`}
            cx={cx + sx * 22}
            cy={cy + sy * 22}
            rx="4"
            ry="5.6"
            fill={`url(#${uid}-metal)`}
          />
        )),
      )}
      <Sparkle x={62} y={84} s={0.8} delay={0.1} />
      <Sparkle x={180} y={100} s={0.6} delay={1.3} />
      <Sparkle x={132} y={158} s={0.45} delay={2.4} />
    </svg>
  )
}

export function PearDrop({ tone }) {
  const uid = useId()
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={124} cy={206} rx={54} ry={8} />
      {/* fitting */}
      <path d="M120 26 C 108 40 108 56 118 66" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={5} strokeLinecap="round" />
      <circle cx={120} cy={70} r={7} fill={`url(#${uid}-metal)`} />
      <Gem shape="pear" r={58} cx={120} cy={148} uid={uid} />
      <Sparkle x={82} y={110} s={0.85} delay={0.3} />
      <Sparkle x={160} y={140} s={0.6} delay={1.5} />
      <Sparkle x={120} y={214} s={0.5} delay={2.2} />
    </svg>
  )
}

export function HoopEarrings({ tone }) {
  const uid = useId()
  const stones = ringPoints(16, 58, 120, 128)
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={200} rx={50} ry={8} />
      <ellipse cx={120} cy={128} rx={58} ry={62} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={13} />
      <ellipse cx={120} cy={128} rx={58} ry={62} fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth={13} transform="translate(4 4)" />
      {stones.map(([x, y], i) => (
        <MiniGem key={i} x={x} y={y} r={5.6} uid={uid} />
      ))}
      <path d="M62 128 a 58 62 0 0 1 116 0" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth={2} />
      <Sparkle x={78} y={86} s={0.7} delay={0.6} />
      <Sparkle x={164} y={172} s={0.5} delay={1.8} />
    </svg>
  )
}

/* ==========================================================================
   Bracelet family
   ========================================================================== */

export function TennisBracelet({ tone }) {
  const uid = useId()
  const stones = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10
    const x = 22 + t * 196
    const y = 132 + Math.sin(Math.PI * t) * 34
    return [x, y]
  })
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <Shadow cx={120} cy={196} rx={110} ry={10} />
      <path
        d={`M 14 140 C 60 186 180 186 226 140`}
        fill="none"
        stroke={`url(#${uid}-metal)`}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <path
        d={`M 14 126 C 60 172 180 172 226 126`}
        fill="none"
        stroke={`url(#${uid}-metal)`}
        strokeWidth={7}
        strokeLinecap="round"
      />
      {stones.map(([x, y], i) => (
        <g key={i}>
          <MiniGem x={x} y={y - 6} r={9.4} uid={uid} />
          <Sparkle x={x + 4} y={y - 16} s={i % 3 === 0 ? 0.5 : 0.3} delay={i * 0.21} />
        </g>
      ))}
      <rect x={202} y={118} width={26} height={16} rx={4} fill={`url(#${uid}-metal)`} opacity="0.95" />
      <Sparkle x={40} y={104} s={0.55} delay={1.1} />
    </svg>
  )
}

/* ==========================================================================
   Necklace family
   ========================================================================== */

export function PendantNecklace({ tone }) {
  const uid = useId()
  const links = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14
    const x = 22 + t * 196
    const y = 34 + Math.sin(Math.PI * t) * 66
    return [x, y]
  })
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <path d="M 14 30 C 70 122 170 122 226 30" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={3} strokeLinecap="round" />
      {links.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.1} fill={`url(#${uid}-metal)`} />
      ))}
      <circle cx={120} cy={122} r={9} fill={`url(#${uid}-metal)`} />
      <Gem shape="pear" r={44} cx={120} cy={168} uid={uid} />
      <Sparkle x={70} y={96} s={0.6} delay={0.4} />
      <Sparkle x={170} y={96} s={0.6} delay={1.4} />
      <Sparkle x={120} y={222} s={0.5} delay={2.3} />
    </svg>
  )
}

export function RiviereNecklace({ tone }) {
  const uid = useId()
  const count = 19
  const stones = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const x = 12 + t * 216
    const y = 46 + Math.sin(Math.PI * t) * 92
    const grade = 1 - Math.abs(t - 0.5) * 1.7
    return { x, y, r: 5.6 + grade * 6.2 }
  })
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <path d="M 6 40 C 74 152 166 152 234 40" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={3.4} strokeLinecap="round" />
      {stones.map(({ x, y, r }, i) => (
        <g key={i}>
          <MiniGem x={x} y={y} r={r} uid={uid} />
          {i % 2 === 0 && <Sparkle x={x} y={y - r - 8} s={0.34 + r * 0.03} delay={i * 0.19} />}
        </g>
      ))}
      <Sparkle x={120} y={168} s={0.8} delay={0.8} />
    </svg>
  )
}

/* ==========================================================================
   Gift
   ========================================================================== */

export function GiftBoxArt({ tone }) {
  const uid = useId()
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <ellipse cx={120} cy={196} rx={86} ry={11} fill="#000" opacity="0.45" />
      {/* body */}
      <rect x={62} y={100} width={116} height={86} rx={3} fill={`url(#${uid}-box)`} />
      <rect x={62} y={100} width={116} height={86} rx={3} fill="none" stroke="rgba(255,255,255,0.09)" />
      {/* lid */}
      <rect x={50} y={78} width={140} height={28} rx={3} fill={`url(#${uid}-box)`} />
      <rect x={50} y={78} width={140} height={28} rx={3} fill="rgba(255,255,255,0.04)" stroke="rgba(212,175,55,0.28)" />
      {/* ribbon */}
      <rect x={106} y={78} width={16} height={108} fill={`url(#${uid}-metal-v)`} />
      <rect x={50} y={86} width={140} height={12} fill={`url(#${uid}-metal-v)`} opacity="0.95" />
      {/* bow */}
      <path d="M114 76 C 90 54 62 60 70 78 C 74 88 96 86 114 76 Z" fill={`url(#${uid}-metal)`} />
      <path d="M116 76 C 140 52 172 60 162 78 C 156 88 136 86 116 76 Z" fill={`url(#${uid}-metal)`} />
      <circle cx={115} cy={77} r={8} fill={`url(#${uid}-metal-v)`} />
      <path d="M112 84 C 100 108 88 124 78 132" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={5} strokeLinecap="round" />
      <path d="M120 84 C 134 108 148 124 158 132" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={5} strokeLinecap="round" />
      <Sparkle x={196} y={94} s={0.75} delay={0.2} />
      <Sparkle x={48} y={140} s={0.5} delay={1.6} />
      <Sparkle x={150} y={62} s={0.45} delay={2.4} />
    </svg>
  )
}

/* ==========================================================================
   Certificate card
   ========================================================================== */

export function CertificateCard({ tone }) {
  const uid = useId()
  return (
    <svg {...FRAME}>
      <ArtDefs uid={uid} tone={tone} />
      <rect x={64} y={40} width={112} height={158} rx={3} fill="#0B2118" stroke="rgba(212,175,55,0.35)" />
      <rect x={74} y={52} width={92} height={134} fill="none" stroke="rgba(212,175,55,0.18)" />
      <text x={120} y={82} textAnchor="middle" fill={tone.light} fontSize="17" fontFamily="Cormorant Garamond, serif" letterSpacing="3">
        GIA
      </text>
      <text x={120} y={98} textAnchor="middle" fill="#7A8E85" fontSize="6.4" fontFamily="Plus Jakarta Sans, sans-serif" letterSpacing="2.4">
        DIAMOND GRADING REPORT
      </text>
      {[118, 132, 146].map((y) => (
        <line key={y} x1={84} y1={y} x2={156} y2={y} stroke="rgba(255,255,255,0.12)" />
      ))}
      <circle cx={120} cy={170} r={17} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={2} />
      <circle cx={120} cy={170} r={11} fill="none" stroke={`url(#${uid}-metal)`} strokeWidth={1} opacity="0.7" />
      <Sparkle x={182} y={64} s={0.6} delay={0.5} />
    </svg>
  )
}

/* ==========================================================================
   On-model scene — the piece shown against a shadowed portrait
   ========================================================================== */

function ModelBackdrop({ uid }) {
  return (
    <g>
      <rect width="420" height="560" fill={`url(#${uid}-velvet)`} />
      <ellipse cx="210" cy="250" rx="240" ry="250" fill={`url(#${uid}-glow)`} />
      {/* hair mass */}
      <path d="M150 250 C 132 176 156 108 216 104 C 278 100 302 168 288 250 Z" fill={`url(#${uid}-skin)`} />
      {/* head */}
      <ellipse cx="216" cy="196" rx="52" ry="62" fill={`url(#${uid}-skin)`} />
      <path d="M164 196 C 164 148 190 130 216 130" fill="none" stroke="rgba(190,235,214,0.22)" strokeWidth="3" />
      {/* neck + shoulders */}
      <path d="M186 246 h60 v46 c 0 26 30 40 74 56 c 52 19 84 60 92 212 h -384 c 8 -152 40 -193 92 -212 c 44 -16 66 -30 66 -56 z" fill={`url(#${uid}-skin)`} />
      <path d="M186 246 h60 v18 h-60 z" fill="#020A06" opacity="0.6" />
      {/* rim light */}
      <path
        d="M120 560 C 132 430 176 372 214 356 C 250 372 288 424 300 560"
        fill="none"
        stroke="rgba(140,220,190,0.14)"
        strokeWidth="3"
      />
    </g>
  )
}

function NecklaceOnModel({ uid, tone }) {
  const count = 13
  const stones = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1)
    const x = 150 + t * 136
    const y = 284 + Math.sin(Math.PI * t) * 46
    const grade = 1 - Math.abs(t - 0.5) * 1.4
    return { x, y, r: 3.4 + grade * 4 }
  })
  return (
    <g>
      <path d="M 148 282 C 176 336 262 336 290 282" fill="none" stroke={`url(#${uid}-metal)`} strokeWidth="2" />
      {stones.map(({ x, y, r }, i) => (
        <MiniGem key={i} x={x} y={y} r={r} uid={uid} />
      ))}
      <Sparkle x={218} y={336} s={0.9} delay={0.6} />
      <Sparkle x={176} y={306} s={0.5} delay={1.9} />
      <Sparkle x={262} y={306} s={0.55} delay={1.2} />
    </g>
  )
}

/**
 * Editorial portrait: a shadowed figure with a rivière at the collarbone, used
 * for the hero and as the "on model" gallery view.
 */
export function NecklaceModel({ tone }) {
  const uid = useId()
  return (
    <svg viewBox="0 0 420 560" className="art art--model" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <ArtDefs uid={uid} tone={tone} />
      <ModelBackdrop uid={uid} />
      <NecklaceOnModel uid={uid} tone={tone} />
      {/* solitaire caught at the hand */}
      <g opacity="0.85">
        <Gem shape="round" r={13} cx={342} cy={474} uid={uid} bloom={false} />
        <ellipse cx={342} cy={484} rx={11} ry={16} fill={`url(#${uid}-metal)`} opacity="0.55" />
      </g>
    </svg>
  )
}

/**
 * Places any piece onto the shadowed portrait, so every product has an
 * "on model" view without bespoke photography.
 */
export function ModelScene({ art = 'solitaireRing', tone }) {
  const uid = useId()
  const Piece = ART[art] || SolitaireRing
  return (
    <svg viewBox="0 0 420 560" className="art art--model" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <ArtDefs uid={uid} tone={tone} />
      <ModelBackdrop uid={uid} />
      <NecklaceOnModel uid={uid} tone={tone} />
      <svg x="128" y="378" width="176" height="176">
        <Piece tone={tone} />
      </svg>
    </svg>
  )
}

/* ==========================================================================
   Registry
   ========================================================================== */

export const ART = {
  solitaireRing: SolitaireRing,
  haloRing: HaloRing,
  eternityBand: EternityBand,
  weddingBands: WeddingBands,
  studEarrings: StudEarrings,
  pearDrop: PearDrop,
  hoopEarrings: HoopEarrings,
  tennisBracelet: TennisBracelet,
  pendantNecklace: PendantNecklace,
  riviereNecklace: RiviereNecklace,
  giftBox: GiftBoxArt,
  certificate: CertificateCard,
  necklaceModel: NecklaceModel,
}

/**
 * @param {{art: string, metal?: string, className?: string}} props
 */
export function JewelryArt({ art, metal = 'yellow-gold', className = '' }) {
  const Component = ART[art] || SolitaireRing
  return (
    <span className={`jewel-art ${className}`.trim()}>
      <Component tone={metalTone(metal)} />
    </span>
  )
}
