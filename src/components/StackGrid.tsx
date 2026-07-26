/*
  Stack grid — a project's tech as logo + name chips. At rest they sit on
  transparent; hovering a chip fades a subtle rounded "spotlight" behind it.
  Logos live in public/skills/<name>.svg.
*/

const LABELS: Record<string, string> = {
  python: "Python",
  fastapi: "FastAPI",
  postgresql: "PostgreSQL",
  redis: "Redis",
  docker: "Docker",
  react: "React",
  solidity: "Solidity",
  ethereum: "Ethereum",
  chainlink: "Chainlink",
  nodejs: "Node.js",
  typescript: "TypeScript",
  go: "Go",
  aws: "AWS",
  langchain: "LangChain",
  numpy: "NumPy",
  pandas: "Pandas",
  pytorch: "PyTorch",
  tensorflow: "TensorFlow",
  uniswap: "Uniswap",
}

export function StackGrid({ icons }: { icons: string[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 8,
      }}
    >
      {icons.map((name) => (
        <div key={name} className="stack-tile">
          <div className="stack-hl" />
          <img
            src={`/skills/${name}.svg`}
            alt={name}
            style={{ width: 22, height: 22, objectFit: "contain", position: "relative", zIndex: 1, flexShrink: 0 }}
          />
          <span
            className="text-body"
            style={{ position: "relative", zIndex: 1, fontSize: 14, whiteSpace: "nowrap" }}
          >
            {LABELS[name] ?? name}
          </span>
        </div>
      ))}
    </div>
  )
}
