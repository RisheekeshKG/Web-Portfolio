import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const PARTS = /^([^\d]*)([\d.]+)(.*)$/

/**
 * Counts up from 0 to the numeric portion of `value` once scrolled into
 * view. Splits off any prefix (~) and suffix (%, K, units) so it can animate
 * "18.24 µg/m³" or "~402K" without needing the caller to pre-split them.
 * Falls straight to the final value under reduced motion.
 */
export function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reducedMotion = useReducedMotion()
  const [text, setText] = useState(() => {
    const match = value.match(PARTS)
    return match ? `${match[1]}0${match[3]}` : value
  })

  useEffect(() => {
    if (!inView) return
    const match = value.match(PARTS)
    if (!match) {
      setText(value)
      return
    }
    const [, prefix, numeric, suffix] = match
    const target = parseFloat(numeric)
    const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0

    if (reducedMotion) {
      setText(value)
      return
    }

    const duration = 1100
    const start = performance.now()

    let frame: number
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, reducedMotion])

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  )
}
