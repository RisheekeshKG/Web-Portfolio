import { Section } from '@/components/Section'
import { projects, type Project } from '@/data/site'

/**
 * The card's mark. A leading article is not what identifies a project, so
 * "The Atlas Protocol" is filed under A.
 */
function monogram(title: string) {
  return title.replace(/^(the|a|an)\s+/i, '').charAt(0).toUpperCase()
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
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-md border border-rule bg-panel font-mono text-small text-muted transition-colors group-hover:border-calm/35 group-hover:text-calm"
        >
          {monogram(project.title)}
        </span>

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
