import { ForecastReadout } from '@/components/ForecastReadout'
import { site } from '@/data/site'
import { CONTAINER } from '@/lib/layout'

/**
 * The page's single orchestrated moment: the copy settles in on a short
 * stagger while the readout resolves out of noise. Nothing below the fold
 * animates on its own.
 */
export function Hero() {
  return (
    <section id="top" className="w-full">
      <div className={`${CONTAINER} py-12 sm:py-16 lg:py-20`}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p
              className="settle-in flex items-center gap-2.5 font-mono text-micro text-muted"
              style={{ animationDelay: '0ms' }}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-calm" />
              {site.availability}
            </p>

            <h1
              className="settle-in mt-6 text-display leading-[0.94] font-semibold tracking-[-0.025em]"
              style={{ animationDelay: '60ms' }}
            >
              {site.name}
            </h1>

            <p
              className="settle-in mt-5 flex flex-wrap gap-x-8 gap-y-1 font-mono text-micro text-muted"
              style={{ animationDelay: '120ms' }}
            >
              <span>{site.role}</span>
              <span>{site.location}</span>
            </p>

            <p
              className="settle-in mt-8 max-w-[54ch] text-lead leading-[1.55] text-pretty"
              style={{ animationDelay: '180ms' }}
            >
              {site.tagline}
            </p>

            <div
              className="settle-in mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href="#projects"
                className="rounded-sm bg-calm px-4 py-2 font-mono text-small font-medium text-ground transition-colors hover:bg-signal"
              >
                See the work
              </a>
              <a
                href={`mailto:${site.email}`}
                className="font-mono text-small text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-calm"
              >
                {site.email}
              </a>
            </div>
          </div>

          <div className="settle-in" style={{ animationDelay: '300ms' }}>
            <ForecastReadout />
            <p className="mt-3 max-w-[42ch] font-mono text-micro leading-relaxed text-muted">
              Forecast PM2.5 field from my ConvLSTM2D model, running out to its
              16-hour horizon.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
