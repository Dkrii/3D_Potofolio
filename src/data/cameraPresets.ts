import type { PortfolioSection } from '../store/portfolioStore'

export interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export type ViewportMode = 'desktop' | 'mobile'

export const desktopCameraPresets: Record<PortfolioSection, CameraPreset> = {
  overview: { position: [-64.8, 29, -62.4], target: [-11.8, 12.8, -23.570965], fov: 44 },
  about: { position: [-1, 19.4, -12], target: [10.4, 15.4, -12.1], fov: 22 },
  computerVision: { position: [-3, 20.3, -20.7], target: [8.8, 20.2, -23.2], fov: 23 },
  bms: { position: [-20, 15.1, -45.5], target: [6, 5.161307, -20.8], fov: 17 },
  website: { position: [-33.3, 11.1, -9.3], target: [-26.4, 9, 8.7], fov: 44 },
  chatbot: { position: [-52.775732, 18.468253, -82.130121], target: [-7.36, 8.1, 17.5], fov: 6 },
}

export const mobileCameraPresets: Record<PortfolioSection, CameraPreset> = {
  overview: { position: [-78, 36, -75], target: [-22.3, 12.3, -23.57], fov: 74 },
  about: { position: [-3, 20.4, -16], target: [10.4, 15.4, -12.1], fov: 32 },
  computerVision: { position: [-5, 21.5, -27], target: [8.8, 20.2, -23.2], fov: 34 },
  bms: { position: [-24, 17, -54], target: [6, 5.161307, -20.8], fov: 26 },
  website: { position: [-40, 14, -12], target: [-26.4, 9, 8.7], fov: 54 },
  chatbot: { position: [-62, 22, -96], target: [-7.36, 8.1, 17.5], fov: 12 },
}

// Fallback alias for backward compatibility
export const cameraPresets = desktopCameraPresets

