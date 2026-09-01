import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { Reveal } from '@/components/Reveal'
import { CONTAINER } from '@/lib/layout'

type SectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // The ghost numeral drifts opposite to scroll for a light parallax read —
  // suppressed under reduced motion by collapsing the output range to 0.
  const reducedMotion = useReducedMotion()
  const numeralY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [40, -40],
  )

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative w-full overflow-hidden border-t border-line py-20 sm:py-28"
    >
      {/* Bleeds to the true viewport edge — the section itself is full
          width, only the content below is constrained to CONTAINER. */}
      <motion.span
        aria-hidden="true"
        style={{ y: numeralY }}
        className="pointer-events-none absolute top-8 right-6 -z-10 font-mono text-[7rem] leading-none font-bold text-ink/[0.04] select-none sm:right-8 sm:text-[10rem]"
      >
        {index}
      </motion.span>

      <div className={CONTAINER}>
        <Reveal>
          <div className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="font-mono text-xs text-accent tabular-nums"
            >
              {index}
            </span>
            <h2 id={`${id}-heading`}>
              <AnimatedText
                text={title}
                className="block text-2xl font-semibold tracking-tight sm:text-3xl"
              />
            </h2>
          </div>
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
