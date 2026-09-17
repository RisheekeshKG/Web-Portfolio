import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ProjectMark } from '@/components/ProjectMark'
import { lockScroll, unlockScroll } from '@/hooks/useLenis'
import type { Project } from '@/data/site'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

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

/**
 * The detail a card is too small to hold. The card carries what a reader scans
 * — the mark, the name, the one-line claim — and this carries the evidence.
 */
export function ProjectDialog({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const panel = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    lockScroll()
    window.addEventListener('keydown', onKeyDown)
    panel.current?.focus()

    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center sm:items-center">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-ground/80 backdrop-blur-sm"
      />

      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.28, ease: easeOutExpo }}
        className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-t-lg border border-rule bg-panel-2 p-6 shadow-elevate outline-none sm:rounded-lg sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid size-9 place-items-center rounded-sm border border-rule text-muted transition-colors hover:border-calm hover:bg-panel hover:text-ink sm:top-6 sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex items-center gap-4 pr-12">
          <ProjectMark project={project} size="lg" />
          <h3
            id="project-dialog-title"
            className="text-h3 leading-tight tracking-[-0.015em]"
          >
            {project.title}
          </h3>
        </div>

        <p className="mt-5 font-mono text-micro leading-relaxed text-pretty text-calm">
          {project.subtitle}
        </p>

        <div className="mt-4 space-y-3">
          {project.points.map((point) => (
            <p
              key={point}
              className="max-w-[70ch] text-small leading-relaxed text-pretty text-muted"
            >
              {point}
            </p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        {(project.href || project.repo) && (
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4">
            {project.href && <SourceLink href={project.href} label="Live site" />}
            {project.repo && <SourceLink href={project.repo} label="Source" />}
          </p>
        )}
      </motion.div>
    </div>
  )
}
