import { Points, Section } from '@/components/Section'
import { projects, type Project } from '@/data/site'
import { GUTTER, SHEET } from '@/lib/layout'

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

function ProjectEntry({ project }: { project: Project }) {
  return (
    <li className={`${SHEET} border-t border-rule pt-7`}>
      <div>
        <h3 className="text-h3 leading-tight tracking-[-0.015em]">{project.title}</h3>
        <p className="mt-1 max-w-[60ch] font-mono text-small text-pretty text-calm">
          {project.subtitle}
        </p>
        <Points points={project.points} />

        {(project.href || project.repo) && (
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {project.href && <SourceLink href={project.href} label="Live site" />}
            {project.repo && <SourceLink href={project.repo} label="Source" />}
          </p>
        )}
      </div>

      {/* No invented metrics here — the gutter carries the stack instead,
          which is the honest fact these projects have. */}
      <ul className={`${GUTTER} flex-wrap gap-y-1 md:space-y-1`}>
        {project.tags.map((tag) => (
          <li key={tag} className="font-mono text-micro text-muted">
            {tag}
          </li>
        ))}
      </ul>
    </li>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      meta={`${projects.length} selected`}
    >
      <ol className="space-y-10">
        {projects.map((project) => (
          <ProjectEntry key={project.title} project={project} />
        ))}
      </ol>
    </Section>
  )
}
