import { useEffect } from 'react'
import Lenis from 'lenis'
import { frame, cancelFrame } from 'motion/react'

// Module-level handle so overlays (the mobile menu) can pause smooth scroll.
// Lenis drives scrolling itself, so `overflow: hidden` alone will not hold it.
let instance: Lenis | null = null

export function lockScroll() {
  instance?.stop()
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  instance?.start()
  document.body.style.overflow = ''
}

/**
 * Smooth scroll, driven by motion's frame loop so it stays in sync with the
 * parallax transforms elsewhere on the page. Skipped entirely under
 * prefers-reduced-motion — native scroll is the accessible default, and
 * lock/unlock still work through the body overflow fallback.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
    instance = lenis

    function onFrame(data: { timestamp: number }) {
      lenis.raf(data.timestamp)
    }

    frame.update(onFrame, true)
    return () => {
      cancelFrame(onFrame)
      lenis.destroy()
      instance = null
    }
  }, [])
}
