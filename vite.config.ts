import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Production builds use /CV/ for GitHub Pages at https://<user>.github.io/CV/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/CV/' : '/',
  plugins: [react(), tailwindcss()],
}))
