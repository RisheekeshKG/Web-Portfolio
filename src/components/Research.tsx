import { Points, Section } from '@/components/Section'
import { research } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

export function Research() {
  return (
    <Section id="research" title="Research" meta={research.venue}>
      <div className={`${SHEET} border-t border-rule pt-6`}>
        <div>
          <h3 className="max-w-[34ch] text-h3 leading-tight text-balance tracking-[-0.015em]">
            {research.title}
          </h3>
          <Points points={research.points} />
        </div>

        <div className={GUTTER}>
          <p className="font-mono text-micro text-muted">{research.status}</p>
        </div>
      </div>

      {/* The paper's results, set as a readout row rather than a card grid —
          these four numbers are the section's argument. Each pair leads with
          its dt as the list semantics require; column-reverse puts the value
          above its label. */}
      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-6 sm:grid-cols-4">
        {research.metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col-reverse">
            <dt className="mt-2 font-mono text-micro text-muted">{metric.label}</dt>
            <dd className="measure text-h3 leading-none">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
