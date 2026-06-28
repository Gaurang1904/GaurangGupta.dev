import { ProjectCard } from "./ProjectCard"
import { selectedWorks } from "../data/cms"

export function SelectedWorks() {
  return (
    <section style={{ overflow: "clip" }}>
      {/* Header */}
      <div
        className="section"
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 15,
          flexWrap: "wrap",
          padding: "90px 64px 30px",
        }}
      >
        <h2 className="text-h2" style={{ userSelect: "none" }}>My Projects</h2>
        <span className="text-h3" style={{ color: "var(--color-text-secondary)" }}>
          2024 — 2026
        </span>
      </div>

      {/* 2×2 grid */}
      <div
        className="section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 32px",
          padding: "0 64px 64px",
        }}
      >
        {selectedWorks.map((work, i) => (
          <ProjectCard
            key={work.title}
            title={work.title}
            tags={work.tags}
            link={work.link}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}
