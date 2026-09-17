import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SectionMenu } from '@/components/SectionMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useActiveSection } from '@/hooks/useActiveSection'
import { navSections, sectionIds, sections, site } from '@/data/site'

const easeOutExpo = [0.16, 1, 0.3, 1] as const

/**
 * A floating island rather than a bar across the top: it holds its own shape,
 * and once the page has moved it drops the name it no longer needs to state —
 * the pill closes the gap around it, so the chrome shrinks to what is still
 * doing work.
 */
export function Header() {
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // Past the fold of the hero, where the name is still on screen in display
    // size and the island repeating it adds nothing.
    function onScroll() {
      setScrolled(window.scrollY > 120)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const morph = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: easeOutExpo }

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-40 px-4 pt-3 sm:pt-4">
        <motion.div
          layout
          transition={morph}
          className="pointer-events-auto mx-auto flex w-fit max-w-full items-center gap-1.5 rounded-full border border-rule bg-panel/80 p-1.5 shadow-elevate backdrop-blur-md"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {!scrolled && (
              <motion.a
                key="brand"
                layout
                href="#top"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={morph}
                className="overflow-hidden rounded-full px-3 py-1 font-mono text-micro whitespace-nowrap transition-colors hover:text-calm"
              >
                {site.name}
              </motion.a>
            )}
          </AnimatePresence>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navSections.map((section) => {
                const isActive = active === section.id
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`block rounded-full px-3 py-1.5 font-mono text-micro whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-panel-2 text-calm'
                          : 'text-muted hover:bg-panel-2 hover:text-ink'
                      }`}
                    >
                      {section.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* On a phone the nav is behind the menu button, so the island says
              where you are instead — the one place that label is not already
              on screen. */}
          <AnimatePresence initial={false} mode="popLayout">
            {scrolled && active && (
              <motion.span
                key="here"
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={morph}
                className="overflow-hidden rounded-full px-3 py-1 font-mono text-micro whitespace-nowrap text-calm lg:hidden"
              >
                {sections.find((section) => section.id === active)?.label}
              </motion.span>
            )}
          </AnimatePresence>

          <motion.div layout transition={morph} className="flex items-center gap-1.5">
            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open all sections"
              aria-expanded={menuOpen}
              aria-controls="section-menu"
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-panel-2 hover:text-ink"
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
          </motion.div>
        </motion.div>
      </header>

      <SectionMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={active}
      />
    </>
  )
}
