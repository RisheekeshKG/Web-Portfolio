import { useState } from 'react'
import { motion } from 'motion/react'
import { MobileMenu } from '@/components/MobileMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useActiveSection } from '@/hooks/useActiveSection'
import { sectionIds, sections, site } from '@/data/site'
import { CONTAINER } from '@/lib/layout'

export function Header() {
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="glass sticky top-0 z-40 border-b border-line">
        <div className={`${CONTAINER} flex items-center justify-between gap-4 py-3.5`}>
          <a
            href="#top"
            className="shrink-0 font-semibold tracking-tight transition-colors hover:text-accent"
          >
            {site.name}
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav aria-label="Sections" className="hidden md:block">
              <ul className="flex items-center gap-1">
                {sections.map((section) => {
                  const isActive = active === section.id
                  return (
                    <li key={section.id} className="relative">
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                          isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        {section.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-2.5 -bottom-0.5 h-px bg-accent"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-md border border-line text-ink-muted transition-colors hover:border-accent hover:text-ink sm:size-9 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={active}
      />
    </>
  )
}
