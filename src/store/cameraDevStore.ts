import { create } from 'zustand'
import { cameraPresets, type CameraPreset } from '../data/cameraPresets'
import type { PortfolioSection } from './portfolioStore'

const storageKey = 'portfolio-camera-presets-v2'

const loadPresets = (): Record<PortfolioSection, CameraPreset> => {
  try {
    return { ...cameraPresets, ...JSON.parse(localStorage.getItem(storageKey) ?? '{}') }
  } catch {
    return cameraPresets
  }
}

interface CameraDevState {
  presets: Record<PortfolioSection, CameraPreset>
  currentView: CameraPreset
  editMode: boolean
  setCurrentView: (preset: CameraPreset) => void
  setEditMode: (enabled: boolean) => void
  saveCurrentView: (section: PortfolioSection) => void
  updatePreset: (section: PortfolioSection, preset: CameraPreset) => void
  resetPreset: (section: PortfolioSection) => void
}

export const useCameraDevStore = create<CameraDevState>((set, get) => ({
  presets: loadPresets(),
  currentView: cameraPresets.overview,
  editMode: false,
  setCurrentView: (currentView) => set({ currentView }),
  setEditMode: (editMode) => set({ editMode }),
  saveCurrentView: (section) => {
    const presets = { ...get().presets, [section]: get().currentView }
    localStorage.setItem(storageKey, JSON.stringify(presets))
    set({ presets })
  },
  updatePreset: (section, preset) => {
    const presets = { ...get().presets, [section]: preset }
    localStorage.setItem(storageKey, JSON.stringify(presets))
    set({ presets })
  },
  resetPreset: (section) => {
    const presets = { ...get().presets, [section]: cameraPresets[section] }
    localStorage.setItem(storageKey, JSON.stringify(presets))
    set({ presets })
  },
}))
