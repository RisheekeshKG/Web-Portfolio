import { useState } from 'react'
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
      <header className="sticky top-0 z-40 border-b border-rule bg-panel/85 backdrop-blur-md">
        <div
          className={`${CONTAINER} flex items-center justify-between gap-6 py-3`}
        >
          <a
            href="#top"
            className="shrink-0 font-mono text-small tracking-tight transition-colors hover:text-calm"
          >
            {site.name}
          </a>

          {/* Wider than the nav's own 24px item rhythm from `lg` up, so the
              toggle reads as its own group rather than a final nav item. Stays
              tight below that, where it pairs with the menu button. */}
          <div className="flex items-center gap-2 lg:gap-8">
            <nav aria-label="Sections" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {sections.map((section) => {
                  const isActive = active === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block rounded-sm px-2 py-1 font-mono text-micro transition-colors ${
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

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-9 place-items-center rounded-sm border border-rule text-muted transition-colors hover:border-calm hover:bg-panel-2 hover:text-ink lg:hidden"
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
