import { useEffect, useRef } from 'react'
import { useIsDark } from '@/hooks/useIsDark'
import { ramp, rampGradient, sample } from '@/lib/ramp'
import { research } from '@/data/site'

/**
 * The hero instrument: a coarse PM2.5 concentration field advancing across the
 * 16-hour horizon of the ConvLSTM2D forecaster described in the Research
 * section. The grid is deliberately blocky because the real model output is —
 * WRF-Chem fields are a coarse lattice, not a smooth gradient.
 *
 * The field here is generated, not model output; it reproduces the behaviour
 * (drifting plumes over a regional background) at the resolution and on the
 * colour scale the real maps use, so the hero shows the shape of the work
 * rather than a decorative graphic.
 */

const COLS = 34
const ROWS = 22
/** Seconds of wall clock per forecast hour. */
const SECONDS_PER_HOUR = 0.9
const HORIZON = 16

/** A drifting Gaussian plume, the dominant structure in a real PM2.5 field. */
function plume(
  x: number,
  y: number,
  cx: number,
  cy: number,
  spread: number,
  strength: number,
) {
  const dx = x - cx
  const dy = y - cy
  return strength * Math.exp(-(dx * dx + dy * dy) / (2 * spread * spread))
}

/** Concentration at grid position (x, y) in 0..1, `hour` hours into the run. */
function concentration(x: number, y: number, hour: number) {
  const t = hour / HORIZON

  // Sources drift downwind and disperse as the horizon extends, which is why
  // later hours read as broader and softer than hour zero. Strengths stay low
  // enough that the top of the colour scale is reached rarely — a map that is
  // mostly red carries no information.
  const spread = 0.13 + t * 0.08
  let v = 0
  v += plume(x, y, 0.22 + t * 0.34, 0.3 + Math.sin(t * 3.1) * 0.1, spread, 0.8)
  v += plume(x, y, 0.72 - t * 0.16, 0.68 + Math.cos(t * 2.4) * 0.08, spread * 1.2, 0.64)
  v += plume(x, y, 0.52 + Math.sin(t * 4.2) * 0.26, 0.16 + t * 0.34, spread * 0.75, 0.5)

  // Regional background: higher toward the basin floor at the bottom edge.
  v += 0.09 + y * 0.13

  // Terrain-scale variation so the lattice reads as a field rather than a
  // smooth gradient. Low frequency — per-cell speckle would read as noise.
  v += Math.sin(x * 9.1 + hour * 0.4) * Math.cos(y * 7.3 - hour * 0.3) * 0.05

  return Math.min(1, Math.max(0, v))
}

export function ForecastReadout() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hourRef = useRef<HTMLSpanElement>(null)
  const isDark = useIsDark()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const scale = ramp(isDark)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Noise seeded once so the resolve is stable across repaints rather than
    // re-scrambling on every frame.
    const noise = Array.from({ length: COLS * ROWS }, () => Math.random())

    let width = 0
    let height = 0

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const rect = canvas!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(hour: number, resolve: number) {
      if (!width || !height) return
      const cw = width / COLS
      const ch = height / ROWS

      context!.clearRect(0, 0, width, height)
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = (col + 0.5) / COLS
          const y = (row + 0.5) / ROWS
          const target = concentration(x, y, hour)
          // The instrument comes up out of noise and locks onto the field.
          const v = noise[row * COLS + col] * (1 - resolve) + target * resolve
          // Both edges are rounded from the exact fractional position, so the
          // 1px lattice gap stays uniform. Flooring the origin and ceiling the
          // size instead lets the error accumulate into heavier rules every
          // few cells.
          const x0 = Math.round(col * cw)
          const y0 = Math.round(row * ch)
          context!.fillStyle = sample(scale, v)
          context!.fillRect(
            x0,
            y0,
            Math.max(1, Math.round((col + 1) * cw) - x0 - 1),
            Math.max(1, Math.round((row + 1) * ch) - y0 - 1),
          )
        }
      }
    }

    resize()

    if (reduced) {
      draw(HORIZON / 2, 1)
      if (hourRef.current) hourRef.current.textContent = '08'
      const observer = new ResizeObserver(() => {
        resize()
        draw(HORIZON / 2, 1)
      })
      observer.observe(canvas)
      return () => observer.disconnect()
    }

    let frame = 0
    let start = 0
    let visible = true
    let shownHour = -1

    function tick(now: number) {
      if (!start) start = now
      const elapsed = (now - start) / 1000
      const resolve = Math.min(1, elapsed / 0.9)
      const hour = ((elapsed / SECONDS_PER_HOUR) % HORIZON) * Math.min(1, resolve * 1.4)

      draw(hour, resolve)

      const label = String(Math.floor(hour)).padStart(2, '0')
      if (hourRef.current && label !== String(shownHour).padStart(2, '0')) {
        shownHour = Math.floor(hour)
        hourRef.current.textContent = label
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    // Stop the loop whenever the instrument is off-screen or the tab is in the
    // background — an animation nobody is looking at is just battery.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return
      visible = entry.isIntersecting
      if (visible) {
        frame = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(frame)
      }
    })
    io.observe(canvas)

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame)
      } else if (visible) {
        frame = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [isDark])

  const correlation = research.metrics.find((m) => m.label === 'Pearson r')?.value

  return (
    <figure className="settle-in m-0 overflow-hidden rounded-md border border-rule bg-panel-2 shadow-elevate">
      <figcaption className="flex items-baseline justify-between gap-3 border-b border-rule px-4 py-2.5">
        <span className="font-mono text-micro text-muted">PM2.5 forecast</span>
        <span className="font-mono text-micro text-muted">
          hour <span ref={hourRef} className="measure">00</span> of {HORIZON}
        </span>
      </figcaption>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Animated map of forecast PM2.5 concentration advancing across a ${HORIZON}-hour horizon, on a low-to-high concentration scale.`}
        className="block aspect-[17/11] w-full"
      />

      <div className="flex items-center gap-3 border-t border-rule px-4 py-2.5">
        <span className="font-mono text-micro text-muted">low</span>
        <span
          aria-hidden="true"
          className="h-1.5 flex-1"
          style={{
            backgroundImage: rampGradient(ramp(isDark)),
          }}
        />
        <span className="font-mono text-micro text-muted">high</span>
        {correlation && (
          <span className="font-mono text-micro text-muted">
            r <span className="measure">{correlation}</span>
          </span>
        )}
      </div>
    </figure>
  )
}
