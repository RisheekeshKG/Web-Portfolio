import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

/**
 * Infinite horizontal scroller.
 *
 * The number of copies is measured rather than fixed: a fixed pair only fills
 * the screen when one copy is already wider than the viewport, which is false
 * for short lists on wide monitors and leaves a visible gap mid-loop. We
 * render enough copies to span the viewport plus one whole group, then shift
 * by exactly one group so the seam always lands on a repeat.
 *
 * Spacing is a right margin on each item (not a flex gap) so a group's width
 * includes its own trailing space — that keeps track width an exact multiple
 * of the group width, which is what makes the seam invisible.
 */
export function Marquee({
  items,
  reverse = false,
}: {
  items: ReactNode[]
  reverse?: boolean
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [copies, setCopies] = useState(2)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const group = groupRef.current
    if (!viewport || !group) return

    const measure = () => {
      const groupWidth = group.offsetWidth
      if (!groupWidth) return
      setCopies(Math.max(2, Math.ceil(viewport.offsetWidth / groupWidth) + 1))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(group)
    return () => observer.disconnect()
  }, [items])

  return (
    <div
      ref={viewportRef}
      className="group relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="marquee-track group-hover:[animation-play-state:paused]"
        style={
          {
            '--marquee-shift': `-${100 / copies}%`,
            ...(reverse ? { animationDirection: 'reverse' } : {}),
          } as CSSProperties
        }
      >
        {Array.from({ length: copies }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className="flex shrink-0"
            // Only the first group is real content; the rest are visual repeats.
            aria-hidden={copy > 0 ? true : undefined}
          >
            {items.map((item, index) => (
              <div key={index} className="mr-3 shrink-0">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
