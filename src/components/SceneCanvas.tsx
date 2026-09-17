import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraDevControls } from './ui/CameraDevControls'
import { SceneLoader } from './ui/Loading'
import { SceneControls } from './ui/SceneControls'
import { WebGLBoundary } from './ui/WebGLBoundary'
import { PortfolioScene } from '../scene/PortfolioScene'

interface SceneCanvasProps {
  isMobile: boolean
  isSceneReady: boolean
}

export function SceneCanvas({ isMobile, isSceneReady }: SceneCanvasProps) {
  return (
    <>
      <WebGLBoundary>
        <Canvas
          className={`scene-canvas-element ${isSceneReady ? 'canvas-ready' : 'canvas-loading'}`}
          camera={{ position: [-64.8, 29, -62.4], fov: 44, near: 0.1, far: 500 }}
          dpr={isMobile ? [1, 1.25] : [1, Math.min(window.devicePixelRatio || 1, 1.5)]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            precision: 'highp',
            stencil: false,
            depth: true,
          }}
          frameloop="demand"
        >
          <Suspense fallback={<SceneLoader />}>
            <PortfolioScene />
          </Suspense>
        </Canvas>
      </WebGLBoundary>

      {(import.meta.env.DEV || !isMobile) && <SceneControls />}
      {import.meta.env.DEV && <CameraDevControls />}
    </>
  )
}
