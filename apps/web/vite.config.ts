import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 5176,
    allowedHosts: ['one.auvietglobal.com', 'one.auviet.com', 'localhost', '127.0.0.1', '.auvietglobal.com', '.auviet.com']
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5176
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].v${Date.now()}.js`,
        chunkFileNames: `assets/[name].v${Date.now()}.js`,
        assetFileNames: `assets/[name].v${Date.now()}.[ext]`
      }
    }
  }
})
