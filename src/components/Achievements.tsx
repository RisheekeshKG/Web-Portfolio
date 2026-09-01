import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { certifications, competitions } from '@/data/site'

function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M8 21h8M12 17v4M7 4h10v4.5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2M17 6h2a2 2 0 0 1 0 4h-2" />
    </svg>
  )
}

function CertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <circle cx="12" cy="9" r="5" />
      <path d="m8.5 13.2-1.2 7.3 4.7-2.8 4.7 2.8-1.2-7.3" />
    </svg>
  )
}

function Card({
  icon,
  title,
  subtitle,
  meta,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  meta?: string
}) {
  return (
    <div className="group flex h-full items-start gap-3.5 rounded-xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-accent/50">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-canvas text-accent transition-colors duration-300 group-hover:border-accent/50">
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-pretty">{title}</p>
          {meta && (
            <span className="mt-0.5 shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.7rem] text-ink-muted tabular-nums">
              {meta}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-pretty text-ink-muted">{subtitle}</p>
      </div>
    </div>
  )
}

export function Achievements() {
  return (
    <Section id="achievements" title="Awards & Certifications">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-8">
        <div>
          <Reveal>
            <h3 className="font-mono text-xs tracking-wide text-ink-muted uppercase">
              Competitions
            </h3>
          </Reveal>
          <Stagger as="ul" className="mt-4 grid gap-3" stagger={0.06}>
            {competitions.map((item) => (
              <StaggerItem as="li" key={`${item.title}-${item.event}`}>
                <Card
                  icon={<TrophyIcon />}
                  title={item.title}
                  subtitle={item.event}
                  meta={item.year}
                />
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
          <Stagger as="ul" className="mt-4 grid gap-3" stagger={0.06} delay={0.1}>
            {certifications.map((item) => (
              <StaggerItem as="li" key={item.name}>
                <Card
                  icon={<CertIcon />}
                  title={item.name}
                  subtitle={item.issuer}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
