import type { CSSProperties, ReactNode } from 'react'
import { Section } from '@/components/Section'
import { projects, type Project, type ProjectIcon } from '@/data/site'

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
 * Fallback mark for a project with no icon assigned. A leading article is not
 * what identifies a project, so "The Atlas Protocol" is filed under A.
 */
function monogram(title: string) {
  return title.replace(/^(the|a|an)\s+/i, '').charAt(0).toUpperCase()
}

function Mark({ project }: { project: Project }) {
  const accent = project.accent ?? 'slate'
  const tile = {
    background: `var(--tint-${accent}-bg)`,
    color: `var(--tint-${accent}-fg)`,
    borderColor: `color-mix(in srgb, var(--tint-${accent}-fg) 22%, transparent)`,
  } as CSSProperties

  return (
    <span
      aria-hidden="true"
      style={tile}
      className="grid size-10 shrink-0 place-items-center rounded-md border font-mono text-small"
    >
      {project.icon ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          {ICONS[project.icon]}
        </svg>
      ) : (
        monogram(project.title)
      )}
    </span>
  )
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-micro text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-calm"
    >
      {label}
    </a>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="group flex flex-col rounded-lg border border-rule bg-panel-2 p-5 transition-colors hover:border-calm/35">
      {/* Only the title sits beside the mark. The body runs the full width of
          the card, so everything below shares one left edge rather than
          stepping in and out around the tile. */}
      <div className="flex items-center gap-3">
        <Mark project={project} />

        <h3 className="min-w-0 text-lead leading-snug tracking-[-0.015em]">
          {project.title}
        </h3>
      </div>

      <p className="mt-4 font-mono text-micro leading-relaxed text-pretty text-calm">
        {project.subtitle}
      </p>

      {/* The card keeps the detail rather than sending it somewhere that does
          not exist yet — there are no project pages to link out to. */}
      <div className="mt-3 space-y-2.5">
        {project.points.map((point) => (
          <p key={point} className="text-small leading-relaxed text-pretty text-muted">
            {point}
          </p>
        ))}
      </div>

      {/* Pinned to the foot so the chip rows line up across a row of cards
          whose prose runs to different lengths. */}
      <div className="mt-auto pt-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        {(project.href || project.repo) && (
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-3">
            {project.href && <SourceLink href={project.href} label="Live site" />}
            {project.repo && <SourceLink href={project.repo} label="Source" />}
          </p>
        )}
      </div>
    </li>
  )
}

export function Projects() {
  return (
    <Section id="projects" title="Projects" meta={`${projects.length} selected`}>
      <p className="max-w-[58ch] text-pretty text-muted">
        Built end to end, each one solving a problem I actually ran into.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </ul>
    </Section>
  )
}
