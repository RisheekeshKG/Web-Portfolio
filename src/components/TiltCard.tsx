import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. 0 disables tilt but keeps spotlight + lift. */
  tilt?: number
  as?: 'div' | 'article' | 'li'
}

/**
 * The shared card surface: a cursor-tracked spotlight, a subtle 3D tilt on
 * fine pointers, a lift on hover, and a press-down on touch so phones get
 * tactile feedback where they cannot get hover. Tilt and lift are skipped
 * under reduced motion; the spotlight is pointer-driven so it stays.
 */
export function TiltCard({
  children,
  className = '',
  tilt = 5,
  as = 'div',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const spring = { stiffness: 220, damping: 22, mass: 0.5 }
  const springX = useSpring(rotateX, spring)
  const springY = useSpring(rotateY, spring)

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    // Spotlight follows every pointer type; tilt is mouse-only.
    el.style.setProperty('--x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--y', `${((event.clientY - rect.top) / rect.height) * 100}%`)

    if (event.pointerType !== 'mouse' || reducedMotion || tilt === 0) return
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * tilt * 2)
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * tilt * -2)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
  }

  // Polymorphic at runtime; typed as motion.div so props stay checked.
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`spotlight rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-accent/50 ${className}`}
    >
      {children}
    </Tag>
  )
}
