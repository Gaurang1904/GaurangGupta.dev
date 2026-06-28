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
  thumbnail: string | null
  image02: string | null
  image03: string | null
  image04: string | null
  image05: string | null
  image06: string | null
  image07: string | null
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
    id: "R7qwFz4xW",
    slug: "n1-widgets",
    title: "N1 widgets",
    category: "Branding UI/UX",
    date: "2024",
    overview:
      "This project is entirely independent. I deeply admire and respect the teams at Nothing. I learned from their work and recreated Figma elements to help others design. This is why I love to make these resources. Made by Kaysar - kawsar.design",
    description:
      "<p>For this Widgets, I've used two great fonts: Roboto and NDOT 47 and 45 (Inspired by Nothing). You may find a folder for these font and others. To download and install this font for use within Figma, Once installed, restart Figma!</p>",
    services: "<p>UI Animation<br/>Type Designer</p>",
    role: "<p>UI Designer<br/>Creative Director</p>",
    thumbnail:
      "https://framerusercontent.com/images/NhvP8fS9Bd47LSAWDVCOT3xiw.png",
    image02:
      "https://framerusercontent.com/images/Ad0XwCrH3UtZjAPwz3YczDwhKI.png",
    image03:
      "https://framerusercontent.com/images/cVqKOgtjwAnHqw4VZpEo1h1rB4.png",
    image04:
      "https://framerusercontent.com/images/mi7ZA81JHDM7JCGMzzE161hbE.png",
    image05: null,
    image06: null,
    image07: null,
    nextProject: "/h23",
  },
  {
    id: "y2RIE6SRC",
    slug: "h23",
    title: "H23",
    category: "Branding",
    date: "2023",
    overview:
      "H23 emerges in the digital realm as a cutting-edge Web3 agency, characterized by its minimalist, modern, and high-tech ethos. This fictional branding project encapsulates H23's mission to revolutionize the Web3 space with innovative solutions, sleek designs, and futuristic technology.",
    description:
      "<p>The H23 project was embarked upon to establish a distinctive brand presence in the burgeoning Web3 industry. With a focus on blockchain technology, cryptocurrency, and NFTs, H23 positions itself as a leader in delivering next-generation digital experiences.</p>",
    services: "<p>BRAND DESIGN</p>",
    role: "<p>CREATIVE DIRECTION</p>",
    thumbnail:
      "https://framerusercontent.com/images/1lKgMSMncdtxxIdtfOz62GUU8.png",
    image02:
      "https://framerusercontent.com/images/4oUHahz5PGc5KIDpj5COgHTs16A.png",
    image03:
      "https://framerusercontent.com/images/fNao0NwVxKOIkaq7bHLgD1iQ.png",
    image04:
      "https://framerusercontent.com/images/KaGLSpcvl2xtTrpJHdqeVljcL4.png",
    image05:
      "https://framerusercontent.com/images/cvgy0uni07SJPMVFmBTWHIVG01s.png",
    image06:
      "https://framerusercontent.com/images/R0FxCbdS7santdkEDGaDOdNRbUw.jpg",
    image07: null,
    nextProject: "/glodwater",
  },
  {
    id: "XVOLuhz07",
    slug: "glodwater",
    title: "Glod Water",
    category: "Packaging design",
    date: "2022",
    overview:
      'In the vibrant world of luxury beverages, "Glod Water" emerges as a beacon of elegance and purity. This fictional project encompasses the creation of a distinct brand identity for Glod Water, inspired by the fusion of gold\'s luxury and water\'s freshness.',
    description:
      "<p>The Glod Water project was conceived to craft a unique position in the premium water market. The brand identity combines minimalist design principles with luxurious gold accents to convey the product's premium nature.</p>",
    services: "<p>BRAND DESIGN<br/>PRODUCT RENDERING</p>",
    role: "<p>CREATIVE DIRECTOR</p>",
    thumbnail:
      "https://framerusercontent.com/images/y8Mt8l6bM9RHhgmzbW2J0LCsSs.png",
    image02:
      "https://framerusercontent.com/images/MJin5EUEvey76oyNTR33DVOzsp4.png",
    image03:
      "https://framerusercontent.com/images/YrfW9OwDUWHiCsIdVzI5825hwA.png",
    image04:
      "https://framerusercontent.com/images/AFUJAk8w2OFDqWJNXlTrtWd5A0g.png",
    image05:
      "https://framerusercontent.com/images/UgzWq32LDOpseYWXsusT4yy5pk.png",
    image06:
      "https://framerusercontent.com/images/B6nPSRjM2fYAHkz7LNJ3MB5Dpus.png",
    image07: null,
    nextProject: "/n1-widgets",
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

export const selectedWorks = [
  {
    title: "FluxLLM — AI Gateway",
    tags: "LLM Infra · FastAPI · vLLM",
    link: "/n1-widgets",
  },
  {
    title: "King of the Pot",
    tags: "On-chain Game · Solidity · Base",
    link: "/h23",
  },
  {
    title: "Work Memory System",
    tags: "RAG · pgvector · FastAPI",
    link: "/glodwater",
  },
  {
    title: "Decentralized Stablecoin",
    tags: "DeFi · Foundry · Chainlink",
    link: "/n1-widgets",
  },
]
