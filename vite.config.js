import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative paths so the built app works at any server path (avoids MIME error when deployed to a subpath)
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 5000000, // optional, to allow big chunks
    minify: true,                   // always minify in production
  },
  server: {
    host: true,
    port: 5173,
  },
})
