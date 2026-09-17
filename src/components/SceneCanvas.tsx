import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { SceneLoader } from './ui/Loading'
import { WebGLBoundary } from './ui/WebGLBoundary'
import { PortfolioScene } from '../scene/PortfolioScene'

interface SceneCanvasProps {
  isMobile: boolean
  isSceneReady: boolean
}

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function WebGLUnavailable() {
  return (
    <div className="webgl-fallback" role="status">
      <strong>3D view unavailable</strong>
      <span>WebGL tidak tersedia di browser ini. Gunakan navigasi untuk membuka portfolio.</span>
    </div>
  )
}

export function SceneCanvas({ isMobile, isSceneReady }: SceneCanvasProps) {
  const [webglAvailable] = useState(canCreateWebGLContext)

  if (!webglAvailable) return <WebGLUnavailable />

  return (
    <>
      <WebGLBoundary>
        <Canvas
          fallback={<WebGLUnavailable />}
          className={`scene-canvas-element ${isSceneReady ? 'canvas-ready' : 'canvas-loading'}`}
          camera={{ position: [-64.8, 29, -62.4], fov: 44, near: 0.1, far: 500 }}
          dpr={isMobile ? [1, 1.25] : [1, Math.min(window.devicePixelRatio || 1, 1.5)]}
          gl={{
            antialias: false,
            powerPreference: 'default',
            precision: 'mediump',
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
    </>
  )
}
