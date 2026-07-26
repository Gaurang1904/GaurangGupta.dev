/*
  Generated editorial-portrait cover (original SVG art). A minimal
  head-and-shoulders form on a soft, muted studio backdrop with a film-grain
  overlay — evoking modern editorial studio-headshot art direction in a
  green / cream / gray / earthy palette. Deterministic per index.

  (Code-art approximation — not a photograph.)
*/

interface Palette {
  top: string
  bottom: string
  wardrobe: string
  skin: string
  hair: string
}

const PALETTES: Palette[] = [
  { top: "#d8d3ca", bottom: "#c5bfb3", wardrobe: "#57624e", skin: "#c8a586", hair: "#2e2a25" },
  { top: "#d3d7d0", bottom: "#bfc4ba", wardrobe: "#cdbb97", skin: "#cba387", hair: "#3a3026" },
  { top: "#ddd5c6", bottom: "#cabda8", wardrobe: "#8b8d86", skin: "#c7a184", hair: "#241f1a" },
  { top: "#d4d6d3", bottom: "#c1c4c0", wardrobe: "#b89a4e", skin: "#caa589", hair: "#332b22" },
  { top: "#dcd4c4", bottom: "#c8bca6", wardrobe: "#9c6a50", skin: "#c8a283", hair: "#2c2620" },
  { top: "#d6d4cf", bottom: "#c3c0b9", wardrobe: "#45533f", skin: "#c9a487", hair: "#2a241e" },
  { top: "#dbd6cb", bottom: "#c7c0b2", wardrobe: "#6f7a80", skin: "#c7a085", hair: "#2f2820" },
]

export function PlaygroundCover({ index }: { index: number; title?: string }) {
  const p = PALETTES[index % PALETTES.length]
  const uid = `pc${index}`

  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style={{ display: "block" }} aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.top} />
          <stop offset="1" stopColor={p.bottom} />
        </linearGradient>
        <radialGradient id={`vig-${uid}`} cx="50%" cy="42%" r="75%">
          <stop offset="0.6" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </radialGradient>
        <filter id={`grain-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* studio backdrop */}
      <rect width="200" height="200" fill={`url(#bg-${uid})`} />

      {/* soft contact shadow behind the subject */}
      <ellipse cx="100" cy="150" rx="78" ry="62" fill="#000000" opacity="0.06" />

      {/* shoulders / wardrobe */}
      <path d="M30 200 C 34 152, 64 132, 100 132 C 136 132, 166 152, 170 200 Z" fill={p.wardrobe} />

      {/* neck */}
      <rect x="88" y="104" width="24" height="34" rx="11" fill={p.skin} />
      <ellipse cx="100" cy="128" rx="18" ry="10" fill="#000000" opacity="0.07" />

      {/* head */}
      <ellipse cx="100" cy="84" rx="33" ry="39" fill={p.skin} />

      {/* hair */}
      <path d="M67 82 C 64 50, 80 40, 100 40 C 120 40, 136 50, 133 82 C 130 64, 120 56, 100 56 C 80 56, 70 64, 67 82 Z" fill={p.hair} />

      {/* grading + grain */}
      <rect width="200" height="200" fill={`url(#vig-${uid})`} />
      <rect width="200" height="200" filter={`url(#grain-${uid})`} opacity="0.1" />
    </svg>
  )
}
