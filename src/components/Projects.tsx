import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { projects, type Project } from '@/data/site'

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
    >
      {label}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <TiltCard
      as="article"
      tilt={featured ? 3 : 5}
      className="group/card flex h-full flex-col p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className={`font-medium transition-colors group-hover/card:text-accent ${
            featured ? 'text-lg sm:text-xl' : ''
          }`}
        >
          {project.title}
        </h3>
        <span
          aria-hidden="true"
          className="mt-1 text-ink-muted opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100 -translate-x-1"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      {project.org && (
        <p className="mt-2 inline-flex w-fit self-start items-center gap-1.5 rounded-md border border-line px-2 py-0.5 font-mono text-[0.7rem] tracking-wide text-ink-muted uppercase">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-3"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          </svg>
          {project.org}
        </p>
      )}

      <p className="mt-1 text-sm text-pretty text-accent">{project.subtitle}</p>

      <ul className="mt-3 max-w-xl space-y-2">
        {project.points.map((point) => (
          <li
            key={point}
            className="relative pl-4 text-sm leading-relaxed text-pretty text-ink-muted before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-line"
          >
            {point}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-ink-muted transition-colors group-hover/card:border-accent/30"
          >
            {tag}
          </li>
        ))}
      </ul>

      {(project.href || project.repo) && (
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 [margin-top:1rem]">
          {project.href && <ExternalLink href={project.href} label="Live site" />}
          {project.repo && <ExternalLink href={project.repo} label="Source" />}
        </div>
      )}
    </TiltCard>
  )
}

export function Projects() {
  return (
    <Section id="projects" index="03" title="Projects">
      <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
        {projects.map((project, index) => (
          <StaggerItem
            key={project.title}
            className={index === 0 ? 'sm:col-span-2' : undefined}
          >
            <ProjectCard project={project} featured={index === 0} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
