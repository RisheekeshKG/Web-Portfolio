import type { CSSProperties, ReactNode } from 'react'
import type { ProjectAccent, ProjectIcon } from '@/data/site'

/**
 * Drawn here rather than pulled from an icon package: seven glyphs is less
 * code than a dependency, and each one can say what its project actually
 * does — a trace, a board, a face — instead of a generic stand-in.
 */
const ICONS: Record<ProjectIcon, ReactNode> = {
  waveform: <path d="M2 12h3.5l3-8 4 16 3-8H21" />,
  board: (
    <>
      <rect x="3" y="4" width="7" height="16" rx="1.5" />
      <rect x="14" y="4" width="7" height="9" rx="1.5" />
    </>
  ),
  robot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3.5" />
      <path d="M12 4v4" />
      <path d="M9.5 13.5v1.5M14.5 13.5v1.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3 21h18" />
      <path d="M6.5 21v-7M12 21V4.5M17.5 21v-10" />
    </>
  ),
  chat: (
    <>
      <path d="M20 13.5a3 3 0 0 1-3 3H9.5L5 20v-3.5a3 3 0 0 1-1-2.24V7.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
      <path d="M8.5 10.5h7" />
    </>
  ),
  pen: (
    <>
      <path d="M3 21c0-3 1-5.5 2.8-7.3l8.9-8.9a2.6 2.6 0 0 1 3.7 3.7l-8.9 8.9C7.7 19.2 5.6 20.4 3 21Z" />
      <path d="M13.2 6.2l4.6 4.6" />
    </>
  ),
  face: (
    <>
      <path d="M4 8.5V6.5A2.5 2.5 0 0 1 6.5 4h2M15.5 4h2A2.5 2.5 0 0 1 20 6.5v2M20 15.5v2a2.5 2.5 0 0 1-2.5 2.5h-2M8.5 20h-2A2.5 2.5 0 0 1 4 17.5v-2" />
      <circle cx="12" cy="11" r="2.25" />
      <path d="M8.5 16.75a4.4 4.4 0 0 1 7 0" />
    </>
  ),
}

/**
 * A leading article is not what identifies a project, so "The Atlas Protocol"
 * falls back to A.
 */
function monogram(title: string) {
  return title.replace(/^(the|a|an)\s+/i, '').charAt(0).toUpperCase()
}

/**
 * The tile is lit rather than flat: a diagonal wash of the accent over its own
 * ground, a hairline of the same hue, and a single bright line inside the top
 * edge — the way a physical key catches light. All of it derives from one
 * accent variable, so a tile cannot drift out of the palette.
 */
export function ProjectMark({
  icon,
  accent = 'slate',
  label,
  size = 'md',
}: {
  icon?: ProjectIcon
  accent?: ProjectAccent
  /** Falls back to this title's initial when there is no icon. */
  label?: string
  size?: 'md' | 'lg'
}) {
  const fg = `var(--tint-${accent}-fg)`
  const bg = `var(--tint-${accent}-bg)`

  const style = {
    background: `linear-gradient(150deg, color-mix(in srgb, ${fg} 26%, ${bg}), ${bg} 72%)`,
    color: fg,
    borderColor: `color-mix(in srgb, ${fg} 24%, transparent)`,
    boxShadow: `inset 0 1px 0 color-mix(in srgb, ${fg} 32%, transparent), 0 1px 3px rgb(0 0 0 / 0.2)`,
  } as CSSProperties

  const box = size === 'lg' ? 'size-14 rounded-xl' : 'size-12 rounded-xl'
  const glyph = size === 'lg' ? 'size-7' : 'size-6'

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`grid shrink-0 place-items-center border font-mono text-lead ${box}`}
    >
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={glyph}
        >
          {ICONS[icon]}
        </svg>
      ) : (
        monogram(label ?? '')
      )}
    </span>
  )
}
