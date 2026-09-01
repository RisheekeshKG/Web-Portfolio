import { MagneticButton } from '@/components/MagneticButton'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { site } from '@/data/site'

const elsewhere = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'LeetCode', href: site.links.leetcode },
]

export function Contact() {
  return (
    <Section id="contact" index="06" title="Get in touch">
      <TiltCard tilt={2} className="p-6 sm:p-8">
        <Stagger className="space-y-6" stagger={0.09}>
          <StaggerItem>
            <p className="max-w-xl leading-relaxed text-pretty text-ink-muted">
              I am always happy to talk about AI systems, computer vision, or
              interesting engineering problems. Email is the fastest way to
              reach me.
            </p>
          </StaggerItem>

          <StaggerItem>
            <MagneticButton
              as="a"
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 text-xl font-medium break-all transition-colors hover:text-accent sm:text-3xl"
            >
              {site.email}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
          </StaggerItem>

          <StaggerItem>
            <p className="text-sm text-ink-muted">
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
              <span aria-hidden="true"> · </span>
              {site.location}
            </p>
          </StaggerItem>

          <StaggerItem>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
              {elsewhere.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-block py-1 text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </TiltCard>
    </Section>
  )
}
