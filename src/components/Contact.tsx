import { Section } from '@/components/Section'
import { site } from '@/data/site'

const elsewhere = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'LeetCode', href: site.links.leetcode },
]

export function Contact() {
  return (
    <Section id="contact" title="Get in touch" meta={site.availability}>
      <p className="max-w-[62ch] text-lead leading-[1.6] text-pretty">
        I am always happy to talk about AI systems, computer vision, or
        interesting engineering problems. Email is the fastest way to reach me.
      </p>

      {/* Sized to fit a 390px viewport without hyphenating the address. */}
      <a
        href={`mailto:${site.email}`}
        className="mt-10 inline-block text-h3 underline decoration-rule underline-offset-[0.4em] transition-colors hover:text-calm hover:decoration-calm sm:text-h2"
      >
        {site.email}
      </a>

      <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-rule pt-7 sm:grid-cols-3">
        <div>
          <dt className="font-mono text-micro text-muted">Phone</dt>
          <dd className="mt-1.5">
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="font-mono text-small transition-colors hover:text-calm"
            >
              {site.phone}
            </a>
          </dd>
        </div>

        <div>
          <dt className="font-mono text-micro text-muted">Based in</dt>
          <dd className="mt-1.5 font-mono text-small">{site.location}</dd>
        </div>

        <div>
          <dt className="font-mono text-micro text-muted">Elsewhere</dt>
          <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
            {elsewhere.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-small underline decoration-rule underline-offset-4 transition-colors hover:text-calm hover:decoration-calm"
              >
                {link.label}
              </a>
            ))}
          </dd>
        </div>
      </dl>
    </Section>
  )
}
