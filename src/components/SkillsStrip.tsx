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

const stroke = { fill: "none", stroke: "#111", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

const MARKS: React.ReactNode[] = [
  <><path d="M16 7a5 5 0 1 0 1.5 6" {...stroke} /><circle cx="12" cy="12" r="2.4" fill="#111" /></>,
  <><path d="M4 12a8 8 0 0 1 8-8" {...stroke} /><path d="M20 12a8 8 0 0 1-8 8" {...stroke} /><circle cx="12" cy="12" r="2" fill="#111" /></>,
  <path d="M6 19V5l12 14V5" {...stroke} strokeWidth={2.4} />,
  <g {...stroke} strokeWidth={2}><line x1="12" y1="4" x2="12" y2="20" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="6.3" y1="6.3" x2="17.7" y2="17.7" /><line x1="17.7" y1="6.3" x2="6.3" y2="17.7" /></g>,
  <path d="M12 3c2.6 1.8 3.8 5.2 3.8 8.4L12 15l-3.8-3.6C8.2 8.2 9.4 4.8 12 3z M8.2 14l-2 4 3.4-1.2 M15.8 14l2 4-3.4-1.2" {...stroke} />,
  <path d="M7 4v16 M7 12l8-8 M9 12l8 8" {...stroke} strokeWidth={2.2} />,
  <path d="M6 5l13 7-13 7z" fill="#111" />,
  <path d="M12 3l8 4.6v8.8L12 21l-8-4.6V7.6z" {...stroke} strokeWidth={2} />,
  <><circle cx="9" cy="12" r="4.4" {...stroke} /><circle cx="15" cy="12" r="4.4" {...stroke} /></>,
  <g {...stroke} strokeWidth={2}><path d="M12 4v16" /><path d="M5 8l7 4 7-4" /><path d="M5 16l7-4 7 4" /></g>,
]

const COUNT = 18
const BADGE = 56
const SPEED = 0.028         // revolutions per second
const SPREAD = 0.40         // RX as a fraction of band width
const RX_MIN = 160
const RX_MAX = 440
const RY = 80               // vertical radius → gap between front & back arcs
const MAX_ROT = 30          // degrees
const SCALE_MIN = 0.55      // back-arc scale
const OP_MIN = 0.22         // back-arc opacity (visible, not culled)
const BRIGHT_MIN = 0.82
const SAT_MIN = 0.70
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
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      progress = (progress + SPEED * dt) % 1
      layout(progress)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <section style={{ position: "relative", padding: "70px 64px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: 0, width: 70, height: 1, background: "var(--color-text-secondary)", opacity: 0.5 }} />
      <div style={{ position: "absolute", top: "50%", right: 0, width: 70, height: 1, background: "var(--color-text-secondary)", opacity: 0.5 }} />

      <div ref={stageRef} style={{ position: "relative", height: 230 }}>
        {Array.from({ length: COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { els.current[i] = el }}
            className="skill-badge"
            style={{ width: BADGE, height: BADGE }}
          >
            {/* Placeholder mark — replace with your logo:
                <img src={`/skills/skill-${i}.svg`} alt="" style={{ width: 32, height: 32 }} /> */}
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">{MARKS[i % MARKS.length]}</svg>
          </div>
        ))}
      </div>
    </section>
  )
}
