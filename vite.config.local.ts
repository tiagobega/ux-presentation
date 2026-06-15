import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { remoteControlPlugin } from './plugins/remoteControl'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), tailwindcss(), remoteControlPlugin(), viteSingleFile()],
  base: './',
  server: {
    host: true,
  },
  build: {
    assetsInlineLimit: 100_000_000,
  },
})
