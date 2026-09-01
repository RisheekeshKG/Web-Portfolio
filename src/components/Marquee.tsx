import type { ReactNode } from 'react'

/**
 * Infinite horizontal scroller. Renders `items` twice back to back and
 * animates a translateX(-50%) loop, so the seam is invisible as long as both
 * copies are identical widths (they are, since they render the same items).
 */
export function Marquee({
  items,
  reverse = false,
}: {
  items: ReactNode[]
  reverse?: boolean
}) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="marquee-track gap-3 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {[...items, ...items].map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
