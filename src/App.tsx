import { Routes, Route } from "react-router-dom"
import { useTheme } from "./components/ThemeToggle"
import { useSmoothScroll } from "./components/SmoothScroll"
import { HomePage } from "./pages/HomePage"
import { ProjectPage } from "./pages/ProjectPage"
import { PlaygroundPage } from "./pages/PlaygroundPage"
import { NotFoundPage } from "./pages/NotFoundPage"

export default function App() {
  const { theme, toggle } = useTheme()
  useSmoothScroll()

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} onToggle={toggle} />} />
      <Route path="/:slug" element={<ProjectPage />} />
      <Route path="/Playground" element={<PlaygroundPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
