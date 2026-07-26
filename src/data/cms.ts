export interface WorksItem {
  id: string
  slug: string
  title: string
  category: string
  date: string
  overview: string
  description: string
  services: string
  role: string
  stack: string[]
  thumbnail: string | null
  image02: string | null
  image03: string | null
  image04: string | null
  image05: string | null
  image06: string | null
  image07: string | null
  github: string
  heroImage?: string
  walkthrough?: { image: string; title: string; caption: string }[]
  nextProject: string
}

export interface ArchiveItem {
  id: string
  slug: string
  title: string
  image: string
  align: "Left" | "Right" | "Center Left" | "Center Right"
}

export const worksItems: WorksItem[] = [
  {
    id: "fluxllm",
    slug: "fluxllm",
    title: "FluxLLM — AI Gateway",
    category: "AI Infrastructure",
    date: "2025",
    overview:
      "A self-hosted LLM gateway unifying Groq, Gemini, Ollama, and vLLM behind one OpenAI-compatible API.",
    description:
      "<p>FluxLLM puts every model provider behind a single OpenAI-compatible endpoint. Adaptive EMA routing scores models on live cost and latency, while per-provider circuit breakers with automatic fallback and SHA-256 response caching keep it resilient and cheap.</p>",
    services: "<p>FastAPI · PostgreSQL<br/>Redis · Docker<br/>vLLM · React</p>",
    role: "<p>Design &amp; Engineering</p>",
    stack: ["python", "fastapi", "postgresql", "redis", "docker", "react"],
    thumbnail: null,
    image02: null,
    image03: null,
    image04: null,
    image05: null,
    image06: null,
    image07: null,
    github: "https://github.com/Gaurang1904/Ai-Gateway",
    heroImage: "/fluxllm/hero.png",
    walkthrough: [
      {
        image: "/fluxllm/api-keys.png",
        title: "Create & manage keys",
        caption:
          "Issue API keys per workspace, each with an optional credit limit, and track status, last-used, and creation date at a glance.",
      },
      {
        image: "/fluxllm/create-key.png",
        title: "Name it & set a budget",
        caption:
          "Name a key and set an optional credit limit; on creation the key is shown once, then stored only as a hash — never displayed again.",
      },
      {
        image: "/fluxllm/key-detail.png",
        title: "Usage, spend & budgets",
        caption:
          "Per-key usage and spend over time, metadata, and configurable budget caps to keep costs under control.",
      },
      {
        image: "/fluxllm/rankings.png",
        title: "Live model rankings",
        caption:
          "See which models win on real usage and price, grouped by capability — reasoning, coding, and long-context.",
      },
    ],
    nextProject: "/work-memory",
  },
  {
    id: "work-memory",
    slug: "work-memory",
    title: "Work Memory System",
    category: "AI / RAG",
    date: "2025",
    overview:
      "Document-grounded RAG over structured work data, returning grounded, cited answers.",
    description:
      "<p>A retrieval system over structured work data with PDF/DOCX ingestion and Gemini embeddings. Intent-aware reranking and deduplication handle temporal and experience-based queries, returning grounded, cited answers backed by retrieval-quality evaluation.</p>",
    services: "<p>Python · FastAPI<br/>RAG · pgvector<br/>Gemini Embeddings</p>",
    role: "<p>Design &amp; Engineering</p>",
    stack: ["python", "fastapi", "postgresql"],
    thumbnail: null,
    image02: null,
    image03: null,
    image04: null,
    image05: null,
    image06: null,
    image07: null,
    github: "https://github.com/Gaurang1904/my-work-memory",
    nextProject: "/king-of-the-pot",
  },
  {
    id: "king-of-the-pot",
    slug: "king-of-the-pot",
    title: "King of the Pot",
    category: "On-chain Game",
    date: "2025",
    overview:
      "An on-chain PvP jackpot game on Base where the last player to overtake the pot wins.",
    description:
      "<p>Players overtake a USDC pot to remain the last \"King\" when the timer expires. A single-contract room system — ReentrancyGuard, CEI pattern, full test coverage — is paired with a Viem event indexer feeding Redis/Postgres and real-time WebSocket updates.</p>",
    services: "<p>Solidity · Foundry<br/>Viem · Base<br/>Redis · Socket.io</p>",
    role: "<p>Smart Contracts &amp; Backend</p>",
    stack: ["solidity", "ethereum", "redis", "postgresql"],
    thumbnail: null,
    image02: null,
    image03: null,
    image04: null,
    image05: null,
    image06: null,
    image07: null,
    github: "https://github.com/Gaurang1904/King-Of-The-Pot",
    nextProject: "/stablecoin",
  },
  {
    id: "stablecoin",
    slug: "stablecoin",
    title: "Decentralized Stablecoin",
    category: "DeFi",
    date: "2025",
    overview:
      "An over-collateralized, USD-pegged stablecoin backed by crypto collateral.",
    description:
      "<p>A decentralized, over-collateralized stablecoin pegged to USD and backed by exogenous crypto collateral. Chainlink price feeds drive the collateralization checks, with mint/burn mechanics and a liquidation engine keeping the system solvent — built and tested end-to-end with Foundry.</p>",
    services: "<p>Solidity · Foundry<br/>Chainlink · OpenZeppelin</p>",
    role: "<p>Smart Contracts</p>",
    stack: ["solidity", "chainlink", "ethereum"],
    thumbnail: null,
    image02: null,
    image03: null,
    image04: null,
    image05: null,
    image06: null,
    image07: null,
    github: "https://github.com/Gaurang1904/STABLECOIN",
    nextProject: "/fluxllm",
  },
]

export const archiveItems: ArchiveItem[] = [
  {
    id: "ri6Y98F8w",
    slug: "personal-photography",
    title: "Personal Photography",
    image:
      "https://framerusercontent.com/images/rwhjhtrncQxZBDJni2Ue47zDM.png",
    align: "Right",
  },
  {
    id: "qYlHH06St",
    slug: "puke-logo",
    title: "Puke Logo",
    image:
      "https://framerusercontent.com/images/it0kUZYjd8ViYJAHLowAx4csOEY.png",
    align: "Left",
  },
  {
    id: "NiUpagE1H",
    slug: "personal-photography03",
    title: "Personal Photography",
    image:
      "https://framerusercontent.com/images/TAP9dayZQH6bpFyDmbSsgQbPVbc.jpg",
    align: "Left",
  },
  {
    id: "JK1ivY6zu",
    slug: "renders-02-copy",
    title: "Renders 02 Copy",
    image:
      "https://framerusercontent.com/images/WpWKgwy66uh6uY0OuKSSncrq0.jpg",
    align: "Right",
  },
  {
    id: "s9lOtOJfB",
    slug: "type-exploration",
    title: "Type Exploration",
    image:
      "https://framerusercontent.com/images/OEuU07NI7FNxRfaD6RfSwe6vbc.jpg",
    align: "Left",
  },
  {
    id: "MDAYcmzjP",
    slug: "renders-01",
    title: "Renders 01",
    image:
      "https://framerusercontent.com/images/3PeEhcaMDNujnUJz86bWxo80w.jpg",
    align: "Right",
  },
  {
    id: "IZXFWfePA",
    slug: "akio",
    title: "Studio Cool 3d Rendering",
    image:
      "https://framerusercontent.com/images/lN6ni95OOxhK0IzABcCdd0s4.jpg",
    align: "Left",
  },
  {
    id: "MjSJaAG30",
    slug: "personal-photography2",
    title: "Personal Photography",
    image:
      "https://framerusercontent.com/images/PrnTkbZ3iHIVDxBqF6xIGv8FLKI.jpg",
    align: "Right",
  },
  {
    id: "i3K8rd3UZ",
    slug: "personal-explorations",
    title: "OSCAR OLSSON / DISCO VOLANTE",
    image:
      "https://framerusercontent.com/images/3PeEhcaMDNujnUJz86bWxo80w.jpg",
    align: "Left",
  },
]

export interface ExperienceItem {
  slug: string
  role: string
  company: string
  location: string
  period: string
  summary: string
  highlights: string[]
  stack: string
}

export const experiences: ExperienceItem[] = [
  {
    slug: "tychi-labs",
    role: "AI/ML & Blockchain Engineer",
    company: "Tychi Labs",
    location: "Delhi, India",
    period: "Apr 2025 — Jun 2026",
    summary:
      "Building ML-driven market prediction, retrieval & ranking systems, and multi-chain EVM tooling that lets AI agents transact on-chain.",
    highlights: [
      "Developed an ML-based financial market prediction system over time-series data with feature engineering, generating trading signals at sub-2 second inference latency.",
      "Built an AI-driven retrieval and ranking system using vector embeddings and semantic similarity search to improve information-retrieval accuracy.",
      "Designed and evaluated an AI decision-making framework with ensemble-style voting and model-output aggregation.",
      "Built a recurring-investment system on ERC-3009 permit-based USDC transfers — gasless, signature-authorized automated crypto purchases.",
      "Built the Agent Execution Interface (AEI): an MCP-native gateway letting AI agents execute EVM transactions across 8 chains with no destination-chain gas — wallet-bound access keys, non-custodial signing, and an x402 payment flow.",
    ],
    stack: "Python · PyTorch · FastAPI · RAG · Solidity · Viem · EVM · MCP",
  },
]

export interface PlaygroundItem {
  title: string
  oneLiner: string
  tags: string
  href: string
}

export const githubProfile = "https://github.com/Gaurang1904"

export const playgroundProjects: PlaygroundItem[] = [
  {
    title: "Gesture Control",
    oneLiner: "Control your screen with real-time hand gestures.",
    tags: "Computer Vision · OpenCV",
    href: "https://github.com/Gaurang1904/gesture-control",
  },
  {
    title: "Earthquake Prediction",
    oneLiner: "Forecasting earthquake magnitude from seismic data with ML.",
    tags: "Machine Learning · Python",
    href: "https://github.com/Gaurang1904/Earhthquake-Prediction",
  },
  {
    title: "Amazon Recommendation",
    oneLiner: "Surfaces the products a shopper is most likely to buy.",
    tags: "Recommender Systems · ML",
    href: "https://github.com/Gaurang1904/amazon_product_recommendation",
  },
  {
    title: "Drowsiness Detection",
    oneLiner: "Spots driver drowsiness from live eye & face tracking.",
    tags: "Computer Vision · OpenCV",
    href: "https://github.com/Gaurang1904/drowsiness-detection",
  },
  {
    title: "Fund Me",
    oneLiner: "A crowdfunding smart contract funded via live price feeds.",
    tags: "Solidity · Foundry · Chainlink",
    href: "https://github.com/Gaurang1904/Fund-Me",
  },
  {
    title: "Lucky7",
    oneLiner: "An on-chain Lucky 7 number-betting game.",
    tags: "Smart Contract · Solidity",
    href: "https://github.com/Gaurang1904/Lucky7",
  },
  {
    title: "Expense Tracker",
    oneLiner: "Log, categorize, and visualize your spending.",
    tags: "App · Full-Stack",
    href: "https://github.com/Gaurang1904/ExpenseTracker",
  },
]

export const selectedWorks = [
  {
    title: "FluxLLM — AI Gateway",
    tags: "LLM Infra · FastAPI · vLLM",
    link: "/fluxllm",
  },
  {
    title: "Work Memory System",
    tags: "RAG · pgvector · FastAPI",
    link: "/work-memory",
  },
  {
    title: "King of the Pot",
    tags: "On-chain Game · Solidity · Base",
    link: "/king-of-the-pot",
  },
  {
    title: "Decentralized Stablecoin",
    tags: "DeFi · Foundry · Chainlink",
    link: "/stablecoin",
  },
]
