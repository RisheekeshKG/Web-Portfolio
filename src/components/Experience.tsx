import { Points, Result, Section } from '@/components/Section'
import { experience, type Role } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

export function Entry({ role }: { role: Role }) {
  return (
    <li className={`${SHEET} border-t border-rule pt-7`}>
      <div>
        <h3 className="text-h3 leading-tight tracking-[-0.015em]">{role.org}</h3>
        <p className="mt-1 font-mono text-small text-calm">{role.title}</p>
        <Points points={role.points} />
      </div>

      <div className={GUTTER}>
        {role.period && (
          <p className="font-mono text-micro text-muted">{role.period}</p>
        )}
        {role.result && <Result {...role.result} />}
      </div>
    </li>
  )
}

export function Experience() {
  return (
    <Section id="experience" title="Experience" meta="2 internships">
      <ol className="space-y-10">
        {experience.map((role) => (
          <Entry key={`${role.org}-${role.title}`} role={role} />
        ))}
      </ol>
    </Section>
  )
}
