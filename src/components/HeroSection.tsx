import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Navigation } from "./Navigation"
import { PhysicsObjects } from "./PhysicsObjects"

interface HeroSectionProps {
  theme: "light" | "dark"
  onToggle: () => void
}

const NAV_HEIGHT = 50
/* Matches Framer BigObjectsDesktop height="390px" */
const PHYSICS_HEIGHT = 390

export function HeroSection({ theme, onToggle }: HeroSectionProps) {
  const stageRef = useRef<HTMLDivElement>(null)

  /* Parallax — track scroll while the stage passes through the viewport */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  })
  /* Photo drifts down slightly as you scroll past it */
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"])
  /* Name lifts up a touch for depth */
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])

  return (
    <section className="section">
      {/* Nav — top bar */}
      <div style={{ height: NAV_HEIGHT, display: "flex", alignItems: "center" }}>
        <Navigation theme={theme} onToggle={onToggle} />
      </div>

      {/* Full-bleed photo stage with name overlaid + scroll parallax */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          /* break out of the section's side padding → true edge-to-edge */
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          height: "min(86vh, 820px)",
          marginTop: 20,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Parallax background photo (taller than the stage so it has room to move) */}
        <motion.img
          src="/profile.png"
          alt="Gaurang Gupta"
          style={{
            position: "absolute",
            top: "-8%",
            left: "60%",
            width: "85%",            /* ← zoom: lower % = more zoomed out (dark sides blend into page) */
            height: "170%",
            objectFit: "cover",
            objectPosition: "center 28%",
            x: "-50%",
            y: imgY,
            zIndex: 0,
          }}
        />

        {/* Tint — keeps the name readable and blends the photo into the page */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.05) 32%, rgba(15,15,15,0.10) 55%, rgba(15,15,15,0.92) 100%)",
            zIndex: 1,
          }}
        />

        {/* Availability badge — top-right corner */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 64,
            zIndex: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 4,
            /* elevated black so it stands out from the near-black page (#0F0F0F) */
            background: "#1C1C1C",
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            letterSpacing: "0.01em",
            color: "#E3E3E1",
            whiteSpace: "nowrap",
          }}
        >
          Available for Hire
          <span
            className="status-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#9EFF00",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Name overlay — lower-left */}
        <motion.h1
          className="text-display"
          style={{
            position: "relative",
            zIndex: 2,
            margin: 0,
            padding: "0 64px 5vh",
            textAlign: "left",
            fontSize: "clamp(64px, 11vw, 180px)",
            lineHeight: 0.88,
            y: nameY,
          }}
        >
          GAURANG<br />GUPTA
        </motion.h1>
      </div>

      {/* Big objects (physics pills) — below the name/photo */}
      <motion.div
        style={{ height: PHYSICS_HEIGHT, position: "relative", overflow: "hidden", marginTop: 20 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <PhysicsObjects />
      </motion.div>
    </section>
  )
}
