import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type RevealProps = {
  children: ReactNode
  /** Stagger, in ms, for items revealed as a group. */
  delay?: number
  /** Starting vertical offset in px — larger reads as more dramatic. */
  distance?: number
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  distance = 20,
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  // `initial={false}` skips the hidden starting state entirely, so a visitor
  // who asked for less motion never sees content sitting at opacity 0 below
  // the fold — it's simply there, unanimated.
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: distance }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
