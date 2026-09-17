import { useRef, useState, type CSSProperties } from 'react'
import { Points, Result } from '@/components/Section'
import { experience, type Role } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

/** A month counted from year zero, so spans can be measured arithmetically. */
function monthIndex(month: string) {
  const [year, index] = month.split('-').map(Number)
  return year * 12 + (index - 1)
}

function monthName(index: number) {
  return MONTHS[((index % 12) + 12) % 12]
}

function monthLabel(index: number, withYear: boolean) {
  return withYear
    ? `${monthName(index)} ${Math.floor(index / 12)}`
    : monthName(index)
}

/** Inclusive of both end months, the way a CV counts them. */
function duration(months: number) {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (rest || !years) parts.push(`${rest} mo${rest === 1 ? '' : 's'}`)
  return parts.join(' ')
}

type Segment = {
  role: Role
  /** Percentages across the axis, ready for the pill's inline position. */
  left: number
  width: number
  months: number
  period: string
  duration: string
}

/**
 * Places every dated role on one axis, so the shape of the record — the length
 * of each role and the gaps between them — is visible before a word is read.
 * The axis runs from the first month worked to the current month; a role is
 * positioned by its real dates rather than by its place in the list.
 *
 * Built once at module scope rather than in a hook: it reads the clock, which
 * is not something a memo can be proven stable against, and no page session
 * outlives the month it was loaded in.
 */
function buildTimeline() {
  const now = new Date()
  const nowIndex = now.getFullYear() * 12 + now.getMonth()

  const dated = experience
    .filter((role) => role.start)
    .sort((a, b) => monthIndex(a.start!) - monthIndex(b.start!))

  if (!dated.length) return { segments: [] as Segment[], ticks: [] as number[], span: 1, from: 0 }

  const starts = dated.map((role) => monthIndex(role.start!))
  const ends = dated.map((role) => (role.end ? monthIndex(role.end) : nowIndex))
  const from = Math.min(...starts)
  const to = Math.max(nowIndex, ...ends)
  const span = to - from + 1

  const segments: Segment[] = dated.map((role, index) => {
    const start = starts[index]
    const end = ends[index]
    const months = end - start + 1
    return {
      role,
      left: ((start - from) / span) * 100,
      width: (months / span) * 100,
      months,
      period: `${monthLabel(start, true)} — ${
        role.end ? monthLabel(end, true) : 'Present'
      }`,
      duration: duration(months),
    }
  })

  // A tick each quarter, minus any that would collide with the `Now` rule.
  const ticks: number[] = []
  for (let offset = 0; offset < span - 2; offset += 3) ticks.push(from + offset)

  return { segments, ticks, span, from }
}

const { segments, ticks, span, from } = buildTimeline()

export function ExperienceTimeline() {
  // The most recent role is the one a reader is asking about first.
  const [selected, setSelected] = useState(() => Math.max(0, segments.length - 1))
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  if (!segments.length) return null

  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = segments.length - 1
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null

    if (next === null) return
    event.preventDefault()
    setSelected(next)
    tabs.current[next]?.focus()
  }

  return (
    <div>
      {/* The axis. Hidden on narrow screens, where proportional pills would be
          too small to read and the roles stack into a plain list instead. */}
      <div aria-hidden="true" className="relative hidden h-5 sm:block">
        {ticks.map((tick, index) => {
          const left = ((tick - from) / span) * 100
          return (
            <span
              key={tick}
              style={{ left: `${left}%` }}
              className={`absolute top-0 font-mono text-micro text-muted ${
                index === 0 ? '' : '-translate-x-1/2'
              }`}
            >
              {monthLabel(tick, index === 0 || tick % 12 === 0)}
            </span>
          )
        })}
        <span className="absolute top-0 right-0 font-mono text-micro text-ink">
          Now
        </span>
      </div>

      <div className="relative">
        {/* Baseline and quarter marks, the graph paper the pills sit on. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-full sm:block"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-rule" />
          {ticks.map((tick) => (
            <div
              key={tick}
              style={{ left: `${((tick - from) / span) * 100}%` }}
              className="absolute top-0 h-2 w-px bg-rule"
            />
          ))}
          <div className="absolute top-0 right-0 h-full w-px bg-rule" />
        </div>

        <div
          role="tablist"
          aria-label="Roles"
          aria-orientation="horizontal"
          className="relative flex flex-col gap-2 pt-3 sm:block sm:h-14 sm:pt-4"
        >
          {segments.map((segment, index) => {
            const isSelected = index === selected
            // A short role gets a narrow pill. Below roughly a fifth of the
            // axis there is no room for both the name and the duration, and
            // the name is the half that identifies the segment — the duration
            // is repeated in the panel below either way.
            const compact = segment.width < 22
            return (
              <button
                key={`${segment.role.org}-${segment.role.title}`}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`role-tab-${index}`}
                aria-selected={isSelected}
                aria-controls={`role-panel-${index}`}
                tabIndex={isSelected ? 0 : -1}
                title={`${segment.role.org} · ${segment.period}`}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                style={
                  {
                    '--seg-x': `${segment.left}%`,
                    '--seg-w': `${segment.width}%`,
                  } as CSSProperties
                }
                className={`flex h-10 w-full items-center gap-2.5 rounded-full border px-3 text-left transition-colors sm:absolute sm:top-4 sm:left-(--seg-x) sm:w-(--seg-w) sm:min-w-32 ${
                  isSelected
                    ? 'border-calm/45 bg-calm/12 text-ink'
                    : 'border-rule bg-panel-2 text-muted hover:border-calm/35 hover:text-ink'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-6 shrink-0 place-items-center rounded-sm border font-mono text-[0.625rem] ${
                    isSelected
                      ? 'border-calm/45 bg-calm/15 text-calm'
                      : 'border-rule bg-panel text-muted'
                  }`}
                >
                  {segment.role.org.charAt(0)}
                </span>

                <span className="min-w-0 flex-1 truncate font-mono text-micro">
                  {segment.role.short ?? segment.role.org}
                </span>

                <span
                  className={`shrink-0 font-mono text-micro text-muted ${
                    compact ? 'sm:hidden' : ''
                  }`}
                >
                  {segment.duration}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Every role stays in the document; only the selected one is shown, so
          the section still reads as a complete record without JavaScript
          selection or to a crawler. */}
      <div className="mt-8">
        {segments.map((segment, index) => (
          <div
            key={`${segment.role.org}-${segment.role.title}-panel`}
            role="tabpanel"
            id={`role-panel-${index}`}
            aria-labelledby={`role-tab-${index}`}
            tabIndex={0}
            hidden={index !== selected}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-rule pt-6">
              <div>
                <h3 className="text-h3 leading-tight tracking-[-0.015em]">
                  {segment.role.title}
                </h3>
                <p className="mt-1 font-mono text-micro text-muted">
                  {segment.period}
                </p>
              </div>

              {segment.role.href ? (
                <a
                  href={segment.role.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-small text-muted transition-colors hover:text-calm"
                >
                  {segment.role.org} <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <p className="font-mono text-small text-calm">
                  {segment.role.org}
                </p>
              )}
            </div>

            <div className={`${SHEET} mt-1`}>
              <Points points={segment.role.points} />
              <div className={GUTTER}>
                {segment.role.result && <Result {...segment.role.result} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
