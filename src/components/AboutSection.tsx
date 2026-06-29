export function AboutSection() {
  return (
    <section
      className="section"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 15,
        padding: "120px 64px",
        alignItems: "stretch",
      }}
    >
      <div style={{ gridColumn: "span 3" }}>
        <h2 className="text-h2" style={{ maxWidth: 600, userSelect: "none" }}>
          Hi, I'm Gaurang, an AI/ML and blockchain engineer who loves building
          systems that ship
        </h2>
      </div>

      {/* Right column: body at top, Download CV pinned bottom-right */}
      <div
        style={{
          gridColumn: "span 3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        <p
          className="text-body"
          style={{ maxWidth: 400, color: "var(--color-text-primary)" }}
        >
          I build LLM infrastructure, RAG systems and EVM smart contracts — with
          hands-on work across time-series market prediction, retrieval and
          ranking, DeFi protocols, and multi-chain wallet architecture.
        </p>

        <a
          href="/cv.pdf"
          download
          className="text-body"
          style={{
            alignSelf: "flex-end",   /* ← which side: flex-start (left) | center | flex-end (right) */
            width: 260,
            display: "inline-flex",
            flexDirection: "row-reverse",  /* ← mirror: arrow moves to the other side */
            alignItems: "center",
            justifyContent: "flex-start",  /* ← content side on the line: flex-start = right, flex-end = left */
            gap: 10,
            paddingBottom: 10,
            borderBottom: "1px solid var(--color-text-secondary)",
            color: "var(--color-text-primary)",
            position: "relative",
            top: 130,            /* ← shift down/up (increase = lower) */
            left: -80,            /* ← shift left/right (negative = left, positive = right) */
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          <span style={{ fontSize: "1.1em", lineHeight: 1 }}>↓</span>
          Download CV
        </a>
      </div>
    </section>
  )
}
