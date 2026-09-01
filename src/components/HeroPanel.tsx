import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Three.js is the largest dependency here. Splitting it out keeps it off the
// critical path — the hero copy paints without waiting for it.
const ThreeNeuralNet = lazy(() =>
  import('@/components/ThreeNeuralNet').then((m) => ({ default: m.ThreeNeuralNet })),
)

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export function HeroPanel() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: easeOutExpo }}
      // No card: the scene sits directly on the hero's mesh gradient. The
      // fixed ratio still reserves space so the lazy chunk cannot shift layout.
      className="aspect-[4/3] w-full"
      aria-hidden="true"
    >
      <Suspense fallback={<div className="size-full" />}>
        <ThreeNeuralNet />
      </Suspense>
    </motion.div>
  )
}
