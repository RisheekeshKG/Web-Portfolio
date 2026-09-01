import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { systemProjects } from '@/data/site'

export function SystemProject() {
  return (
    <Section id="system" title="System Project">
      <Stagger className="grid gap-4" stagger={0.1}>
        {systemProjects.map((role) => (
          <StaggerItem key={`${role.org}-${role.title}`}>
            <TiltCard as="article" tilt={3} className="group/card p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium transition-colors group-hover/card:text-accent">
                  {role.org}
                </h3>
                {role.period && (
                  <span className="font-mono text-xs text-ink-muted">
                    {role.period}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-accent">{role.title}</p>

              <ul className="mt-3 max-w-2xl space-y-2">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-sm leading-relaxed text-pretty text-ink-muted before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-line"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
