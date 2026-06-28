const experiences = [
  { year: "2022", role: "B.Tech CSE (AI & ML)", org: "Bennett University" },
  { year: "2024", role: "Token2049 Singapore", org: "Tychi Labs" },
  { year: "2025", role: "AI/ML & Blockchain Engineer", org: "Tychi Labs" },
  { year: "2026", role: "B.Tech Graduation", org: "Bennett University" },
]

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
          <h2 className="text-h2" style={{ userSelect: "none" }}>Experiences</h2>
        </div>

        {/* Items */}
        <div
          style={{
            gridColumn: "span 4",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 15,
          }}
        >
          {experiences.map(({ year, role, org }) => (
            <div
              key={year}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 30,
                paddingBottom: 50,
              }}
            >
              <span className="text-h3" style={{ color: "#999999" }}>{year}</span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span className="text-body">{role}</span>
                <span className="text-body" style={{ color: "#999999" }}>{org}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
