import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    assetsDir: "assets",
    rollupOptions: {
      input: "./index.html",
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],

})
