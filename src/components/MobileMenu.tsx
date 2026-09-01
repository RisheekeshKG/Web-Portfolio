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
          transition={{ duration: 0.55, ease: easeOutExpo }}
          className="fixed inset-0 z-50 flex flex-col bg-canvas lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-3.5">
            <span className="font-semibold tracking-tight">{site.name}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-1">
              {sections.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: reducedMotion ? 0 : 0.15 + index * 0.06,
                    ease: easeOutExpo,
                  }}
                >
                  <a
                    href={`#${section.id}`}
                    onClick={onClose}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={`flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium transition-colors ${
                      active === section.id
                        ? 'text-accent'
                        : 'text-ink hover:text-accent'
                    }`}
                  >
                    <span className="font-mono text-xs text-ink-muted tabular-nums">
                      0{index + 1}
                    </span>
                    {section.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href={`mailto:${site.email}`}
              onClick={onClose}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: reducedMotion ? 0 : 0.15 + sections.length * 0.06,
                ease: easeOutExpo,
              }}
              className="mt-10 block text-sm break-all text-ink-muted transition-colors hover:text-accent"
            >
              {site.email}
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
