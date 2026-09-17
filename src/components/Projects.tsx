import { useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ProjectDialog } from '@/components/ProjectDialog'
import { ProjectMark } from '@/components/ProjectMark'
import { Section } from '@/components/Section'
import { projects, type Project } from '@/data/site'

/** The GitHub mark, so a repository link is recognisable without a label. */
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
    </svg>
  )
}

/**
 * A card is a scanning surface: the mark, the name, and the one-line claim,
 * nothing that asks to be read. The evidence opens in a dialog.
 *
 * The heading stays a real heading and the trigger is a button stretched over
 * the whole card, rather than a button wrapping the text — so the outline of
 * the section survives, and the click target is still the entire card.
 */
function ProjectCard({
  project,
  onOpen,
  triggerRef,
}: {
  project: Project
  onOpen: () => void
  triggerRef: (node: HTMLButtonElement | null) => void
}) {
  return (
    <li className="group relative flex items-start gap-3.5 rounded-lg border border-rule bg-panel-2 p-4 transition-colors hover:border-calm/35">
      <ProjectMark project={project} />

      <div className="min-w-0 flex-1">
        <h3 className="text-body leading-snug tracking-[-0.01em]">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-small leading-relaxed text-pretty text-muted">
          {project.subtitle}
        </p>
      </div>

      {/* Sits in the flow rather than over the text, so a long title can never
          run under it, and above the stretched trigger so it takes its own
          click instead of opening the dialog. */}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="relative z-10 -mt-0.5 -mr-1 grid size-8 shrink-0 place-items-center rounded-sm text-muted transition-colors hover:bg-panel hover:text-ink"
        >
          <GitHubMark />
        </a>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="absolute inset-0 rounded-lg"
      >
        <span className="sr-only">{`${project.title} — read more`}</span>
      </button>
    </li>
  )
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(null)
  const triggers = useRef<(HTMLButtonElement | null)[]>([])

  // Focus goes back where it came from, so closing the dialog does not drop a
  // keyboard reader at the top of the page.
  function close() {
    const index = open
    setOpen(null)
    if (index !== null) triggers.current[index]?.focus()
  }

  return (
    <Section id="projects" title="Projects" meta={`${projects.length} selected`}>
      <p className="max-w-[58ch] text-pretty text-muted">
        Built end to end, each one solving a problem I actually ran into. Open
        one for what it does and what it is made of.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={() => setOpen(index)}
            triggerRef={(node) => {
              triggers.current[index] = node
            }}
          />
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <ProjectDialog project={projects[open]} onClose={close} />
        )}
      </AnimatePresence>
    </Section>
  )
}
