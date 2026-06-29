import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Don't watch PDFs in public/ — Windows locks open PDFs (EBUSY) and
      // crashes the dev-server file watcher. They don't need HMR anyway.
      ignored: ["**/public/**/*.pdf"],
    },
  },
})
