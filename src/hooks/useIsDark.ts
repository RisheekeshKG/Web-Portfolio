import { useEffect, useState } from 'react'

/**
 * Tracks the `dark` class on <html> rather than owning theme state, so
 * canvas-drawn work (which cannot use CSS variables) repaints whenever the
 * toggle flips — no matter which component owns the toggle.
 */
export function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() =>
      setIsDark(root.classList.contains('dark')),
    )
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}
