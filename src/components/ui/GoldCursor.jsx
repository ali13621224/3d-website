import { useEffect, useRef } from 'react'

/**
 * A fine gold ring that trails the pointer and opens up over anything
 * interactive. Mounted only for fine pointers, and only after JS has run, so
 * the native cursor is never hidden on touch devices.
 */
export default function GoldCursor() {
  const root = useRef(null)
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    document.body.classList.add('has-gold-cursor')

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let frame = 0

    const onMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    const onOver = (event) => {
      const target = event.target.closest?.('a, button, [role="button"], input, select, textarea, summary, label')
      ring.current?.classList.toggle('is-active', Boolean(target))
    }

    const loop = () => {
      ringX += (pointerX - ringX) * 0.18
      ringY += (pointerY - ringY) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    frame = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
      document.body.classList.remove('has-gold-cursor')
    }
  }, [])

  return (
    <div className="gold-cursor" ref={root} aria-hidden="true">
      <span className="gold-cursor__ring" ref={ring} />
      <span className="gold-cursor__dot" ref={dot} />
    </div>
  )
}
