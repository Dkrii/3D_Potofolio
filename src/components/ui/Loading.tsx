import { usePortfolioStore } from '../../store/portfolioStore'

export function SceneLoader() {
  return null
}

export function LoadingOverlay() {
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)

  if (isSceneReady || (typeof window !== 'undefined' && window.innerWidth < 768)) {
    return null
  }

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <strong>Preparing 3D office</strong>
      <span>Loading interactive WebGL assets…</span>
    </div>
  )
}
