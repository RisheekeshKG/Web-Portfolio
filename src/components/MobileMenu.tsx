import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { lockScroll, unlockScroll } from '@/hooks/useLenis'
import { sections, site } from '@/data/site'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean
  onClose: () => void
  active: string | null
}) {
  const reducedMotion = useReducedMotion()

  // Close on Escape, and hold the page still while the sheet is open.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    lockScroll()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={reducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
          className="fixed inset-0 z-50 flex flex-col bg-ground lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-rule px-6 py-3">
            <span className="font-mono text-small">{site.name}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center border border-rule text-muted transition-colors hover:border-calm hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-6 py-6">
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={onClose}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={`block border-b border-rule py-4 text-h3 tracking-[-0.015em] transition-colors ${
                      active === section.id ? 'text-calm' : 'hover:text-calm'
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${site.email}`}
              onClick={onClose}
              className="mt-8 block font-mono text-small break-all text-muted transition-colors hover:text-calm"
            >
              {site.email}
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
