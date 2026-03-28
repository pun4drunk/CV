import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// GitHub Pages path = repository name. CI sets VITE_BASE_PATH=/repo-name/; local
// `npm run build` defaults to /sample-project/ (see README).
function pagesBaseFromEnv(): string {
  const raw = process.env.VITE_BASE_PATH?.trim()
  if (raw) {
    const withSlash = raw.startsWith('/') ? raw : `/${raw}`
    return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
  }
  return '/sample-project/'
}

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? pagesBaseFromEnv() : '/',
  plugins: [react(), tailwindcss()],
}))
