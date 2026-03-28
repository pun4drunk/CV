import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Production builds use /sample-project/ for GitHub Pages at https://pun4drunk.github.io/sample-project/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/sample-project/' : '/',
  plugins: [react(), tailwindcss()],
}))
