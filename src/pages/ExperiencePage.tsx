import { useParams, Link } from "react-router-dom"
import { experiences } from "../data/cms"

export function ExperiencePage() {
  const { slug } = useParams<{ slug: string }>()
  const exp = experiences.find((e) => e.slug === slug)

  if (!exp) {
    return (
      <div
        className="page section"
        style={{ paddingTop: 120, paddingBottom: 120, textAlign: "center" }}
      >
        <h1 className="text-h2">Experience not found</h1>
        <Link to="/" style={{ color: "var(--color-text-secondary)", marginTop: 24, display: "inline-block" }}>
          ← Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="section" style={{ padding: "80px 64px 40px" }}>
        {/* Back link */}
        <Link
          to="/"
          className="text-h3"
          style={{ color: "var(--color-text-secondary)", display: "inline-block", marginBottom: 48 }}
        >
          ← Back
        </Link>

        {/* Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 15,
            marginBottom: 60,
          }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <img
              src="/tychi-logo.png"
              alt={exp.company}
              style={{
                width: 72,
                height: 72,
                objectFit: "cover",
                borderRadius: 14,
                background: "#000",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "block",
                marginBottom: 28,
              }}
            />
            <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 12 }}>
              {exp.period}
            </p>
            <h1 className="text-h1">{exp.role}</h1>
            <p className="text-h3" style={{ marginTop: 12 }}>
              {exp.company}
              <span style={{ color: "var(--color-text-secondary)" }}> · {exp.location}</span>
            </p>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>
              Stack
            </p>
            <p className="text-body">{exp.stack}</p>
          </div>
        </div>

        {/* Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 15,
            padding: "60px 0",
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <p className="text-h3" style={{ color: "var(--color-text-secondary)", gridColumn: "span 2" }}>
            Overview
          </p>
          <p className="text-body" style={{ gridColumn: "span 4" }}>
            {exp.summary}
          </p>
        </div>

        {/* Highlights */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 15,
            padding: "20px 0 60px",
          }}
        >
          <p className="text-h3" style={{ color: "var(--color-text-secondary)", gridColumn: "span 2" }}>
            What I built
          </p>
          <ul
            className="text-body"
            style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 20, listStyle: "none", margin: 0, padding: 0 }}
          >
            {exp.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", gap: 14 }}>
                <span style={{ color: "var(--color-text-secondary)", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back to home */}
        <div style={{ padding: "80px 0 60px", borderTop: "1px solid var(--color-line)", marginTop: 40 }}>
          <Link to="/" className="text-h2">
            Back to home →
          </Link>
        </div>
      </div>
    </div>
  )
}
