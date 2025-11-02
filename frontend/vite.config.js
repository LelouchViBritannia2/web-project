import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        game: resolve(__dirname, 'game.html'),
        account: resolve(__dirname, 'account.html'),
        privacy: resolve(__dirname, 'privacy-policy.html'),
        registration: resolve(__dirname, 'registration.html'),
        auth: resolve(__dirname, 'auth.html'),
      }
    }
  }
})