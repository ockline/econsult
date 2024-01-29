import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'process.env': {}
    'process.env.REACT_APP_API_BASE_URL': JSON.stringify('http://127.0.0.1:8000/api'),
  },
  build: {
    chunkSizeWarningLimit: 5000000,
    minify: true,
    },
    server: {
      host: true,
    }
    
})
