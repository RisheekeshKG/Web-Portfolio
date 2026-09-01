import { useEffect, useRef } from 'react'

/**
 * Adds `is-visible` the first time the element scrolls into view. The `reveal`
 * utility is a no-op under prefers-reduced-motion, so content is never hidden
 * behind this.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
