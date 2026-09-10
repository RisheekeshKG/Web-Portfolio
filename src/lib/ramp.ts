/**
 * The site's one concentration scale, shared by every figure so a warm cell
 * means the same thing wherever it appears: cool at the low end, through the
 * palette's teal, into amber and ember at the top.
 */

export type Stop = [number, [number, number, number]]

export const RAMP_DARK: Stop[] = [
  [0.0, [11, 26, 29]],
  [0.2, [18, 67, 63]],
  [0.4, [31, 122, 110]],
  [0.6, [95, 176, 164]],
  [0.75, [224, 162, 74]],
  [0.9, [209, 102, 47]],
  [1.0, [163, 52, 31]],
]

export const RAMP_LIGHT: Stop[] = [
  [0.0, [238, 242, 239]],
  [0.2, [188, 214, 207]],
  [0.4, [106, 167, 154]],
  [0.6, [47, 130, 114]],
  [0.75, [201, 138, 42]],
  [0.9, [180, 85, 31]],
  [1.0, [143, 47, 24]],
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
