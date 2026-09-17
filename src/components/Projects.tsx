import { useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { ProjectDialog } from '@/components/ProjectDialog'
import { ProjectMark } from '@/components/ProjectMark'
import { Section } from '@/components/Section'
import { projects, type Project } from '@/data/site'

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
