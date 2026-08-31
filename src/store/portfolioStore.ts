import { create } from 'zustand'

export type PortfolioSection = 'overview' | 'about' | 'computerVision' | 'bms' | 'website' | 'chatbot'
export type BmsPart = 1 | 2 | 3 | 4

export interface SceneSettings {
  exposure: number
  ambient: number
  hemisphere: number
  keyLight: number
  fillLight: number
  background: string
  overlay: number
  bmsFloorGap: number
}

export const defaultSceneSettings: SceneSettings = {
  exposure: 1,
  ambient: 1.8,
  hemisphere: 2.4,
  keyLight: 3.2,
  fillLight: 2.4,
  background: '#070b12',
  overlay: 0.18,
  bmsFloorGap: 2.5,
}

const loadSceneSettings = (): SceneSettings => {
  try {
    return { ...defaultSceneSettings, ...JSON.parse(localStorage.getItem('portfolio-scene-settings') ?? '{}') }
  } catch {
    return defaultSceneSettings
  }
}

interface PortfolioState {
  activeSection: PortfolioSection
  activeBmsPart: BmsPart | null
  hoveredObject: PortfolioSection | null
  isPanelOpen: boolean
  isSceneReady: boolean
  performanceMode: 'standard' | 'reduced'
  sceneSettings: SceneSettings
  isSceneControlsOpen: boolean
  setSceneSetting: <K extends keyof SceneSettings>(key: K, value: SceneSettings[K]) => void
  resetSceneSettings: () => void
  toggleSceneControls: () => void
  openSection: (section: Exclude<PortfolioSection, 'overview'>) => void
  setBmsPart: (part: BmsPart | null) => void
  closeSection: () => void
  setHoveredObject: (section: PortfolioSection | null) => void
  setSceneReady: (ready: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'overview',
  activeBmsPart: null,
  hoveredObject: null,
  isPanelOpen: false,
  isSceneReady: false,
  performanceMode: window.devicePixelRatio > 1.5 ? 'reduced' : 'standard',
  sceneSettings: loadSceneSettings(),
  isSceneControlsOpen: false,
  setSceneSetting: (key, value) => set((state) => {
    const sceneSettings = { ...state.sceneSettings, [key]: value }
    localStorage.setItem('portfolio-scene-settings', JSON.stringify(sceneSettings))
    return { sceneSettings }
  }),
  resetSceneSettings: () => {
    localStorage.removeItem('portfolio-scene-settings')
    set({ sceneSettings: defaultSceneSettings })
  },
  toggleSceneControls: () => set((state) => ({ isSceneControlsOpen: !state.isSceneControlsOpen })),
  openSection: (activeSection) => set({ activeSection, activeBmsPart: null, isPanelOpen: true }),
  setBmsPart: (activeBmsPart) => set({ activeBmsPart, activeSection: 'bms', isPanelOpen: true }),
  closeSection: () => set({ activeSection: 'overview', activeBmsPart: null, isPanelOpen: false }),
  setHoveredObject: (hoveredObject) => set({ hoveredObject }),
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
}))
