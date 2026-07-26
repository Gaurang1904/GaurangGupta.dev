import { Routes, Route } from "react-router-dom"
import { useTheme } from "./components/ThemeToggle"
import { useSmoothScroll, ScrollToTop } from "./components/SmoothScroll"
import { AvailabilityBadge } from "./components/AvailabilityBadge"
import { AuraWidget } from "./components/AuraWidget"
import { HomePage } from "./pages/HomePage"
import { ProjectPage } from "./pages/ProjectPage"
import { ExperiencePage } from "./pages/ExperiencePage"
import { PlaygroundPage } from "./pages/PlaygroundPage"
import { NotFoundPage } from "./pages/NotFoundPage"

export default function App() {
  const { theme, toggle } = useTheme()
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <AvailabilityBadge />
      <AuraWidget />
      <AuraWidget />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} onToggle={toggle} />} />
        <Route path="/experience/:slug" element={<ExperiencePage />} />
        <Route path="/:slug" element={<ProjectPage />} />
        <Route path="/Playground" element={<PlaygroundPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
