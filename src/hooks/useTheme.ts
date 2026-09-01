import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * Light/dark toggle backed by localStorage. Dark is the brand default (set
 * pre-paint by the inline script in index.html); light is only reached by an
 * explicit visitor choice, so this never follows the OS.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage unavailable; the choice just will not survive a reload.
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
