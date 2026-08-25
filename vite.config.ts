import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/')
          ) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
