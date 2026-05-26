import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { remoteControlPlugin } from './plugins/remoteControl'

export default defineConfig({
  plugins: [react(), tailwindcss(), remoteControlPlugin()],
  server: {
    host: true,
  },
})
