import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Custom domain (joaopaulo.dev) is served from the repo root, so base is '/'.
// public/CNAME pins the domain on every Pages deploy.
export default defineConfig({
  plugins: [vue()],
  base: '/',
  // Honor a PORT assigned by the environment (preview tooling); fall back to Vite's default.
  server: { port: Number(process.env.PORT) || 5173 },
  preview: { port: Number(process.env.PORT) || 4173 },
  build: {
    target: 'es2020',
  },
})
