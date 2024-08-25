import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 'process.env': {}
    //  minify: process.env.APP_ENV === 'production' ? 'esbuild' : false,
    //     cssMinify: process.env.APP_ENV === 'production',
    // 'process.env.REACT_APP_API_BASE_URL': JSON.stringify('http://127.0.0.1:8000/api'),
    // 'import.meta.env.VITE_REACT_APP_DOC_BASE_URL': JSON.stringify('http://127.0.0.1:8000'),
    
     'process.env.REACT_APP_API_BASE_URL': JSON.stringify('https://socratedevtest.esocrate.co.tz/api'),
 'import.meta.env.VITE_REACT_APP_DOC_BASE_URL': JSON.stringify('https://socratedevtest.esocrate.co.tz'),
  },
  build: {
    chunkSizeWarningLimit: 5000000,
    minify: true,
    },
    server: {
      host: true,
    }
    
})
