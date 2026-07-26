import { useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { worksItems } from "../data/cms"
import { StackGrid } from "../components/StackGrid"

const EASE = [0.22, 1, 0.36, 1] as const

/* Per-step composition — varied media widths + staggered vertical offsets so
   the walkthrough doesn't read as a uniform list. */
const STEP_LAYOUT = [
  { mediaFlex: "1 1 56%", offsetY: 0 },
  { mediaFlex: "1 1 44%", offsetY: 48 },
  { mediaFlex: "1 1 58%", offsetY: 0 },
  { mediaFlex: "1 1 50%", offsetY: 36 },
]

/* One walkthrough block — reveals on scroll; the browser-framed screenshot
   gets a subtle parallax as it passes through the viewport. */
function WalkStep({
  step,
  index,
  reverse,
}: {
  step: { image: string; title: string; caption: string }
  index: number
  reverse: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const layout = STEP_LAYOUT[index % STEP_LAYOUT.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{
        display: "flex",
        gap: 56,
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      {/* Text */}
      <div style={{ flex: "1 1 30%", minWidth: 250 }}>
        <span className="feature-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="text-h2" style={{ fontSize: 30, marginBottom: 14 }}>{step.title}</h3>
        <p className="text-body" style={{ color: "var(--color-text-secondary)", maxWidth: 380 }}>{step.caption}</p>
      </div>

      {/* Framed screenshot */}
      <div style={{ flex: layout.mediaFlex, minWidth: 280, maxWidth: 560, marginTop: layout.offsetY }}>
        <motion.div className="browser-frame" style={{ y: imgY }}>
          <div className="browser-bar">
            <span className="browser-dot" title="Close">
              <svg viewBox="0 0 10 10" width="7" height="7"><path d="M2.5 2.5 L7.5 7.5 M7.5 2.5 L2.5 7.5" /></svg>
            </span>
            <span className="browser-dot" title="Minimize">
              <svg viewBox="0 0 10 10" width="7" height="7"><path d="M2 5 L8 5" /></svg>
            </span>
            <span className="browser-dot" title="Maximize">
              <svg viewBox="0 0 10 10" width="7" height="7"><path d="M5 2 L5 8 M2 5 L8 5" /></svg>
            </span>
          </div>
          <img src={step.image} alt={step.title} style={{ width: "100%", display: "block" }} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 90])
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

  const hero = project.heroImage || project.thumbnail

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
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
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-h3"
              style={{ color: "var(--color-text-secondary)", display: "inline-block", marginTop: 16, transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              View on GitHub ↗
            </a>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <p className="text-h3" style={{ color: "var(--color-text-secondary)", marginBottom: 8 }}>
              Role
            </p>
            <div
              className="text-body"
              dangerouslySetInnerHTML={{ __html: project.role }}
            />
          </div>
        </motion.div>

        {/* Hero image — fade-in + scroll parallax */}
        {hero && (
          <div
            style={{
              overflow: "hidden",
              borderRadius: 14,
              maxWidth: 920,
              margin: "0 auto 15px",
              boxShadow: "0 50px 100px -50px rgba(0, 0, 0, 0.6)",
            }}
          >
            <motion.img
              src={hero}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ width: "100%", display: "block", y: heroY }}
            />
          </div>
        )}

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
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
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 15,
            padding: "20px 0 60px",
          }}
        >
          <p className="text-h3" style={{ color: "var(--color-text-secondary)", gridColumn: "span 2" }}>
            Stack
          </p>
          <div style={{ gridColumn: "span 4" }}>
            <StackGrid icons={project.stack} />
          </div>
        </motion.div>

        {/* Walkthrough — what it is / how to use */}
        {project.walkthrough && (
          <div style={{ display: "flex", flexDirection: "column", gap: 110, padding: "40px 0 20px" }}>
            <motion.p
              className="text-h3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ color: "var(--color-text-secondary)" }}
            >
              How it works
            </motion.p>
            {project.walkthrough.map((step, i) => (
              <WalkStep key={i} step={step} index={i} reverse={i % 2 === 1} />
            ))}
          </div>
        )}

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
