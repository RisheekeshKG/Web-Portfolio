import { useEffect, useRef, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav can mark it active.
 * The top margin offsets the sticky header; the bottom one keeps a section
 * from staying active once it has scrolled well past.
 *
 * Visibility is kept in a map rather than read from each callback batch,
 * because the observer only reports sections that *changed* state. When
 * nothing is in view the highlight clears only if we are genuinely above
 * the first section — scrolling back to the hero should un-highlight the
 * nav, but a momentary gap between two sections should not flicker it off.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const visibility = useRef(new Map<string, boolean>())

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const seen = visibility.current

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          seen.set(entry.target.id, entry.isIntersecting)
        }

        const visible = elements
          .filter((el) => seen.get(el.id))
          .sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          )

        if (visible.length > 0) {
          setActive(visible[0].id)
          return
        }

        const firstTop = elements[0].getBoundingClientRect().top
        if (firstTop > 0) setActive(null)
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      seen.clear()
    }
  }, [ids])

  return active
}
