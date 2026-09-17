import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function codeDirectSaverPlugin(): Plugin {
  return {
    name: 'vite-plugin-code-direct-saver',
    configureServer(server) {
      server.middlewares.use('/__api/save-config', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method Not Allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            const { desktopPresets, mobilePresets, sceneSettings } = data

            const rootDir = process.cwd()

            // 1. Update src/data/cameraPresets.ts
            if (desktopPresets && mobilePresets) {
              const cameraPresetsPath = path.resolve(rootDir, 'src/data/cameraPresets.ts')
              const cameraContent = `import type { PortfolioSection } from '../store/portfolioStore'

export interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export type ViewportMode = 'desktop' | 'mobile'

export const desktopCameraPresets: Record<PortfolioSection, CameraPreset> = ${JSON.stringify(desktopPresets, null, 2)}

export const mobileCameraPresets: Record<PortfolioSection, CameraPreset> = ${JSON.stringify(mobilePresets, null, 2)}

// Fallback alias for backward compatibility
export const cameraPresets = desktopCameraPresets
`
              fs.writeFileSync(cameraPresetsPath, cameraContent, 'utf-8')
            }

            // 2. Update src/store/portfolioStore.ts defaultSceneSettings
            if (sceneSettings) {
              const storePath = path.resolve(rootDir, 'src/store/portfolioStore.ts')
              let storeContent = fs.readFileSync(storePath, 'utf-8')

              const formattedSettings = JSON.stringify(sceneSettings, null, 2)
              const regex = /export const defaultSceneSettings: SceneSettings = \{[\s\S]*?\n\}/
              const replacement = `export const defaultSceneSettings: SceneSettings = ${formattedSettings}`

              if (regex.test(storeContent)) {
                storeContent = storeContent.replace(regex, replacement)
                fs.writeFileSync(storePath, storeContent, 'utf-8')
              }
            }

            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true, message: 'Changes saved directly to code files!' }))
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err)
            res.statusCode = 500
            res.end(JSON.stringify({ error: errorMessage }))
          }
        })
      })
    },
  }
}

// Chunks that should NOT be eagerly modulepreloaded — they belong to the lazy PortfolioScene
const DEFERRED_CHUNKS = ['three-core', 'drei-vendor', 'r3f-vendor', 'gsap-vendor']

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), codeDirectSaverPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) {
            return 'three-core'
          }
          if (id.includes('@react-three/drei')) {
            return 'drei-vendor'
          }
          if (id.includes('@react-three/fiber')) {
            return 'r3f-vendor'
          }
          if (id.includes('gsap')) {
            return 'gsap-vendor'
          }
          if (id.includes('lucide-react')) {
            return 'icons-vendor'
          }
          if (id.includes('zustand')) {
            return 'state-vendor'
          }
        },
      },
    },
    modulePreload: {
      // Only preload small critical chunks; skip heavy 3D vendor chunks
      resolveDependencies(_url, deps) {
        return deps.filter((dep) => !DEFERRED_CHUNKS.some((chunk) => dep.includes(chunk)))
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
