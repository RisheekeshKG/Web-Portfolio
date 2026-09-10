import { ActivityHeatmap, HeatmapLegend } from '@/components/ActivityHeatmap'
import { Result, Section } from '@/components/Section'
import { useActivity, type Panel } from '@/hooks/useActivity'
import { site } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

const monthYear = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

type PlatformProps = {
  name: string
  href: string
  description: string
  unit: string
  resultLabel: string
  panel: Panel | null
  loading: boolean
  from: string
  to: string
  window: string
}

function Platform({
  name,
  href,
  description,
  unit,
  resultLabel,
  panel,
  loading,
  from,
  to,
  window,
}: PlatformProps) {
  return (
    <li className={`${SHEET} border-t border-rule pt-6`}>
      <div className="min-w-0">
        <h3 className="text-h3 leading-tight tracking-[-0.015em]">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-calm"
          >
            {name}
          </a>
        </h3>
        <p className="mt-1 font-mono text-small text-calm">{description}</p>

        {/* The empty grid renders immediately and fills in when the data
            lands, so the section never jumps. */}
        <div className="mt-5">
          <ActivityHeatmap
            days={panel?.days ?? {}}
            from={from}
            to={to}
            unit={unit}
            label={
              panel
                ? `${name} calendar, ${window}: ${panel.activeDays} active days.`
                : `${name} calendar, ${window}.`
            }
          />
        </div>

        {!loading && !panel && (
          <p className="mt-3 font-mono text-micro text-muted">
            Calendar unavailable right now —{' '}
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-calm"
            >
              see the profile
            </a>
            .
          </p>
        )}
      </div>

      <div className={GUTTER}>
        {panel && (
          <>
            <p className="font-mono text-micro text-muted">
              {panel.activeDays} active days
            </p>
            <Result value={String(panel.total)} label={resultLabel} />
          </>
        )}
      </div>
    </li>
  )
}

export function Activity() {
  const { from, to, github, leetcode, loading } = useActivity()
  const window = `${monthYear(from)} — ${monthYear(to)}`

  return (
    <Section id="activity" title="Activity" meta={window}>
      <ul className="space-y-10">
        <Platform
          name="LeetCode"
          href={site.links.leetcode}
          description="Daily problem solving"
          unit="submissions"
          resultLabel="problems solved"
          panel={leetcode}
          loading={loading}
          from={from}
          to={to}
          window={window}
        />
        <Platform
          name="GitHub"
          href={site.links.github}
          description="Commits, reviews and issues"
          unit="contributions"
          resultLabel="contributions"
          panel={github}
          loading={loading}
          from={from}
          to={to}
          window={window}
        />
      </ul>

      <HeatmapLegend />
    </Section>
  )
}
