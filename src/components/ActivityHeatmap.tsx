import { useIsDark } from '@/hooks/useIsDark'
import { ramp, sample } from '@/lib/ramp'

const CELL = 10
const GAP = 3
const STEP = CELL + GAP
const ROWS = 7
const LABEL_H = 15

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

/**
 * Activity is bucketed by quartile rather than scaled linearly: one
 * twenty-commit day would otherwise flatten every ordinary day to the bottom
 * of the scale. Buckets stop short of the ember end of the ramp, so the hero
 * forecast keeps the top of the scale to itself.
 */
const BUCKETS = [0.28, 0.44, 0.6, 0.76]

function thresholds(counts: number[]) {
  const sorted = [...counts].sort((a, b) => a - b)
  const at = (q: number) => sorted[Math.floor((sorted.length - 1) * q)] ?? 0
  return [at(0.25), at(0.5), at(0.75)]
}

function eachDay(from: string, to: string) {
  const dates: string[] = []
  const cursor = new Date(`${from}T00:00:00Z`)
  const end = new Date(`${to}T00:00:00Z`)
  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return dates
}

export function ActivityHeatmap({
  days,
  from,
  to,
  unit,
  label,
}: {
  days: Record<string, number>
  from: string
  to: string
  /** What one count means, for the per-day tooltip: "contributions". */
  unit: string
  /** Describes the whole figure for screen readers. */
  label: string
}) {
  const isDark = useIsDark()
  const scale = ramp(isDark)

  const dates = eachDay(from, to)
  const weeks = Math.ceil(dates.length / ROWS)
  const [q1, q2, q3] = thresholds(Object.values(days))

  const width = weeks * STEP - GAP
  const height = ROWS * STEP - GAP

  function level(count: number) {
    if (count <= q1) return BUCKETS[0]
    if (count <= q2) return BUCKETS[1]
    if (count <= q3) return BUCKETS[2]
    return BUCKETS[3]
  }

  // A month is labelled at the first week whose Sunday falls inside it, unless
  // the label would run past the right edge and render clipped.
  const monthLabels: { x: number; text: string }[] = []
  let lastMonth = -1
  for (let week = 0; week < weeks; week++) {
    const date = dates[week * ROWS]
    if (!date) break
    const month = Number(date.slice(5, 7)) - 1
    if (month !== lastMonth) {
      lastMonth = month
      const x = week * STEP
      if (x + 20 <= width) monthLabels.push({ x, text: MONTHS[month] })
    }
  }

  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${width} ${height + LABEL_H}`}
        width={width}
        height={height + LABEL_H}
        className="max-w-none"
      >
        {monthLabels.map((month) => (
          <text
            key={`${month.text}-${month.x}`}
            x={month.x}
            y={10}
            className="fill-[var(--muted)] font-mono text-[9px]"
          >
            {month.text}
          </text>
        ))}

        {dates.map((date, index) => {
          const count = days[date] ?? 0
          const x = Math.floor(index / ROWS) * STEP
          const y = (index % ROWS) * STEP + LABEL_H
          return (
            <rect
              key={date}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx={2}
              fill={count ? sample(scale, level(count)) : 'var(--trace)'}
            >
              {count > 0 && (
                <title>{`${date}: ${count} ${count === 1 ? unit.replace(/s$/, '') : unit}`}</title>
              )}
            </rect>
          )
        })}
      </svg>
    </div>
  )
}

/** Shared low-to-high key, so the buckets above are readable as a scale. */
export function HeatmapLegend() {
  const isDark = useIsDark()
  const scale = ramp(isDark)

  return (
    <p className="mt-9 flex items-center gap-2 font-mono text-micro text-muted">
      <span>less</span>
      <span aria-hidden="true" className="flex gap-[3px]">
        <span className="size-2.5 rounded-xs" style={{ background: 'var(--trace)' }} />
        {BUCKETS.map((bucket) => (
          <span
            key={bucket}
            className="size-2.5 rounded-xs"
            style={{ background: sample(scale, bucket) }}
          />
        ))}
      </span>
      <span>more</span>
    </p>
  )
}
