import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('../private.key'),
      cert: fs.readFileSync('../certificate.crt'),
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
