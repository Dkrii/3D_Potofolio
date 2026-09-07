import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor'
          }
          if (id.includes('gsap')) {
            return 'gsap-vendor'
          }
          if (id.includes('lucide-react')) {
            return 'icons-vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
