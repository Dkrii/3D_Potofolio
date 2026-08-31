import { Html, useProgress } from '@react-three/drei'
import { useEffect } from 'react'
import { usePortfolioStore } from '../../store/portfolioStore'

export function SceneLoader() {
  const { active, progress } = useProgress()
  const setSceneReady = usePortfolioStore((state) => state.setSceneReady)

  useEffect(() => {
    if (!active && progress === 100) setSceneReady(true)
  }, [active, progress, setSceneReady])

  return <Html center><div className="canvas-loader">Loading office… {Math.round(progress)}%</div></Html>
}

export function LoadingOverlay() {
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)
  if (isSceneReady) return null
  return <div className="loading-overlay" role="status" aria-live="polite"><strong>Preparing 3D office</strong><span>Loading interactive workspace…</span></div>
}
