import { create } from 'zustand'

export type PortfolioSection = 'overview' | 'about' | 'computerVision' | 'bms' | 'website' | 'chatbot'
export type BmsPart = 1 | 2 | 3
export type Language = 'id' | 'en'

export type HotspotSection = Exclude<PortfolioSection, 'overview'>
export type HotspotOffset = { x: number; y: number; z: number }

export interface SceneSettings {
  exposure: number
  ambient: number
  hemisphere: number
  keyLight: number
  fillLight: number
  background: string
  overlay: number
  bmsFloorGap: number
  hotspotOffsets: Record<HotspotSection, HotspotOffset>
}

export interface TelemetryState {
  temp: number
  humidity: number
  powerKw: number
  co2Ppm: number
  aqi: number
  occupancyCount: number
  cctvStatus: 'LIVE' | 'RECORDING'
}

export const defaultSceneSettings: SceneSettings = {
  exposure: 0.7,
  ambient: 0,
  hemisphere: 0,
  keyLight: 4.6,
  fillLight: 0.5,
  background: '#070b12',
  overlay: 0.28,
  bmsFloorGap: 0.25,
  hotspotOffsets: {
    about: { x: 0, y: 1.95, z: 0 },
    computerVision: { x: 0, y: 1.7, z: 0 },
    bms: { x: 0, y: 2.5, z: 0 },
    website: { x: 0, y: 1.9, z: 0 },
    chatbot: { x: 0, y: 1.7, z: 0 },
  },
}

const loadSceneSettings = (): SceneSettings => {
  try {
    return { ...defaultSceneSettings, ...JSON.parse(localStorage.getItem('portfolio-scene-settings') ?? '{}') }
  } catch {
    return defaultSceneSettings
  }
}

interface PortfolioState {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  activeSection: PortfolioSection
  activeBmsPart: BmsPart | null
  hoveredObject: PortfolioSection | null
  isPanelOpen: boolean
  isSceneReady: boolean
  performanceMode: 'standard' | 'reduced'
  sceneSettings: SceneSettings
  isSceneControlsOpen: boolean
  telemetry: TelemetryState
  updateTelemetry: () => void
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
  language: (localStorage.getItem('portfolio-language') as Language) || 'id',
  setLanguage: (language) => {
    localStorage.setItem('portfolio-language', language)
    set({ language })
  },
  toggleLanguage: () => {
    set((state) => {
      const nextLang = state.language === 'id' ? 'en' : 'id'
      localStorage.setItem('portfolio-language', nextLang)
      return { language: nextLang }
    })
  },
  activeSection: 'overview',
  activeBmsPart: null,
  hoveredObject: null,
  isPanelOpen: false,
  isSceneReady: false,
  performanceMode: window.devicePixelRatio > 1.5 ? 'reduced' : 'standard',
  sceneSettings: loadSceneSettings(),
  isSceneControlsOpen: false,
  telemetry: {
    temp: 21.8,
    humidity: 48,
    powerKw: 64.2,
    co2Ppm: 412,
    aqi: 28,
    occupancyCount: 38,
    cctvStatus: 'LIVE',
  },
  updateTelemetry: () => set((state) => ({
    telemetry: {
      ...state.telemetry,
      temp: Number((21.5 + (Math.random() * 0.8 - 0.4)).toFixed(1)),
      humidity: Math.round(48 + (Math.random() * 4 - 2)),
      powerKw: Number((64.0 + (Math.random() * 1.5 - 0.7)).toFixed(1)),
      co2Ppm: Math.round(410 + (Math.random() * 10 - 5)),
      occupancyCount: Math.max(30, Math.min(50, state.telemetry.occupancyCount + (Math.random() > 0.5 ? 1 : -1))),
    },
  })),
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
  openSection: (activeSection) => set({ activeSection, activeBmsPart: activeSection === 'bms' ? 1 : null, isPanelOpen: true }),
  setBmsPart: (activeBmsPart) => set({ activeBmsPart, activeSection: 'bms', isPanelOpen: true }),
  closeSection: () => set({ activeSection: 'overview', activeBmsPart: null, isPanelOpen: false }),
  setHoveredObject: (hoveredObject) => set({ hoveredObject }),
  setSceneReady: (isSceneReady) => set({ isSceneReady }),
}))
