import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { Section } from '@/components/Section'
import { experience } from '@/data/site'

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      meta={`${experience.length} internships`}
    >
      <p className="max-w-[58ch] text-pretty text-muted">
        Both roles, placed by their real dates rather than by list order — the
        length of each, and the gap between them, is part of the record. Pick
        one to read what it involved.
      </p>

      <div className="mt-8">
        <ExperienceTimeline />
      </div>
    </Section>
  )
}
