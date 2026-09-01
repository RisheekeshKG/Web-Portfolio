import { useEffect, useRef, useState } from 'react'
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three'
import { NeuralNet } from '@/components/NeuralNet'

const LAYERS = [4, 6, 6, 3]
const SPAN = 4.4
const TAU = Math.PI * 2

type Node = { x: number; y: number; z: number; layer: number }

function buildNodes(): Node[] {
  return LAYERS.flatMap((count, layer) => {
    const x = -SPAN / 2 + (layer * SPAN) / (LAYERS.length - 1)
    const radius = 0.5 + count * 0.13
    // Offset each layer's ring so the lines never stack into a flat sheet.
    const offset = layer * 0.55
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * TAU + offset
      return { x, y: Math.cos(angle) * radius, z: Math.sin(angle) * radius, layer }
    })
  })
}

/** Soft radial dot, so nodes read as glows rather than hard squares. */
function glowTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new CanvasTexture(canvas)
}

/**
 * Resolves any CSS colour the browser understands (the palette is oklch) into
 * something THREE.Color accepts, by letting canvas normalise it to hex.
 */
function cssColor(variable: string, fallback: string) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  if (!raw) return fallback
  try {
    const ctx = document.createElement('canvas').getContext('2d')!
    ctx.fillStyle = raw
    return ctx.fillStyle as string
  } catch {
    return fallback
  }
}

export function ThreeNeuralNet() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      setFailed(true)
      return
    }
    if (!renderer.getContext()) {
      setFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight, false)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 5.1)

    const group = new Group()
    scene.add(group)

    const nodes = buildNodes()
    const texture = glowTexture()

    // Nodes
    const nodeGeometry = new BufferGeometry()
    nodeGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(nodes.flatMap((n) => [n.x, n.y, n.z]), 3),
    )
    const nodeMaterial = new PointsMaterial({
      size: 0.34,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    })
    const nodePoints = new Points(nodeGeometry, nodeMaterial)
    group.add(nodePoints)

    // Edges between adjacent layers
    const edges: { a: Node; b: Node }[] = []
    for (let layer = 0; layer < LAYERS.length - 1; layer++) {
      const from = nodes.filter((n) => n.layer === layer)
      const to = nodes.filter((n) => n.layer === layer + 1)
      for (const a of from) for (const b of to) edges.push({ a, b })
    }

    const edgeGeometry = new BufferGeometry()
    edgeGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(
        edges.flatMap(({ a, b }) => [a.x, a.y, a.z, b.x, b.y, b.z]),
        3,
      ),
    )
    const edgeMaterial = new LineBasicMaterial({
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: AdditiveBlending,
    })
    const lines = new LineSegments(edgeGeometry, edgeMaterial)
    group.add(lines)

    // Signals travelling along a subset of edges
    const PULSES = 14
    const pulseEdges = Array.from(
      { length: PULSES },
      (_, i) => edges[Math.floor((i / PULSES) * edges.length)],
    )
    const pulseOffsets = pulseEdges.map((_, i) => i / PULSES)
    const pulseGeometry = new BufferGeometry()
    pulseGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(new Float32Array(PULSES * 3), 3),
    )
    const pulseMaterial = new PointsMaterial({
      size: 0.17,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    })
    const pulsePoints = new Points(pulseGeometry, pulseMaterial)
    group.add(pulsePoints)

    function applyTheme() {
      const accent = new Color(cssColor('--accent', '#8aa0f8'))
      const accent2 = new Color(cssColor('--accent-2', '#e08ae8'))
      const dark = document.documentElement.classList.contains('dark')
      nodeMaterial.color = accent
      pulseMaterial.color = accent2
      edgeMaterial.color = accent
      // Additive glow blows out on a light ground, so ease it back there.
      edgeMaterial.opacity = dark ? 0.2 : 0.34
      nodeMaterial.opacity = dark ? 1 : 0.85
    }
    applyTheme()

    const themeObserver = new MutationObserver(applyTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Pointer parallax, eased toward the target each frame.
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    function onPointerMove(event: PointerEvent) {
      const rect = mount!.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    }
    function onPointerLeave() {
      target.x = 0
      target.y = 0
    }
    if (!reduced) {
      mount.addEventListener('pointermove', onPointerMove)
      mount.addEventListener('pointerleave', onPointerLeave)
    }

    const pulsePositions = pulseGeometry.getAttribute('position') as Float32BufferAttribute

    function frame(elapsed: number) {
      pointer.x += (target.x - pointer.x) * 0.05
      pointer.y += (target.y - pointer.y) * 0.05

      group.rotation.y = Math.sin(elapsed * 0.28) * 0.62 + pointer.x * 0.45
      group.rotation.x = pointer.y * -0.3 + Math.sin(elapsed * 0.35) * 0.06

      for (let i = 0; i < PULSES; i++) {
        const edge = pulseEdges[i]
        const t = (elapsed * 0.32 + pulseOffsets[i]) % 1
        pulsePositions.setXYZ(
          i,
          edge.a.x + (edge.b.x - edge.a.x) * t,
          edge.a.y + (edge.b.y - edge.a.y) * t,
          edge.a.z + (edge.b.z - edge.a.z) * t,
        )
      }
      pulsePositions.needsUpdate = true

      nodeMaterial.size = 0.34 + Math.sin(elapsed * 1.1) * 0.03
      renderer.render(scene, camera)
    }

    // Static single frame when motion is reduced.
    if (reduced) {
      group.rotation.y = 0.6
      group.rotation.x = -0.15
      renderer.render(scene, camera)
    }

    let raf = 0
    let running = false
    let start = 0
    function loop(now: number) {
      if (!start) start = now
      frame((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    function play() {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    function pause() {
      running = false
      cancelAnimationFrame(raf)
    }

    // Only burn frames while the panel is actually on screen and the tab is visible.
    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()),
      { threshold: 0.05 },
    )
    visibility.observe(mount)

    function onVisibilityChange() {
      if (document.hidden) pause()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const resize = new ResizeObserver(() => {
      const { clientWidth: w, clientHeight: h } = mount!
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (reduced) renderer.render(scene, camera)
    })
    resize.observe(mount)

    return () => {
      pause()
      visibility.disconnect()
      resize.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      nodeGeometry.dispose()
      edgeGeometry.dispose()
      pulseGeometry.dispose()
      nodeMaterial.dispose()
      edgeMaterial.dispose()
      pulseMaterial.dispose()
      texture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  // No WebGL (old browser, blocked, or software rendering off) — the SVG
  // version carries the same idea without a canvas.
  if (failed) return <NeuralNet />

  return <div ref={mountRef} className="size-full" />
}
