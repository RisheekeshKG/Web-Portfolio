import type { ReactNode } from 'react'
import { CONTAINER } from '@/lib/layout'

type SectionProps = {
  id: string
  title: string
  /**
   * A fact about the section's contents — a count, a date range, a status.
   * The heading rule carries information rather than a decorative index.
   */
  meta?: string
  children: ReactNode
}

export function Section({ id, title, meta, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="w-full border-t border-rule py-12 sm:py-16"
    >
      <div className={CONTAINER}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
          <h2
            id={`${id}-heading`}
            className="text-h2 font-semibold tracking-[-0.02em]"
          >
            {title}
          </h2>
          {meta && <span className="font-mono text-micro text-muted">{meta}</span>}
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

/**
 * A measured outcome in the values gutter. Amber appears here and nowhere
 * else on the page, so a number always means the same thing.
 */
export function Result({ value, label }: { value: string; label: string }) {
  return (
    <p className="md:mt-3">
      <span className="measure block text-h3 leading-none">{value}</span>
      <span className="mt-1.5 block font-mono text-micro leading-snug text-muted">
        {label}
      </span>
    </p>
  )
}

/** Body copy inside an entry: bulletless, because the rules already separate. */
export function Points({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 max-w-[68ch] space-y-2.5">
      {points.map((point) => (
        <li key={point} className="text-small leading-relaxed text-pretty text-muted">
          {point}
        </li>
      ))}
    </ul>
  )
}
