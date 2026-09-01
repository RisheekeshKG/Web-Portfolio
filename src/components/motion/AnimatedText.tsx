import { motion, useReducedMotion, type Variants } from 'motion/react'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
}

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

type AnimatedTextProps = {
  text: string
  className?: string
  /** Animate on mount instead of when scrolled into view (for above-the-fold). */
  onMount?: boolean
  as?: 'span' | 'h1' | 'h2'
}

/**
 * Word-by-word mask reveal: each word sits in an overflow-hidden sleeve and
 * slides up on a stagger. The full string stays in the accessibility tree via
 * aria-label while the animated pieces are hidden from it, so screen readers
 * read one clean sentence rather than fragments.
 */
export function AnimatedText({
  text,
  className,
  onMount = false,
  as = 'span',
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as]

  if (reducedMotion) {
    const Plain = as
    return <Plain className={className}>{text}</Plain>
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      variants={container}
      initial="hidden"
      {...(onMount
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: true, margin: '-12% 0px' } })}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
