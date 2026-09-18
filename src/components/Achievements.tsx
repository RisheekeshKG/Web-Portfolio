import { Section } from '@/components/Section'
import { certifications, competitions } from '@/data/site'

/**
 * A placement is the fact worth reading here, so it leads the card in the
 * accent rather than sitting under the event name in grey. Two columns of
 * ruled rows said the same thing in the shape of a CV.
 */
function Placement({ rank }: { rank: string }) {
  // A podium finish gets the filled treatment; the rest get the outline, so
  // the top of the list is findable without reading every card.
  const podium = /^(first|second|third|winner)/i.test(rank)

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.04em] uppercase ${
        podium
          ? 'border-calm/45 bg-calm/12 text-calm'
          : 'border-rule bg-panel text-muted'
      }`}
    >
      {rank}
    </span>
  )
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Awards"
      meta={`${competitions.length} placements`}
    >
      <p className="max-w-[58ch] text-pretty text-muted">
        Hackathons and robotics competitions, and the certificates picked up
        along the way.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((item) => (
          <li
            key={`${item.title}-${item.event}`}
            className="flex flex-col rounded-lg border border-rule bg-panel-2 p-4 transition-colors hover:border-calm/35"
          >
            <div className="flex items-start justify-between gap-3">
              <Placement rank={item.title} />
              <span className="shrink-0 font-mono text-micro text-muted">
                {item.year}
              </span>
            </div>

            <h3 className="mt-3 text-body leading-snug text-pretty">
              {item.event}
            </h3>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <h3 className="font-mono text-micro tracking-[0.04em] text-muted uppercase">
          Certifications
        </h3>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item) => (
            <li
              key={item.name}
              className="flex flex-col rounded-lg border border-rule bg-panel-2 p-4 transition-colors hover:border-calm/35"
            >
              <span className="font-mono text-micro text-calm">
                {item.issuer}
              </span>
              <p className="mt-2 text-small leading-snug text-pretty">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
