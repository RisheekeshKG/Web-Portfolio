import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

type MagneticProps = {
  children: ReactNode
  className?: string
  as?: 'a' | 'button'
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
}

const spring = { stiffness: 200, damping: 18, mass: 0.4 }

/**
 * Pulls itself a fraction of the way toward the cursor on hover, then snaps
 * back with a spring. Motion is applied via transform only (no layout
 * writes), and pointer tracking is skipped for touch input.
 */
export function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  onClick,
  target,
  rel,
}: MagneticProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.3)
  }

  function onPointerLeave() {
    x.set(0)
    y.set(0)
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
