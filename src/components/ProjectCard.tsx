import { Link } from "react-router-dom"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  tags: string
  link: string
  index: number
}

export function ProjectCard({ title, tags, link, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={link}
        style={{
          display: "block",
          padding: "32px 0",
          borderTop: "1px solid var(--color-line)",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <h3
            className="text-h2"
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              transition: "opacity 0.2s ease",
            }}
          >
            {title}
          </h3>
          <p className="text-h3" style={{ color: "var(--color-text-secondary)" }}>
            {tags}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
