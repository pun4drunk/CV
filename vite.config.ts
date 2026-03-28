import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Production builds use /profile/ for GitHub Pages at https://orithmicsoftware.github.io/profile/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/profile/' : '/',
  plugins: [react(), tailwindcss()],
}))
