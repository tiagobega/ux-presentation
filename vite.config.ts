import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { remoteControlPlugin } from './plugins/remoteControl'

// `--mode singlefile` empacota tudo (JS, CSS, SVG) dentro de um index.html
// que abre por duplo clique, sem servidor. O build normal continua em dist/.
export default defineConfig(({ mode }) => {
  const singlefile = mode === 'singlefile'

  return {
    plugins: [
      react(),
      tailwindcss(),
      remoteControlPlugin(),
      ...(singlefile ? [viteSingleFile()] : []),
    ],
    server: {
      host: true,
    },
    build: singlefile ? { outDir: 'dist-single' } : {},
  }
})
