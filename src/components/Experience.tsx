import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { experience, systemProjects, type Role } from '@/data/site'

function Entry({ role }: { role: Role }) {
  return (
    <StaggerItem as="li" className="group relative pl-6 sm:pl-8">
      <span
        aria-hidden="true"
        className="absolute top-2 left-0 size-2 -translate-x-1/2 rounded-full border-2 border-accent bg-canvas transition-transform duration-300 group-hover:scale-150"
      />
      <article className="transition-transform duration-300 group-hover:translate-x-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-medium transition-colors group-hover:text-accent">
            {role.org}
          </h3>
          {role.period && (
            <span className="font-mono text-xs text-ink-muted">{role.period}</span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-accent">{role.title}</p>
        <ul className="mt-3 max-w-xl space-y-2">
          {role.points.map((point) => (
            <li
              key={point}
              className="relative pl-4 text-sm leading-relaxed text-pretty text-ink-muted before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-line before:transition-colors group-hover:before:bg-accent"
            >
              {point}
            </li>
          ))}
        </ul>
      </article>
    </StaggerItem>
  )
}

function GroupLabel({ children, className = '' }: { children: string; className?: string }) {
  return (
    <Reveal>
      <h3
        className={`pl-6 font-mono text-xs tracking-wide text-ink-muted uppercase sm:pl-8 ${className}`}
      >
        {children}
      </h3>
    </Reveal>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <Section id="experience" index="02" title="Experience">
      <div ref={containerRef} className="relative">
        {/* One rule runs behind both groups and fills as you scroll past. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-px -translate-x-1/2 bg-line"
        />
        <motion.div
          aria-hidden="true"
          // x lives here, not in a class: Motion writes its own inline
          // transform for scaleY and would overwrite a Tailwind translate.
          style={{ scaleY: scrollYProgress, x: '-50%' }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2"
        />

        <GroupLabel>Internships</GroupLabel>
        <Stagger as="ol" className="mt-4 space-y-10" stagger={0.12}>
          {experience.map((role) => (
            <Entry key={`${role.org}-${role.title}`} role={role} />
          ))}
        </Stagger>

        <GroupLabel className="mt-12">System Project</GroupLabel>
        <Stagger as="ol" className="mt-4 space-y-10" stagger={0.12}>
          {systemProjects.map((role) => (
            <Entry key={`${role.org}-${role.title}`} role={role} />
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
