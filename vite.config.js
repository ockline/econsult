import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Uncomment and set base when deploying under a subpath (e.g. XAMPP) to avoid MIME errors:
  // base: '/core_system/econsult/',
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
