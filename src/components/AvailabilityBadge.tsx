import { useEffect, useState } from "react"

/*
  Fixed "Available for Hire" badge pinned to the top-right corner. Hidden at
  the very top of the page (the hero already shows its own badge there), then
  smoothly fades/slides in once you scroll past the hero, and back out when you
  scroll above the threshold again.
*/

const THRESHOLD = 260   // px scrolled before the badge appears

export function AvailabilityBadge() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 24,
        zIndex: 200,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 4,
        background: "#1C1C1C",
        color: "#E3E3E1",
        fontFamily: "var(--font-inter)",
        fontSize: 13,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.28)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(-14px)",
        pointerEvents: shown ? "auto" : "none",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      Available for Hire
      <span
        className="status-dot"
        style={{ width: 8, height: 8, borderRadius: "50%", background: "#9EFF00", flexShrink: 0 }}
      />
    </div>
  )
}
