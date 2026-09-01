import { motion, useReducedMotion } from 'motion/react'

const LAYERS = [4, 5, 3]
const W = 340
const H = 230
const PAD = 24

const layerX = (i: number) => PAD + (i * (W - PAD * 2)) / (LAYERS.length - 1)
const nodeY = (index: number, count: number) =>
  count === 1 ? H / 2 : PAD + (index * (H - PAD * 2)) / (count - 1)

const nodes = LAYERS.flatMap((count, layer) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${layer}-${i}`,
    x: layerX(layer),
    y: nodeY(i, count),
    layer,
  })),
)

const edges = LAYERS.slice(0, -1).flatMap((count, layer) =>
  Array.from({ length: count }).flatMap((_, from) =>
    Array.from({ length: LAYERS[layer + 1] }, (_, to) => ({
      id: `${layer}-${from}-${to}`,
      x1: layerX(layer),
      y1: nodeY(from, count),
      x2: layerX(layer + 1),
      y2: nodeY(to, LAYERS[layer + 1]),
    })),
  ),
)

// A handful of edges carry a travelling pulse, so the graph reads as active
// without animating all 35 of them.
const LIVE = new Set(['0-1-2', '0-3-0', '1-2-1', '1-4-2', '0-0-3'])

/**
 * Decorative feed-forward network. Edges draw in on mount, nodes settle, and
 * a few connections carry a repeating pulse. Purely presentational, so it is
 * hidden from assistive tech; under reduced motion it renders as a still
 * diagram with no draw-in and no pulses.
 */
export function NeuralNet() {
  const reducedMotion = useReducedMotion()

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="nn-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="nn-node">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </radialGradient>
      </defs>

      {edges.map((edge, i) => (
        <motion.line
          key={edge.id}
          x1={edge.x1}
          y1={edge.y1}
          x2={edge.x2}
          y2={edge.y2}
          stroke="url(#nn-edge)"
          strokeWidth={LIVE.has(edge.id) ? 1.4 : 0.8}
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: reducedMotion ? 0 : 0.3 + i * 0.012,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {!reducedMotion &&
        edges
          .filter((edge) => LIVE.has(edge.id))
          .map((edge, i) => (
            <motion.circle
              key={`pulse-${edge.id}`}
              // cx/cy need real starting attributes: animating them alone
              // leaves the first render undefined and SVG rejects it.
              cx={edge.x1}
              cy={edge.y1}
              r="2.6"
              fill="var(--accent)"
              initial={{ cx: edge.x1, cy: edge.y1, opacity: 0 }}
              animate={{
                cx: [edge.x1, edge.x2],
                cy: [edge.y1, edge.y2],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.2,
                delay: 1.2 + i * 0.55,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: 'easeInOut',
              }}
            />
          ))}

      {nodes.map((node, i) => (
        <motion.g
          key={node.id}
          initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: reducedMotion ? 0 : node.layer * 0.12 + i * 0.02,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <circle cx={node.x} cy={node.y} r="9" fill="var(--canvas)" />
          <circle
            cx={node.x}
            cy={node.y}
            r="6.5"
            fill="url(#nn-node)"
            fillOpacity="0.18"
            stroke="var(--accent)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          {!reducedMotion && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="2.2"
              fill="var(--accent)"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{
                duration: 2.6,
                delay: i * 0.16,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.g>
      ))}
    </svg>
  )
}
