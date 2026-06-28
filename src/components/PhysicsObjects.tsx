import { useEffect, useRef } from "react"
import React from "react"
import Matter from "matter-js"

/* ─── makeWalls (matches Framer MakeWalls CDN module behaviour) ─── */
function makeWalls(
  b: DOMRect,
  world: Matter.World,
  opts: { top: boolean; bottom: boolean; left: boolean; right: boolean }
) {
  const t = 60
  const add = (body: Matter.Body) => Matter.Composite.add(world, body)
  if (opts.top)    add(Matter.Bodies.rectangle(b.width / 2, -t / 2,         b.width + t * 2, t, { isStatic: true }))
  if (opts.bottom) add(Matter.Bodies.rectangle(b.width / 2, b.height + t/2, b.width + t * 2, t, { isStatic: true }))
  if (opts.left)   add(Matter.Bodies.rectangle(-t / 2,      b.height / 2,   t, b.height + t * 2, { isStatic: true }))
  if (opts.right)  add(Matter.Bodies.rectangle(b.width + t/2, b.height / 2, t, b.height + t * 2, { isStatic: true }))
}

/* ─── makeBodies (matches Framer MakeBodies CDN module behaviour) ─── */
function makeBodies(
  container: HTMLElement,
  world: Matter.World,
  children: HTMLCollection,
  fric: { friction: number; frictionAir: number },
  dens: { enable: boolean; density: number }
) {
  const cRect = container.getBoundingClientRect()
  const bodies: Matter.Body[] = []

  Array.from(children).forEach((child) => {
    const el = child as HTMLElement
    const r = el.getBoundingClientRect()
    const cx = r.left - cRect.left + r.width  / 2
    const cy = r.top  - cRect.top  + r.height / 2
    const body = Matter.Bodies.rectangle(cx, cy, r.width, r.height, {
      friction:    fric.friction,
      frictionAir: fric.frictionAir,
      density:     dens.enable ? dens.density : 0.001,
      restitution: 0.1,
      /* chamfer rounds the physics shape to match visual pill rounding */
      chamfer: { radius: Math.min(r.width, r.height) * 0.42 },
    })
    bodies.push(body)
    Matter.Composite.add(world, body)
  })

  return { bodies }
}

/* ─────────────────────────────────────────────────────────────────
   EXACT STYLES from Framer MCP getNodeXml
   ─ text pills:   backgroundColor="/Background Color"  + border "/Secondary Font Color"
   ─ icon circles: backgroundColor="/Primary Font Color" (no border)
   ───────────────────────────────────────────────────────────────── */

/** Pill whose bg matches the page (only border makes it visible) */
const pill = (extra: React.CSSProperties): React.CSSProperties => ({
  background:  "var(--color-bg)",
  color:       "var(--color-text-primary)",
  border:      "1px solid var(--color-text-secondary)",
  fontFamily:  "'Space Mono', monospace",
  fontSize:    31,            /* exact: KIX/AKI0 = 31px (wide pills override to 32) */
  lineHeight:  1.2,
  letterSpacing: "0em",
  whiteSpace:  "nowrap",
  userSelect:  "none",
  cursor:      "grab",
  display:     "inline-flex",
  alignItems:  "center",
  overflow:    "hidden",
  ...extra,
})

/** Circle whose bg contrasts against the page */
const circle = (extra: React.CSSProperties): React.CSSProperties => ({
  background:  "var(--color-text-primary)",
  color:       "var(--color-bg)",
  fontFamily:  "'Space Mono', monospace",
  userSelect:  "none",
  cursor:      "grab",
  display:     "inline-flex",
  alignItems:  "center",
  justifyContent: "center",
  flexShrink:  0,
  ...extra,
})

/*
  Items — exact MCP values:
  ┌─────────────────────────┬──────────┬────────────┬────────────────┐
  │ Label                   │ bg       │ radius     │ padding        │
  ├─────────────────────────┼──────────┼────────────┼────────────────┤
  │ BRAND DESIGNER          │ /BG      │ 100px      │ 20px 40px      │
  │ CREATIVE DIRECT0R       │ /BG      │ 100px      │ 20px 40px      │
  │ KIX + dot               │ /BG      │ 16px       │ 20px 30px      │
  │ AKI0                    │ /BG      │ 19px       │ 20px 30px      │
  │ Asterisk circle         │ /Primary │ 85px       │ 25px           │
  │ Arrow circle            │ /Primary │ 51px       │ 20px 28px      │
  └─────────────────────────┴──────────┴────────────┴────────────────┘
*/
const ITEMS: React.ReactNode[] = [
  /* 1 — AI/ML ENGINEER: borderRadius=100px, padding=20px 40px, 32px */
  <div style={pill({ padding: "20px 40px", borderRadius: 100, fontSize: 32 })}>
    AI/ML ENGINEER
  </div>,

  /* 2 — BLOCKCHAIN ENGINEER: borderRadius=100px, padding=20px 40px, 32px */
  <div style={pill({ padding: "20px 40px", borderRadius: 100, fontSize: 32 })}>
    BLOCKCHAIN ENGINEER
  </div>,

  /* 3 — RAG + 22×22 dot: borderRadius=16px, padding=20px 30px, gap=15px */
  <div style={pill({ padding: "20px 30px", borderRadius: 16, gap: 15 })}>
    RAG
    <div style={{
      width: 22, height: 22, borderRadius: 19,
      background: "var(--color-text-primary)", flexShrink: 0,
    }} />
  </div>,

  /* 4 — EVM: borderRadius=19px, padding=20px 30px, horizontal */
  <div style={pill({ padding: "20px 30px", borderRadius: 19 })}>
    EVM
  </div>,

  /* 5 — Round icon: /Primary surface, /Background inner, radius=85px, padding=25px, ~96×94 */
  <div style={circle({ borderRadius: 85, padding: 25, fontSize: 46, lineHeight: 1 })}>
    ✳
  </div>,

  /* 6 — ArrowDown: /Primary surface, /Background inner, radius=51px, padding=20px 28px, ~93×89 */
  <div style={circle({ borderRadius: 51, padding: "20px 28px", fontSize: 48, lineHeight: 1 })}>
    ↓
  </div>,
]

/*
  Initial X positions spread items evenly across the container width.
  Starting Y near the top (not random %) so items fall straight down
  with minimal rotation — matching Framer's settled appearance.
*/
const INITIAL_X_PCT = [4, 18, 36, 56, 71, 84]

export function PhysicsObjects() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const engine = Matter.Engine.create({
      enableSleeping: true,
      gravity: { x: 0, y: 0.3 },   /* exact Framer value: gravY=0.3 */
    })

    const bounds = container.getBoundingClientRect()
    /* Lift the floor so settled objects rest with clearance above the name
       instead of flush against the overflow-hidden clip edge (matches Framer). */
    const FLOOR_INSET = 50
    const wallBounds = { width: bounds.width, height: bounds.height - FLOOR_INSET } as DOMRect
    makeWalls(wallBounds, engine.world, { top: true, bottom: true, left: true, right: true })

    /* Mouse drag */
    const mouse = Matter.Mouse.create(container)
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      /* angularStiffness is a valid runtime option but missing from Matter's types */
      constraint: { stiffness: 1, angularStiffness: 0, render: { visible: false } } as Matter.IConstraintDefinition,
    })
    Matter.Composite.add(engine.world, mc)

    /* Strip scroll-blocking listeners the mouse module adds */
    const mRaw = mc.mouse as unknown as Record<string, EventListener>
    ;["mousewheel", "DOMMouseScroll", "touchstart", "touchmove", "touchend"]
      .forEach((ev) => mc.mouse.element.removeEventListener(ev, mRaw[ev]))
    container.addEventListener("touchstart", mRaw.mousedown, { passive: true })

    /* Bodies */
    const { bodies } = makeBodies(
      container, engine.world, container.children,
      { friction: 0.05, frictionAir: 0.01 },
      { enable: true, density: 0.001 },
    )

    /* Animation loop — same update formula as Framer Physics.tsx */
    let frameId: number
    let active = true

    const tick = () => {
      if (!active) return
      frameId = requestAnimationFrame(tick)

      bodies.forEach((body, i) => {
        const el = container.children[i] as HTMLElement | undefined
        if (!el) return
        const { x, y } = body.vertices[0]
        el.style.visibility = "visible"
        el.style.top       = `${y}px`
        el.style.left      = `${x}px`
        /* exact transform from Framer Physics.tsx source */
        el.style.transform = `translate(-50%,-50%) rotate(${body.angle}rad) translate(50%,50%)`
      })

      Matter.Engine.update(engine, 1000 / 60)
    }
    tick()

    return () => {
      active = false
      cancelAnimationFrame(frameId)
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
      Array.from(container.children).forEach((el) => {
        ;(el as HTMLElement).style.visibility = "hidden"
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      {ITEMS.map((item, i) => (
        <div
          key={i}
          style={{
            position:   "absolute",
            visibility: "hidden",
              top:  "5%",
            left: `${INITIAL_X_PCT[i]}%`,
          }}
          draggable={false}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
