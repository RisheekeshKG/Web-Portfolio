import { Points, Result, Section } from '@/components/Section'
import { systemProjects, type Role } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

function Entry({ role }: { role: Role }) {
  return (
    <li className={`${SHEET} border-t border-rule pt-6`}>
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

export function SystemProject() {
  return (
    <Section id="system" title="System Project" meta="team competition work">
      <ol className="space-y-8">
        {systemProjects.map((role) => (
          <Entry key={`${role.org}-${role.title}`} role={role} />
        ))}
      </ol>
    </Section>
  )
}
