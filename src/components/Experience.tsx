import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { Section } from '@/components/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { experience } from '@/data/site'

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  return (
    <Section id="experience" index="02" title="Experience">
      <div ref={containerRef} className="relative">
        {/* The timeline fills in as you scroll past it — 1:1 with scroll. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-px bg-line"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: scrollYProgress }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2"
        />

        <Stagger as="ol" className="space-y-10 pl-6 sm:pl-8" stagger={0.12}>
          {experience.map((role) => (
            <StaggerItem
              as="li"
              key={`${role.org}-${role.title}`}
              className="group relative"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 -left-6 size-2 rounded-full border-2 border-accent bg-canvas transition-transform duration-300 group-hover:scale-150 sm:-left-8"
              />
              <article className="transition-transform duration-300 group-hover:translate-x-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-medium transition-colors group-hover:text-accent">
                    {role.org}
                  </h3>
                  {role.period && (
                    <span className="font-mono text-xs text-ink-muted">
                      {role.period}
                    </span>
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
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
