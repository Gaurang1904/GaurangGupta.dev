export function AboutSection() {
  return (
    <section
      className="section"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 15,
        padding: "120px 64px",
        alignItems: "start",
      }}
    >
      <div style={{ gridColumn: "span 3" }}>
        <h2 className="text-h2" style={{ maxWidth: 600, userSelect: "none" }}>
          Hi, I'm Gaurang, an AI/ML and blockchain engineer who loves building
          systems that ship
        </h2>
      </div>
      <p
        className="text-body"
        style={{
          gridColumn: "span 2",
          maxWidth: 400,
          color: "var(--color-text-primary)",
        }}
      >
        I build LLM infrastructure, RAG systems and EVM smart contracts — with
        hands-on work across time-series market prediction, retrieval and
        ranking, DeFi protocols, and multi-chain wallet architecture.
      </p>
    </section>
  )
}
