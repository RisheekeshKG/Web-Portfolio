import { Section } from '@/components/Section'
import { certifications, competitions } from '@/data/site'

export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Awards"
      meta={`${competitions.length} placements`}
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-x-16">
        <div>
          <h3 className="text-h3 leading-tight tracking-[-0.015em]">
            Competitions
          </h3>
          <ol className="mt-6">
            {competitions.map((item) => (
              <li
                key={`${item.title}-${item.event}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-t border-rule py-4"
              >
                <div>
                  <p className="text-pretty">{item.event}</p>
                  <p className="mt-0.5 font-mono text-micro text-muted">
                    {item.title}
                  </p>
                </div>
                <span className="font-mono text-micro text-muted">{item.year}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-h3 leading-tight tracking-[-0.015em]">
            Certifications
          </h3>
          <ul className="mt-6">
            {certifications.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-t border-rule py-4"
              >
                <p className="text-pretty">{item.name}</p>
                <span className="font-mono text-micro text-muted">
                  {item.issuer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
