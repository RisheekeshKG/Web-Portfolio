import { motion, useScroll, useSpring } from 'motion/react'

/** Thin progress bar pinned under the header, tracking scroll through the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.2,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-accent to-accent-2"
      style={{ scaleX }}
    />
  )
}
