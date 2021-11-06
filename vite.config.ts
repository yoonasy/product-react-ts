import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import viteReactJsx from "vite-react-jsx"

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$primary: #61dafb;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    viteReactJsx(),
    reactRefresh(),
  ]
})
