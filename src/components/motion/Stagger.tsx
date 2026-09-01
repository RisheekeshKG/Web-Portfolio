import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Reveals children one after another once the group scrolls into view.
 * Under reduced motion the variants are dropped entirely so nothing ever
 * starts hidden.
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'ol' | 'dl'
}) {
  const reducedMotion = useReducedMotion()
  const Tag = motion[as]

  if (reducedMotion) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      variants={containerVariants(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const reducedMotion = useReducedMotion()
  const Tag = motion[as]

  if (reducedMotion) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag className={className} variants={itemVariants}>
      {children}
    </Tag>
  )
}
