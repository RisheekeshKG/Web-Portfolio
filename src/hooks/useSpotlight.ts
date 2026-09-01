import { useRef } from 'react'

/**
 * Tracks pointer position within an element as percentages, written to CSS
 * custom properties `--x`/`--y` that the `spotlight` utility reads for a
 * radial-gradient glow. Pure CSS custom-property writes, no re-renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  function onPointerMove(event: React.PointerEvent<T>) {
    const el = ref.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  return { ref, onPointerMove }
}
