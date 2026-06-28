import { motion } from "framer-motion"
import { Navigation } from "./Navigation"
import { PhysicsObjects } from "./PhysicsObjects"

interface HeroSectionProps {
  theme: "light" | "dark"
  onToggle: () => void
}

const NAV_HEIGHT = 50
/* Matches Framer BigObjectsDesktop height="390px" */
const PHYSICS_HEIGHT = 390
const HERO_ITEMS_HEIGHT = NAV_HEIGHT + PHYSICS_HEIGHT

export function HeroSection({ theme, onToggle }: HeroSectionProps) {
  return (
    <section className="section">
      {/* Nav + physics — fixed height block */}
      <div style={{ height: HERO_ITEMS_HEIGHT, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: NAV_HEIGHT, display: "flex", alignItems: "center" }}>
          <Navigation theme={theme} onToggle={onToggle} />
        </div>
        {/* Physics canvas with Appear entrance animation (Framer "Appear" effect) */}
        <motion.div
          style={{ height: PHYSICS_HEIGHT, position: "relative" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PhysicsObjects />
        </motion.div>
      </div>

      {/* Display name */}
      <div style={{ padding: "5px 0 30px", display: "flex", justifyContent: "center" }}>
        <h1 className="text-display" style={{ width: "100%" }}>
          GAURANG GUPTA
        </h1>
      </div>

      {/* Hero images */}
      <div style={{ display: "flex", gap: 15 }}>
        <div
          style={{
            flex: 1,
            aspectRatio: "4/3",
            background: "var(--color-text-secondary)",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            flex: 1,
            aspectRatio: "4/3",
            background: "var(--color-text-secondary)",
            opacity: 0.15,
            borderRadius: 5,
          }}
        />
      </div>
    </section>
  )
}
