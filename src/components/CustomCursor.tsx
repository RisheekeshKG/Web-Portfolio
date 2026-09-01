import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * A ring that trails the pointer and tightens over interactive elements.
 * Desktop-only: bails out on coarse/touch pointers and under
 * prefers-reduced-motion, so it never gets in the way on mobile or for
 * visitors who asked for less motion. The OS cursor stays visible underneath
 * at all times — this is a decoration, not a replacement.
 */
export function CustomCursor() {
  // This is a client-only SPA (no SSR), so window is always available at
  // first render — reading it in the initializer avoids an extra render
  // versus setting it from an effect.
  const [enabled] = useState(
    () =>
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return

    function onMove(event: PointerEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target as Element | null
      setHovering(Boolean(target?.closest('a, button, [role="button"]')))
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100 rounded-full border border-accent mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: hovering ? 44 : 20,
        height: hovering ? 44 : 20,
        opacity: hovering ? 0.8 : 0.5,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
