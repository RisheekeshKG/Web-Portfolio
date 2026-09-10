import { site } from '@/data/site'
import { CONTAINER } from '@/lib/layout'

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div
        className={`${CONTAINER} flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-8 font-mono text-micro text-muted`}
      >
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>

        <a
          href="#top"
          className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-calm"
        >
          Back to top
        </a>
      </div>
    </footer>
  )
}
