import { MagneticButton } from '@/components/MagneticButton'
import { site } from '@/data/site'
import { CONTAINER } from '@/lib/layout'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-ink-muted`}
      >
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>

        <div className="flex items-center gap-5">
          <p className="hidden font-mono text-xs sm:block">
            Built with React, Motion &amp; Tailwind
          </p>
          <MagneticButton
            as="a"
            href="#top"
            className="group inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-xs transition-colors hover:border-accent hover:text-ink"
          >
            Back to top
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </footer>
  )
}
