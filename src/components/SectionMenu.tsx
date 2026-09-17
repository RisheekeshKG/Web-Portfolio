import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { sections } from '@/data/site'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

/**
 * Every section, one click from the island. A panel hung under the button
 * rather than a sheet over the page: this is a list of nine links, and taking
 * the whole screen to show it costs the reader their place for no reason.
 */
export function SectionMenu({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return

    function close(restoreFocus: boolean) {
      setOpen(false)
      if (restoreFocus) trigger.current?.focus()
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') close(true)
    }

    // Anything outside the island's menu dismisses it, including a click on
    // the page behind — the panel is not modal and should not behave as if.
    function onPointerDown(event: PointerEvent) {
      if (!wrap.current?.contains(event.target as Node)) close(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="All sections"
        aria-expanded={open}
        aria-controls="section-menu"
        aria-haspopup="true"
        className={`grid size-9 place-items-center rounded-full transition-colors ${
          open ? 'bg-panel-2 text-ink' : 'text-muted hover:bg-panel-2 hover:text-ink'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="size-4"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="section-menu"
            aria-label="All sections"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: easeOutExpo }}
            style={{ transformOrigin: 'top right' }}
            className="absolute top-full right-0 z-50 mt-2 w-52 rounded-lg border border-rule bg-panel-2 p-1.5 shadow-elevate"
          >
            <ul>
              {sections.map((section) => {
                const isActive = active === section.id
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`block rounded-sm px-3 py-2 font-mono text-micro transition-colors ${
                        isActive
                          ? 'bg-panel text-calm'
                          : 'text-muted hover:bg-panel hover:text-ink'
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
