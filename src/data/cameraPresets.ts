import type { PortfolioSection } from '../store/portfolioStore'

export interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export type ViewportMode = 'desktop' | 'mobile'

export const desktopCameraPresets: Record<PortfolioSection, CameraPreset> = {
  overview: { position: [-58, 42, -72], target: [-7, 10.8, -8.4], fov: 50 },
  about: { position: [-1, 20.5, -26.5], target: [10.4, 15.4, -14.9], fov: 42 },
  computerVision: { position: [-3, 25.5, -39], target: [8.8, 20.2, -27.2], fov: 42 },
  bms: { position: [-20, 17, -52], target: [6.4, 6.4, -24.7], fov: 48 },
  website: { position: [-36.5, 17, -6.5], target: [-23.1, 8.8, 8.6], fov: 44 },
  chatbot: { position: [-58, 42, -72], target: [-7, 10.8, -8.4], fov: 50 },
}

export const mobileCameraPresets: Record<PortfolioSection, CameraPreset> = {
  overview: { position: [-70, 52, -86], target: [-7, 10.8, -8.4], fov: 62 },
  about: { position: [-5, 22, -32], target: [10.4, 15.4, -14.9], fov: 52 },
  computerVision: { position: [-6, 28, -46], target: [8.8, 20.2, -27.2], fov: 52 },
  bms: { position: [-26, 21, -62], target: [6.4, 6.4, -24.7], fov: 56 },
  website: { position: [-44, 21, -10], target: [-23.1, 8.8, 8.6], fov: 54 },
  chatbot: { position: [-70, 52, -86], target: [-7, 10.8, -8.4], fov: 62 },
}

// Fallback alias for backward compatibility
export const cameraPresets = desktopCameraPresets

