import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * The hero's animated backdrop: soft blurred blobs that drift in place
 * (mesh-drift keyframes) and parallax upward at different rates as the page
 * scrolls, so the glow recedes behind the content rather than scrolling
 * with it 1:1. Blob sizes scale with the viewport so the glow keeps its
 * proportions from phones up to ultrawide displays.
 */
export function MeshGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const reducedMotion = useReducedMotion()
  const y1 = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -60])
  const y3 = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -90])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={{ y: y1 }}
        className="mesh-blob absolute -top-32 left-[6%] size-[22rem] rounded-full blur-[90px] sm:size-[30rem] lg:size-[38rem]"
      >
        <div className="size-full rounded-full" style={{ background: 'var(--glow-1)' }} />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="mesh-blob absolute top-4 right-[2%] size-[20rem] rounded-full blur-[100px] sm:size-[26rem] lg:size-[34rem]"
      >
        <div
          className="size-full rounded-full"
          style={{ background: 'var(--glow-2)', animationDelay: '-7s' }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="mesh-blob absolute top-[45%] left-[38%] size-[16rem] rounded-full blur-[110px] sm:size-[22rem] lg:size-[28rem]"
      >
        <div
          className="size-full rounded-full"
          style={{ background: 'var(--glow-1)', animationDelay: '-13s' }}
        />
      </motion.div>

      {/* Faint grid, fading toward the top so it doesn't compete with the headline. */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, transparent 95%)',
        }}
      />
    </div>
  )
}
