import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { certifications, competitions } from '@/data/site'

export function Achievements() {
  return (
    <Section id="achievements" index="05" title="Awards & Certifications">
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
        <div>
          <Reveal>
            <h3 className="font-mono text-xs tracking-wide text-ink-muted uppercase">
              Competitions
            </h3>
          </Reveal>
          <Stagger as="ul" className="mt-4 space-y-1" stagger={0.06}>
            {competitions.map((item) => (
              <StaggerItem as="li" key={`${item.title}-${item.event}`}>
                <div className="group flex gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-line hover:bg-surface">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
                  <p className="text-sm leading-relaxed text-pretty">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-ink-muted">
                      {' '}
                      — {item.event}
                    </span>
                    <span className="ml-1 font-mono text-xs text-ink-muted tabular-nums">
                      {item.year}
                    </span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div>
          <Reveal delay={80}>
            <h3 className="font-mono text-xs tracking-wide text-ink-muted uppercase">
              Certifications
            </h3>
          </Reveal>
          <Stagger as="ul" className="mt-4 space-y-1" stagger={0.06} delay={0.1}>
            {certifications.map((item) => (
              <StaggerItem as="li" key={item.name}>
                <div className="group flex gap-3 rounded-lg border border-transparent px-3 py-2.5 transition-colors hover:border-line hover:bg-surface">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
                  <p className="text-sm leading-relaxed text-pretty">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-ink-muted"> — {item.issuer}</span>
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
