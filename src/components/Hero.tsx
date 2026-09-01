import { motion, useReducedMotion } from 'motion/react'
import { MagneticButton } from '@/components/MagneticButton'
import { HeroPanel } from '@/components/HeroPanel'
import { MeshGradient } from '@/components/MeshGradient'
import { AnimatedText } from '@/components/motion/AnimatedText'
import { useSpotlight } from '@/hooks/useSpotlight'
import { site } from '@/data/site'
import { CONTAINER } from '@/lib/layout'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  const reducedMotion = useReducedMotion()
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reducedMotion ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: easeOutExpo }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function Hero() {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>()
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="spotlight relative w-full overflow-hidden py-24 sm:py-32"
    >
      {/* Full width, so the mesh/grid glow reaches the true viewport edges;
          only the text content below is constrained to CONTAINER. */}
      <MeshGradient />

      <div className={CONTAINER}>
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
          <div>
            {site.availability && (
              <Line delay={0.05}>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-muted">
                  <span className="relative flex size-1.5">
                    {!reducedMotion && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    )}
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  {site.availability}
                </span>
              </Line>
            )}

            <h1>
              <AnimatedText
                onMount
                text={site.name}
                className="block bg-gradient-to-br from-ink to-ink/70 bg-clip-text text-5xl font-bold tracking-tight text-balance text-transparent sm:text-7xl"
              />
            </h1>

            <Line delay={0.22} className="mt-4">
              <p className="font-mono text-sm text-accent sm:text-base">
                {site.role} · {site.location}
              </p>
            </Line>

            <Line delay={0.3} className="mt-6">
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-ink-muted">
                {site.tagline}
              </p>
            </Line>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: easeOutExpo }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <MagneticButton
                as="a"
                href="#projects"
                className="inline-block rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-opacity hover:opacity-85"
              >
                View my work
              </MagneticButton>
              <MagneticButton
                as="a"
                href={`mailto:${site.email}`}
                className="inline-block rounded-md border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </MagneticButton>
            </motion.div>
          </div>

          <HeroPanel />
        </div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex items-center gap-2 text-xs text-ink-muted"
          aria-hidden="true"
        >
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-line p-1">
            <motion.span
              animate={reducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="size-1 rounded-full bg-accent"
            />
          </span>
          Scroll
        </motion.div>
      </div>
    </section>
  )
}
