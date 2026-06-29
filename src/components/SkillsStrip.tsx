import { useEffect, useRef } from "react"

/*
  Skills carousel — art-directed oval drum with a VISIBLE back arc.
  One progress value drives every badge each frame:

    angle  = offset − progress
    x = sign(s)·|s|^0.85 · RX        → horizontal travel (opened edges)
    y = −cos(angle) · RY             → front arc rides high, back arc low
    depth = (cos+1)/2  (0 back, 1 front)
    sc  = lerp(0.55, 1, eased)        → faked scale, back smaller
    rot = sign(s)·|s|^1.2 · MAX_ROT   → gentle turn, front-facing longer
    op  = lerp(0.22, 1, eased)        → back arc dim but VISIBLE (not culled)
    br/sat = depth falloff            → back recedes
    zIndex = depth                    → front arc paints over the back arc

  Constant angular speed, delta-time, seamless loop, progress wrapped to [0,1).
  Responsive RX via ResizeObserver.

  Marks are ORIGINAL abstract placeholders — drop your real logo files into
  public/skills/ and swap the <svg> for an <img>.
*/

/* Skill logos — files live in public/skills/<name>.svg. Order = position
   around the drum; mixed so categories don't cluster. */
const SKILLS = [
  "python", "solidity", "react", "pytorch", "postgresql", "ethereum", "fastapi",
  "docker", "langchain", "redis", "typescript", "chainlink", "numpy", "nodejs",
  "tensorflow", "go", "pandas", "uniswap", "aws",
]

const COUNT = SKILLS.length
const BADGE = 56
const LOGO_BASE = 50        // default logo size
const LOGO_SIZE: Record<string, number> = { pandas: 60 }  // per-logo overrides (some SVGs have built-in padding)
const SPEED = 0.028         // revolutions per second
const SPREAD = 0.40         // RX as a fraction of band width
const RX_MIN = 160
const RX_MAX = 440
const RY = 45               // vertical radius → gap between front & back arcs
const MAX_ROT = 30          // degrees
const SCALE_MIN = 0.55      // back-arc scale
const OP_MIN = 0.22         // back-arc opacity (visible, not culled)
const BRIGHT_MIN = 0.82
const SAT_MIN = 0.70
const DRAG_SENS = 0.0007     // revolutions per pixel dragged
const RETURN_RATE = 2.5      // how fast momentum eases back to baseline speed
const MAX_VEL = 3            // clamp fling velocity (rev/s)
const TAU = Math.PI * 2

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const smoothstep = (x: number) => { const t = clamp(x, 0, 1); return t * t * (3 - 2 * t) }

export function SkillsStrip() {
  const stageRef = useRef<HTMLDivElement>(null)
  const els = useRef<(HTMLDivElement | null)[]>([])
  const RX = useRef(360)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const measure = () => { RX.current = clamp(stage.clientWidth * SPREAD, RX_MIN, RX_MAX) }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)

    const layout = (progress: number) => {
      const rx = RX.current
      for (let i = 0; i < COUNT; i++) {
        const el = els.current[i]
        if (!el) continue
        const angle = (i / COUNT + progress) * TAU
        const s = Math.sin(angle)
        const c = Math.cos(angle)
        const depth = (c + 1) / 2            // 0 back … 1 front
        const e = smoothstep(depth)

        const x = Math.sign(s) * Math.pow(Math.abs(s), 0.85) * rx
        const y = -c * RY                    // front arc high, back arc low
        const rot = Math.sign(s) * Math.pow(Math.abs(s), 1.2) * MAX_ROT
        const sc = lerp(SCALE_MIN, 1, e)

        el.style.setProperty("--x", `${x.toFixed(1)}px`)
        el.style.setProperty("--y", `${y.toFixed(1)}px`)
        el.style.setProperty("--rot", `${rot.toFixed(1)}deg`)
        el.style.setProperty("--sc", sc.toFixed(3))
        el.style.setProperty("--op", lerp(OP_MIN, 1, e).toFixed(3))
        el.style.setProperty("--br", lerp(BRIGHT_MIN, 1, depth).toFixed(3))
        el.style.setProperty("--sat", lerp(SAT_MIN, 1, depth).toFixed(3))
        el.style.setProperty("--sy", `${lerp(2, 10, e).toFixed(1)}px`)
        el.style.setProperty("--sb", `${lerp(8, 28, e).toFixed(1)}px`)
        el.style.setProperty("--sa", lerp(0.10, 0.22, e).toFixed(3))
        el.style.zIndex = String(Math.round(depth * 100))
      }
    }

    let raf = 0
    let progress = 0
    let last = performance.now()
    let dragging = false
    let lastX = 0
    let lastMoveT = 0
    let vel = SPEED        // current angular velocity (rev/s)
    let dragVel = 0        // smoothed velocity while dragging (the fling)

    const onDown = (e: PointerEvent) => {
      dragging = true
      lastX = e.clientX
      lastMoveT = performance.now()
      dragVel = 0
      try { stage.setPointerCapture(e.pointerId) } catch {}
      stage.style.cursor = "grabbing"
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      const now = performance.now()
      const dt = Math.max(0.001, (now - lastMoveT) / 1000)
      const dProg = (e.clientX - lastX) * DRAG_SENS   // follow the finger
      lastX = e.clientX
      lastMoveT = now
      progress += dProg
      progress -= Math.floor(progress)                // keep in [0, 1)
      dragVel = dragVel * 0.5 + (dProg / dt) * 0.5     // track fling velocity (smoothed)
      layout(progress)
    }
    const onUp = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      vel = clamp(dragVel, -MAX_VEL, MAX_VEL)          // carry the fling, then ease back
      try { stage.releasePointerCapture(e.pointerId) } catch {}
      stage.style.cursor = "grab"
    }
    stage.addEventListener("pointerdown", onDown)
    stage.addEventListener("pointermove", onMove)
    stage.addEventListener("pointerup", onUp)
    stage.addEventListener("pointercancel", onUp)

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (dragging) {
        if (now - lastMoveT > 60) dragVel = 0          // held still → no fling on release
      } else {
        vel += (SPEED - vel) * (1 - Math.exp(-RETURN_RATE * dt))  // ease velocity back to baseline
        progress += vel * dt
        progress -= Math.floor(progress)
      }
      layout(progress)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      stage.removeEventListener("pointerdown", onDown)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerup", onUp)
      stage.removeEventListener("pointercancel", onUp)
    }
  }, [])

  return (
    <section style={{ padding: "90px 64px", overflow: "hidden" }}>
      <h2 className="text-h2" style={{ userSelect: "none", marginBottom: 36 }}>
        <span style={{ fontSize: "0.4em", verticalAlign: "super", marginRight: 8, color: "var(--color-text-secondary)" }}>20+</span>
        Skills
      </h2>

      <div style={{ position: "relative" }}>
        {/* From Data ———  (left flank) */}
        <div style={{ position: "absolute", top: "50%", left: 0, width: "20%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 14, pointerEvents: "none" }}>
          <span className="text-geist" style={{ fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>From Data</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-text-secondary)", opacity: 0.7 }} />
        </div>
        {/* ——— To DeFi  (right flank) */}
        <div style={{ position: "absolute", top: "50%", right: 0, width: "20%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 14, pointerEvents: "none" }}>
          <div style={{ flex: 1, height: 1, background: "var(--color-text-secondary)", opacity: 0.7 }} />
          <span className="text-geist" style={{ fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-primary)", whiteSpace: "nowrap" }}>To DeFi</span>
        </div>

        <div
          ref={stageRef}
          style={{
            position: "relative",
            height: 230,
            cursor: "grab",
            touchAction: "pan-y",   /* let the page scroll vertically; we handle horizontal drag */
            userSelect: "none",
          }}
        >
        {Array.from({ length: COUNT }).map((_, i) => {
          const name = SKILLS[i]
          const size = LOGO_SIZE[name] ?? LOGO_BASE
          return (
            <div
              key={i}
              ref={(el) => { els.current[i] = el }}
              className="skill-badge"
              style={{ width: BADGE, height: BADGE }}
            >
              <img
                src={`/skills/${name}.svg`}
                alt={name}
                draggable={false}
                style={{ width: size, height: size, objectFit: "contain", pointerEvents: "none" }}
              />
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
