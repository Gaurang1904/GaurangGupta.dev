import { HeroSection } from "../components/HeroSection"
import { AboutSection } from "../components/AboutSection"
import { SelectedWorks } from "../components/SelectedWorks"
import { PlaygroundSection } from "../components/PlaygroundSection"
import { ExperiencesSection } from "../components/ExperiencesSection"
import { SkillsStrip } from "../components/SkillsStrip"
import { Footer } from "../components/Footer"

interface HomePageProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export function HomePage({ theme, onToggle }: HomePageProps) {
  return (
    <div className="page">
      <HeroSection theme={theme} onToggle={onToggle} />
      <AboutSection />
      <SelectedWorks />
      <PlaygroundSection />
      <ExperiencesSection />
      <SkillsStrip />
      <Footer />
    </div>
  )
}
