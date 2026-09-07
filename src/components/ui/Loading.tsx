import { useEffect, useState } from 'react'
import { usePortfolioStore } from '../../store/portfolioStore'

export function SceneLoader() {
  return null
}

export function LoadingOverlay() {
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    if (isSceneReady) {
      const timer = setTimeout(() => setMounted(false), 600)
      return () => clearTimeout(timer)
    }
  }, [isSceneReady])

  if (!mounted || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return null
  }

  return (
    <div
      className={`loading-overlay ${isSceneReady ? 'loading-fade-out' : 'loading-active'}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading-spinner-ring" />
      <strong className="loading-title">INITIALIZING 3D ENVIRONMENT</strong>
      <span className="loading-sub">Loading interactive WebGL assets…</span>
    </div>
  )
}
