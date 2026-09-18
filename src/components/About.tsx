import { ProjectMark } from '@/components/ProjectMark'
import { Section } from '@/components/Section'
import { about, education, skills } from '@/data/site'

/**
 * Prose on one side, the record on the other. Stacking the two — paragraphs,
 * then a row of dates, then a table of tools — is the shape of a CV, and it
 * reads as one however the type is set.
 */
export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          {/* The opening paragraph carries the section, so it is set at the
              size the hero uses for its own lead. */}
          {about.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? 'text-lead leading-[1.5] text-pretty'
                  : 'leading-[1.7] text-pretty text-muted'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="space-y-3">
          {education.map((entry) => (
            <li
              key={entry.degree}
              className="rounded-lg border border-rule bg-panel-2 p-4 transition-colors hover:border-calm/35"
            >
              <div className="flex items-start gap-3">
                <ProjectMark accent={entry.accent} label={entry.institution} />

                <div className="min-w-0 flex-1">
                  <h3 className="text-body leading-snug text-pretty">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 font-mono text-micro text-calm">
                    {entry.short ?? entry.institution}
                  </p>
                </div>

                {entry.detail && (
                  <span className="measure shrink-0 text-small">
                    {entry.detail}
                  </span>
                )}
              </div>

              <p className="mt-3 border-t border-rule pt-3 font-mono text-micro text-muted">
                {entry.period}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* One card per group rather than a term-and-values table: a reader
          scanning for a language finds it in a block, not on a line. */}
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <li
            key={group.group}
            className="rounded-lg border border-rule bg-panel-2 p-4 transition-colors hover:border-calm/35"
          >
            <p className="font-mono text-micro text-muted">{group.group}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  )
}
