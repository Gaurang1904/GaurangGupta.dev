import { useState, useEffect } from "react"

/*
  LightDarkSwitch — exact Framer MCP spec (nodeId: ewsxzjaUj):
    Variant1 (dark mode shown): 40×40px circle
      - border: 1px solid /Secondary Font Color
      - borderRadius: 100px
      - Child Frame: position=absolute, width=50%, height=100%, left=0
                     backgroundColor=/Primary Font Color
                     → left half filled, right half empty

    Variant2 (light mode): same but rotation=180deg → right half filled
*/

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("toggle-theme", theme)
  document.body.setAttribute("toggle-theme", theme)
  localStorage.setItem("theme", theme)
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
    return "dark"
  })

  useEffect(() => { applyTheme(theme) }, [theme])

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"))
  return { theme, toggle }
}

interface ThemeToggleProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  /*
    Variant1 = dark (left half filled) → no rotation
    Variant2 = light → rotation: 180deg (right half filled)
  */
  const rotate = theme === "light" ? "rotate(180deg)" : "none"

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light/dark"
      style={{
        /* 40×40px, border 1px solid /Secondary Font Color, radius 100px */
        width: 40,
        height: 40,
        borderRadius: 100,
        border: "1px solid var(--color-text-secondary)",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        transform: rotate,
        transition: "transform 0.3s ease",
        flexShrink: 0,
      }}
    >
      {/* Child Frame: width=50%, height=100%, left=0, bg=/Primary Font Color */}
      <div
        style={{
          position: "absolute",
          width: "50%",
          height: "100%",
          left: 0,
          top: 0,
          background: "var(--color-text-primary)",
          borderRadius: 0,
        }}
      />
    </button>
  )
}
