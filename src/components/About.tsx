import { Section } from '@/components/Section'
import { about, education, skills } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="max-w-[68ch] space-y-5">
        {about.map((paragraph) => (
          <p key={paragraph} className="leading-[1.7] text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      <ul className="mt-10 space-y-5">
        {education.map((entry) => (
          <li key={entry.degree} className={`${SHEET} border-t border-rule pt-6`}>
            <div>
              <h3 className="text-pretty">{entry.degree}</h3>
              <p className="mt-1 text-small text-muted">{entry.institution}</p>
            </div>
            <div className={GUTTER}>
              <p className="font-mono text-micro text-muted">{entry.period}</p>
              {entry.detail && (
                <p className="font-mono text-micro text-muted md:mt-1.5">
                  {entry.detail}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Grouped rather than a ticker: the group names are real information,
          and a scrolling list throws them away. Read as a spec table — term on
          the left, values to its right — rather than as the values gutter,
          because a category is a label, not a measurement. */}
      <dl className="mt-10 space-y-0">
        {skills.map((group) => (
          <div
            key={group.group}
            className="-mx-2 grid gap-x-10 gap-y-2 rounded-sm border-t border-rule px-2 py-5 transition-colors hover:bg-panel-2 md:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <dt className="font-mono text-micro text-muted">{group.group}</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-small">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
