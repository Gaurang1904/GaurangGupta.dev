import type { PlaygroundItem } from "../data/cms"
import { PlaygroundCover } from "./PlaygroundCover"

/*
  Editorial work card — image-first. The cover stays clipped and centered in
  its frame; on hover a full-width dark label strip expands vertically (from a
  clipped 0-height line into a thin readable bar) centered over the image,
  revealing "(View Project)". The title below stays steady. Whole card links to
  the repo. (Hover transition lives in .pg-strip / .pg-card:hover in index.css.)
*/

export function PlaygroundCard({ item, index, ratio }: { item: PlaygroundItem; index: number; ratio: string }) {
  return (
    <a
      className="pg-card"
      href={item.href}
      target="_blank"
      rel="noreferrer"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      {/* Image area — masks everything to the thumbnail shape */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div className="pg-cover">
          <PlaygroundCover index={index} title={item.title} />
        </div>

        {/* Dark label strip — expands vertically on hover */}
        <div className="pg-strip">
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              whiteSpace: "nowrap",
            }}
          >
            (View Project)
          </span>
        </div>
      </div>

      {/* Title + one-liner below the image */}
      <div style={{ marginTop: 14 }}>
        <h3 className="text-h3" style={{ fontSize: 20 }}>{item.title}</h3>
        <p className="text-body" style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 4 }}>
          {item.oneLiner}
        </p>
      </div>
    </a>
  )
}
