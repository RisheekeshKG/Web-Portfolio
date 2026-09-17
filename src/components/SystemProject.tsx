import { ProjectMark } from '@/components/ProjectMark'
import { Section } from '@/components/Section'
import { systemProjects, type Role } from '@/data/site'

/**
 * One entry, so it gets a panel rather than a row in a list of one. The
 * headline number sits in its own cell at the end, where a spec sheet puts
 * the figure that justifies the page.
 */
function SystemPanel({ role }: { role: Role }) {
  return (
    <article className="overflow-hidden rounded-lg border border-rule bg-panel-2 shadow-elevate">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-rule p-5 sm:p-6">
        <ProjectMark
          icon={role.icon}
          accent={role.accent}
          label={role.org}
          size="lg"
        />

        <div className="min-w-0">
          <h3 className="text-h3 leading-tight tracking-[-0.015em]">
            {role.org}
          </h3>
          <p className="mt-1 font-mono text-small text-calm">{role.title}</p>
        </div>

        {role.href && (
          <a
            href={role.href}
            target="_blank"
            rel="noreferrer"
            className="ml-auto shrink-0 rounded-sm border border-rule bg-panel px-3 py-2 font-mono text-micro text-muted transition-colors hover:border-calm hover:text-ink"
          >
            {new URL(role.href).hostname.replace(/^www\./, '')}{' '}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      <div className="grid gap-x-10 gap-y-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="space-y-3">
          {role.points.map((point) => (
            <p
              key={point}
              className="max-w-[68ch] text-small leading-relaxed text-pretty text-muted"
            >
              {point}
            </p>
          ))}
        </div>

        <div className="md:text-right">
          {role.result && (
            <p>
              <span className="measure block text-h2 leading-none">
                {role.result.value}
              </span>
              <span className="mt-2 block font-mono text-micro leading-snug text-muted">
                {role.result.label}
              </span>
            </p>
          )}

        </div>
      </div>

      {/* The stack gets the full width of the panel rather than the gutter the
          figure sits in: four chips in a 12rem column left the fourth stranded
          on a line of its own. */}
      {role.tags && (
        <footer className="border-t border-rule px-5 py-4 sm:px-6">
          <ul className="flex flex-wrap gap-1.5">
            {role.tags.map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}

export function SystemProject() {
  return (
    <Section id="system" title="System Project" meta="team competition work">
      <p className="max-w-[58ch] text-pretty text-muted">
        The perception stack for a competition Mars rover, built with the
        university team rather than alone.
      </p>

      <div className="mt-8 space-y-6">
        {systemProjects.map((role) => (
          <SystemPanel key={`${role.org}-${role.title}`} role={role} />
        ))}
      </div>
    </Section>
  )
}
