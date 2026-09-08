import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { useCameraDevStore } from './store/cameraDevStore'
import { usePortfolioStore } from './store/portfolioStore'

// Expose helper to browser console: run `dumpConfig()` in DevTools
if (typeof window !== 'undefined') {
  ;(window as unknown as { dumpConfig: () => void }).dumpConfig = () => {
    const desktopPresets = useCameraDevStore.getState().desktopPresets
    const mobilePresets = useCameraDevStore.getState().mobilePresets
    const sceneSettings = usePortfolioStore.getState().sceneSettings

    const config = {
      desktopPresets,
      mobilePresets,
      sceneSettings,
    }

    console.log('=== 🛠️ 3D PORTFOLIO CONFIG DUMP ===')
    console.log(JSON.stringify(config, null, 2))
    console.log('===================================')
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(config, null, 2))
      console.log('📋 Full JSON copied to clipboard!')
    }
    return config
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
