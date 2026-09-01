import { motion, useReducedMotion } from 'motion/react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { NeuralNet } from '@/components/NeuralNet'
import { stats } from '@/data/site'

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

      <div className="mt-3">
        <NeuralNet />
      </div>

      <dl className="mt-4 grid grid-cols-4 gap-2 border-t border-line pt-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <dd className="bg-gradient-to-br from-ink to-ink/60 bg-clip-text text-lg font-semibold text-transparent tabular-nums sm:text-xl">
              <AnimatedCounter value={stat.value} />
            </dd>
            <dt className="mt-0.5 font-mono text-[0.65rem] tracking-wide text-ink-muted uppercase">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
