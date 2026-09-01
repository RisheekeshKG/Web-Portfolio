import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { about, education, skills } from '@/data/site'

const allSkills = skills.flatMap((group) => group.items)
const mid = Math.ceil(allSkills.length / 2)

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-accent/50 hover:text-ink">
      {children}
    </span>
  )
}

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <Stagger className="max-w-xl space-y-4">
        {about.map((paragraph) => (
          <StaggerItem key={paragraph}>
            <p className="leading-relaxed text-pretty text-ink-muted">
              {paragraph}
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={100}>
        <h3 className="mt-12 font-mono text-xs tracking-wide text-ink-muted uppercase">
          Education
        </h3>
      </Reveal>
      <Stagger className="mt-4 grid gap-4 sm:grid-cols-2" stagger={0.1}>
        {education.map((entry) => (
          <StaggerItem key={entry.degree}>
            <TiltCard className="h-full p-5" tilt={4}>
              <p className="font-medium text-pretty">{entry.degree}</p>
              <p className="mt-1 text-sm text-ink-muted">{entry.institution}</p>
              <p className="mt-3 font-mono text-xs text-accent">
                {entry.period}
                {entry.detail && (
                  <span className="text-ink-muted"> · {entry.detail}</span>
                )}
              </p>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={120}>
        <h3 className="mt-12 font-mono text-xs tracking-wide text-ink-muted uppercase">
          Skills
        </h3>
      </Reveal>
      {/* Breaks out of the section container so the ticker runs edge to edge.
          full-bleed lives on a static wrapper because Motion writes its own
          inline transform, which would override the utility's translateX. */}
      <div className="full-bleed mt-4">
        <Reveal delay={160} className="space-y-3">
          <Marquee items={allSkills.slice(0, mid).map((s) => <Tag key={s}>{s}</Tag>)} />
          <Marquee
            reverse
            items={allSkills.slice(mid).map((s) => <Tag key={s}>{s}</Tag>)}
          />
        </Reveal>
      </div>
    </Section>
  )
}
