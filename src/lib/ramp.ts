/**
 * The site's one concentration scale, shared by every figure so a warm cell
 * means the same thing wherever it appears: the workspace's own surface tiers
 * at the low end, warming through terracotta into amber at the top.
 */

export type Stop = [number, [number, number, number]]

export const RAMP_DARK: Stop[] = [
  [0.0, [20, 21, 23]],
  [0.2, [43, 44, 49]],
  [0.4, [90, 70, 64]],
  [0.6, [176, 110, 85]],
  [0.75, [224, 122, 95]],
  [0.9, [226, 135, 67]],
  [1.0, [240, 184, 117]],
]

export const RAMP_LIGHT: Stop[] = [
  [0.0, [236, 230, 220]],
  [0.2, [224, 205, 186]],
  [0.4, [214, 180, 158]],
  [0.6, [198, 133, 102]],
  [0.75, [180, 81, 47]],
  [0.9, [154, 90, 24]],
  [1.0, [122, 45, 28]],
]

export function ramp(isDark: boolean) {
  return isDark ? RAMP_DARK : RAMP_LIGHT
}

/** Colour at position `v` (0..1) on the given scale. */
export function sample(stops: Stop[], v: number) {
  const t = Math.min(1, Math.max(0, v))
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const [p0, c0] = stops[i - 1]
      const [p1, c1] = stops[i]
      const k = (t - p0) / (p1 - p0)
      return `rgb(${Math.round(c0[0] + (c1[0] - c0[0]) * k)} ${Math.round(
        c0[1] + (c1[1] - c0[1]) * k,
      )} ${Math.round(c0[2] + (c1[2] - c0[2]) * k)})`
    }
  }
  const last = stops[stops.length - 1][1]
  return `rgb(${last[0]} ${last[1]} ${last[2]})`
}

/** CSS gradient across the whole scale, for colour-bar legends. */
export function rampGradient(stops: Stop[]) {
  return `linear-gradient(to right, ${stops
    .map(([p, c]) => `rgb(${c[0]} ${c[1]} ${c[2]}) ${p * 100}%`)
    .join(', ')})`
}
