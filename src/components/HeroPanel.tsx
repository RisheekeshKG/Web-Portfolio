import { Suspense, lazy } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// Three.js is ~40% of the app's JS. Splitting it out keeps it off the
// critical path — the hero text and buttons paint without waiting for it.
const ThreeNeuralNet = lazy(() =>
  import('@/components/ThreeNeuralNet').then((m) => ({ default: m.ThreeNeuralNet })),
)

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export function HeroPanel() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: easeOutExpo }}
      className="glass w-full rounded-2xl border border-line p-5 sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-wide text-ink-muted uppercase">
          Feed-forward net
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          live
        </span>
      </div>

      {/* Fixed ratio so the lazy chunk cannot shift the layout when it lands. */}
      <div className="mt-3 aspect-[3/2] w-full">
        <Suspense fallback={<div className="size-full" />}>
          <ThreeNeuralNet />
        </Suspense>
      </div>
    </motion.div>
  )
}
