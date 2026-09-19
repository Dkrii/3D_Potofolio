import { useEffect, useState } from 'react'
import { usePortfolioStore } from '../../store/portfolioStore'

export function SceneLoader() {
  return null
}

export function Mobile3DLoader() {
  return (
    <div className="mobile-3d-loader" role="status" aria-live="polite" aria-label="Memuat model 3D">
      <div className="mobile-3d-cube-loader" aria-hidden="true">
        <div className="mobile-3d-cube">
          <span className="cube-face cube-front" />
          <span className="cube-face cube-back" />
          <span className="cube-face cube-left" />
          <span className="cube-face cube-right" />
          <span className="cube-face cube-top" />
          <span className="cube-face cube-bottom" />
        </div>
      </div>
      <strong className="mobile-3d-loader-title">MEMUAT 3D…</strong>
      <span className="mobile-3d-loader-sub">Menyiapkan ruangan interaktif…</span>
    </div>
  )
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
