import { Link } from "react-router-dom"
import { playgroundProjects, githubProfile } from "../data/cms"
import { PlaygroundCard } from "../components/PlaygroundCard"

/* Varied image ratios keep card heights uneven */
const RATIOS = ["16 / 9", "3 / 2", "16 / 10", "2 / 1", "3 / 2", "16 / 9", "16 / 10"]

/* Editorial rhythm: staggered pairs (varied width + vertical offset)
   alternating with a centered feature card. */
type Slot = { i: number; width: string; offsetY: number }
const LAYOUT: { type: "pair" | "feature"; items: Slot[] }[] = [
  { type: "pair", items: [{ i: 0, width: "44%", offsetY: 80 }, { i: 1, width: "40%", offsetY: 0 }] },
  { type: "feature", items: [{ i: 2, width: "50%", offsetY: 0 }] },
  { type: "pair", items: [{ i: 3, width: "48%", offsetY: 0 }, { i: 4, width: "40%", offsetY: 70 }] },
  { type: "pair", items: [{ i: 5, width: "44%", offsetY: 60 }, { i: 6, width: "48%", offsetY: 0 }] },
]

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

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 15, flexWrap: "wrap", marginBottom: 16 }}>
          <h1 className="text-h2">Playground</h1>
          <a
            href={githubProfile}
            target="_blank"
            rel="noreferrer"
            className="text-h3"
            style={{ color: "var(--color-text-secondary)" }}
          >
            @Gaurang1904 ↗
          </a>
        </div>

        <p className="text-body" style={{ maxWidth: 480, marginBottom: 24 }}>
          Experiments and weekend builds — computer-vision demos, ML models, and
          smart-contract prototypes that don't fit anywhere else.
        </p>

        {/* Editorial groups — staggered pairs + centered feature cards */}
        <div style={{ marginTop: 40 }}>
          {LAYOUT.map((row, ri) => (
            <div key={ri} className={`pg-row${row.type === "feature" ? " center" : ""}`}>
              {row.items.map(({ i, width, offsetY }) => (
                <div key={i} className="pg-item" style={{ width, marginTop: offsetY }}>
                  <PlaygroundCard item={playgroundProjects[i]} index={i} ratio={RATIOS[i % RATIOS.length]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
