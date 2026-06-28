import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div
      className="page section"
      style={{ padding: "120px 64px", textAlign: "center" }}
    >
      <h1 className="text-display" style={{ fontSize: 96, marginBottom: 24 }}>
        404
      </h1>
      <p className="text-body" style={{ color: "var(--color-text-secondary)", marginBottom: 32 }}>
        Page not found
      </p>
      <Link
        to="/"
        className="text-h3"
        style={{ color: "var(--color-text-primary)", textDecoration: "underline" }}
      >
        Go home
      </Link>
    </div>
  )
}
