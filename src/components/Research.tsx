import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { research } from '@/data/site'

export function Research() {
  return (
    <Section id="research" title="Research">
      <TiltCard as="article" tilt={2} className="group/card p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-xs text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            {research.status}
          </span>
          <span className="font-mono text-xs text-ink-muted">
            {research.venue}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-medium text-balance transition-colors group-hover/card:text-accent">
          {research.title}
        </h3>

        <ul className="mt-3 max-w-2xl space-y-2">
          {research.points.map((point) => (
            <li
              key={point}
              className="relative pl-4 text-sm leading-relaxed text-pretty text-ink-muted before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-line"
            >
              {point}
            </li>
          ))}
        </ul>

        <Stagger
          as="dl"
          stagger={0.09}
          className="mt-6 grid grid-cols-2 gap-5 border-t border-line pt-6 sm:grid-cols-4"
        >
          {research.metrics.map((metric) => (
            <StaggerItem key={metric.label}>
              <dt className="font-mono text-xs text-ink-muted">
                {metric.label}
              </dt>
              <dd className="mt-1 bg-gradient-to-br from-ink to-ink/60 bg-clip-text text-xl font-semibold text-transparent tabular-nums">
                <AnimatedCounter value={metric.value} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </TiltCard>
    </Section>
  )
}
