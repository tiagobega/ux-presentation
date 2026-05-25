import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { remoteControlPlugin } from './plugins/remoteControl'

export default defineConfig({
  plugins: [react(), remoteControlPlugin()],
  server: {
    host: true,
  },
})
