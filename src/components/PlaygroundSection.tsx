import { Link } from "react-router-dom"

export function PlaygroundSection() {
  return (
    <section
      className="section"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 15,
        padding: "64px",
        alignItems: "center",
      }}
    >
      <div style={{ gridColumn: "span 2" }}>
        <Link to="/Playground" style={{ display: "inline-block" }}>
          <h2
            className="text-h2"
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: 4,
              whiteSpace: "nowrap",
              transition: "opacity 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <span style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
              See playground
            </span>
            <svg
              width="0.7em"
              height="0.7em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-icon)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </h2>
        </Link>
      </div>

      {/* spacer column */}
      <div style={{ gridColumn: "span 1" }} />

      <p
        className="text-body"
        style={{ gridColumn: "span 2", color: "var(--color-text-primary)" }}
      >
        A space for experiments — smart contract prototypes, model demos, and
        weekend builds that don't fit anywhere else.
      </p>
    </section>
  )
}
