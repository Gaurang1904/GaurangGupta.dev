import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AuraChat } from "./AuraChat"

/*
  Aura launcher — a rotating particle sphere rendered on <canvas>. Points sit
  on a fibonacci sphere, spin around Y, and scatter outward on hover. Particle
  color inherits the text color so it flips with the theme. Idle float + greet
  bounce come from CSS on the wrapper spans.
  ponytail: vanilla 2D canvas, no three.js — 260 dots at 92px doesn't need a
  WebGL engine. Swap in a GLB only if the design ever demands real depth/lighting.
*/

const SIZE = 92
const N = 260 // particle count

export function AuraWidget() {
  const [open, setOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  /* particle sphere animation */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    ctx.scale(dpr, dpr)

    // fibonacci sphere — even point distribution on the surface
    const pts: { x: number; y: number; z: number }[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const t = golden * i
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r })
    }

    const cx = SIZE / 2
    const cy = SIZE / 2
    const R = SIZE * 0.32
    let angle = 0
    let scatter = 0 // eased hover amount 0..1
    let raf = 0

    const render = () => {
      angle += 0.006
      const target = Number(canvas.dataset.hover || 0)
      scatter += (target - scatter) * 0.12

      const col = getComputedStyle(canvas).color || "#111"
      const sin = Math.sin(angle)
      const cos = Math.cos(angle)

      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.fillStyle = col
      for (const p of pts) {
        // rotate around Y axis
        const x = p.x * cos - p.z * sin
        const z = p.x * sin + p.z * cos
        const spread = 1 + scatter * (0.35 + 0.4 * Math.sin(angle * 3 + p.y * 6))
        const px = cx + x * R * spread
        const py = cy + p.y * R * spread
        const depth = (z + 1) / 2 // 0 back .. 1 front
        ctx.globalAlpha = 0.2 + depth * 0.7
        ctx.beginPath()
        ctx.arc(px, py, 0.5 + depth * 1.3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(raf)
  }, [])

  const setHover = (v: number) => {
    if (canvasRef.current) canvasRef.current.dataset.hover = String(v)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="aura-panel"
            className="aura-panel"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aura-head">
              <span className="aura-title">Aura</span>
              <span className="aura-sub">ask about Gaurang</span>
              <button className="aura-close" aria-label="Close chat" onClick={() => setOpen(false)}>×</button>
            </div>
            <AuraChat />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="aura-fab"
        aria-label={open ? "Close assistant" : "Open assistant"}
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={() => setHover(1)}
        onPointerLeave={() => setHover(0)}
      >
        <span className="aura-bob">
          <canvas
            ref={canvasRef}
            className="aura-tilt"
            aria-hidden="true"
            style={{ width: SIZE, height: SIZE, display: "block" }}
          />
        </span>
      </button>
    </>
  )
}
