import { Link } from "react-router-dom"

export function PlaygroundPage() {
  return (
    <div className="page">
      <div className="section" style={{ padding: "80px 64px" }}>
        <Link
          to="/"
          className="text-h3"
          style={{ color: "var(--color-text-secondary)", display: "inline-block", marginBottom: 48 }}
        >
          ← Back
        </Link>
        <h1 className="text-h2" style={{ marginBottom: 24 }}>
          Playground
        </h1>
        <p className="text-body" style={{ maxWidth: 480 }}>
          A space for experiments — smart contract prototypes, model demos, and
          weekend builds that don't fit anywhere else. Coming soon.
        </p>
      </div>
    </div>
  )
}
