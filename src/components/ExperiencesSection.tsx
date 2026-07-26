import { Link } from "react-router-dom"

export function ExperiencesSection() {
  return (
    <section
      className="section"
      style={{ padding: "64px 64px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 15,
        }}
      >
        {/* Heading */}
        <div style={{ gridColumn: "span 2" }}>
          <h2 className="text-h2" style={{ userSelect: "none" }}>Experience</h2>
        </div>

        {/* Single role — clickable through to the detail page */}
        <Link
          to="/experience/tychi-labs"
          style={{
            gridColumn: "span 4",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            paddingBottom: 20,
            color: "inherit",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          <img
            src="/tychi-logo.png"
            alt="Tychi Labs"
            style={{
              width: 44,
              height: 44,
              objectFit: "cover",
              borderRadius: 10,
              background: "#000",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "block",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="text-h3">AI/ML &amp; Blockchain Engineer ↗</span>
            <span className="text-body" style={{ color: "#999999" }}>Tychi Labs · Delhi, India</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
