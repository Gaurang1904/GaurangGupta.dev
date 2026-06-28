import { ThemeToggle } from "./ThemeToggle"

/*
  Exact Framer MCP spec — NavigationMenu:
    - 6-col grid, gap=15px, no padding
    - NavItemEmail:       gridColumnSpan=2, text style="/Heading 3" (Inter Tight 20px)
    - NavItemDescription: gridColumnSpan=2, horizontal stack gap=20px,
                          Icon (arrow) + H3 text (Inter Tight 20px)
    - NavItemButton:      gridColumnSpan=2, LightDarkSwitch 30×30 right-aligned
*/

interface NavigationProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export function Navigation({ theme, onToggle }: NavigationProps) {
  return (
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 15,
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* Col 1–2: Email — /Heading 3 = Inter Tight, 20px */}
      <a
        href="mailto:gauranggupta192004@gmail.com"
        target="_blank"
        rel="noreferrer"
        style={{
          gridColumn: "span 2",
          fontFamily: "var(--font-inter)",
          fontSize: 20,
          lineHeight: "1.2em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: "#999999",
        }}
      >
        GAURANGGUPTA192004@GMAIL.COM
      </a>

      {/* Col 3–4: Arrow icon + description text */}
      <div
        style={{
          gridColumn: "span 2",
          display: "flex",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        {/* Arrow icon — ↳ corner arrow, grey, aligned to first text line */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 20,
            lineHeight: "1.2em",
            flexShrink: 0,
            color: "var(--color-icon)",
            userSelect: "none",
          }}
        >
          ↳
        </span>
        {/* Text — single string per MCP: "AI/ML & BLOCKCHAIN ENGINEER OPEN TO REMOTE / RELOCATE"
            We break it visually at the natural mid-point */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 20,
            lineHeight: "1.2em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
          }}
        >
          AI/ML &amp; BLOCKCHAIN ENGINEER
          <br />
          OPEN TO REMOTE / RELOCATE
        </span>
      </div>

      {/* Col 5–6: LightDarkSwitch — 30×30 right-aligned
          (component is 40×40 with top:6px offset, but rendered slot is 30×30) */}
      <div
        style={{
          gridColumn: "span 2",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </nav>
  )
}
