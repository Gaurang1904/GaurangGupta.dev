import { useParams, Link } from "react-router-dom"
import { worksItems } from "../data/cms"

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = worksItems.find((w) => w.slug === slug)

  if (!project) {
    return (
      <div
        className="page section"
        style={{ paddingTop: 120, paddingBottom: 120, textAlign: "center" }}
      >
        <h1 className="text-h2">Project not found</h1>
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
            <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 12 }}>
              {project.category} — {project.date}
            </p>
            <h1 className="text-h1">{project.title}</h1>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ marginBottom: 24 }}>
              <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>
                Services
              </p>
              <div
                className="text-body"
                dangerouslySetInnerHTML={{ __html: project.services }}
              />
            </div>
            <div>
              <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>
                Role
              </p>
              <div
                className="text-body"
                dangerouslySetInnerHTML={{ __html: project.role }}
              />
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              marginBottom: 15,
            }}
          />
        )}

        {/* Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 15,
            padding: "60px 0",
          }}
        >
          <p className="text-h3" style={{ color: "var(--color-text-secondary)", gridColumn: "span 2" }}>
            Overview
          </p>
          <div
            className="text-body"
            style={{ gridColumn: "span 4" }}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>

        {/* Image gallery */}
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {[project.image02, project.image03].filter(Boolean).map((img, i) => (
            <img
              key={i}
              src={img!}
              alt=""
              style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover" }}
            />
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
            {[project.image04, project.image05, project.image06].filter(Boolean).map((img, i) => (
              <img
                key={i}
                src={img!}
                alt=""
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>

        {/* Next project */}
        <div style={{ padding: "80px 0 60px", borderTop: "1px solid var(--color-line)", marginTop: 80 }}>
          <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 12 }}>
            Next Project
          </p>
          <Link to={project.nextProject} className="text-h2">
            {worksItems.find((w) => `/${w.slug}` === project.nextProject)?.title ?? "Next"}
            {" →"}
          </Link>
        </div>
      </div>
    </div>
  )
}
