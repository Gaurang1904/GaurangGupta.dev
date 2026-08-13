import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AuraChat } from "./AuraChat"

/*
  Aura launcher — robot emoji given a 3D feel: idle float, greet bounce 5s
  after load, and a cursor-tracking perspective tilt on hover. Click toggles
  the chat panel.
  ponytail: emoji, not an image — no aura-bot.png asset exists. Swap the 🤖
  span for an <img>/GLB if real bot art ever turns up.
*/

const SIZE = 96
const TILT = 22 // max tilt in degrees

export function AuraWidget() {
  const [open, setOpen] = useState(false)
  const imgRef = useRef<HTMLSpanElement>(null)

  /* Close on Escape */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  /* cursor-tracking 3D tilt */
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const img = imgRef.current
    if (!img) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    img.style.transform = `rotateY(${(px * TILT).toFixed(1)}deg) rotateX(${(-py * TILT).toFixed(1)}deg) scale(1.07)`
  }
  const onLeave = () => {
    const img = imgRef.current
    if (img) img.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)"
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
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className="aura-bob">
          <span
            ref={imgRef}
            className="aura-tilt"
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: SIZE,
              height: SIZE,
              fontSize: SIZE * 0.6,
              lineHeight: 1,
            }}
          >
            🤖
          </span>
        </span>
      </button>
    </>
  )
}
