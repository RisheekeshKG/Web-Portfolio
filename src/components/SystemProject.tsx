import { Entry } from '@/components/Experience'
import { Section } from '@/components/Section'
import { systemProjects } from '@/data/site'

export function SystemProject() {
  return (
    <Section id="system" title="System Project" meta="team competition work">
      <ol className="space-y-10">
        {systemProjects.map((role) => (
          <Entry key={`${role.org}-${role.title}`} role={role} />
        ))}
      </ol>
    </Section>
  )
}
