import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import istanbul from 'vite-plugin-istanbul';

import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure local temp directory to prevent Windows Defender / OS locks on AppData/Local/Temp during esbuild transformations
const localTmp = path.resolve(__dirname, '.tmp')
if (!fs.existsSync(localTmp)) {
  fs.mkdirSync(localTmp, { recursive: true })
}
process.env.TEMP = localTmp
process.env.TMP = localTmp

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.tsx'],
      requireEnv: true, // Only active when VITE_COVERAGE=true
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      // Ignore helper scripts (and their temp files) so the file watcher
      // doesn't crash on locked files during development.
      ignored: ['**/scripts/**', '**/.tmp/**'],
    },
  },
})
