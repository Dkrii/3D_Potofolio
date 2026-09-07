import { create } from 'zustand'
import {
  desktopCameraPresets,
  mobileCameraPresets,
  type CameraPreset,
  type ViewportMode,
} from '../data/cameraPresets'
import type { PortfolioSection } from './portfolioStore'

const desktopStorageKey = 'portfolio-camera-presets-desktop-v3'
const mobileStorageKey = 'portfolio-camera-presets-mobile-v3'

const loadPresetsForMode = (mode: ViewportMode): Record<PortfolioSection, CameraPreset> => {
  const defaults = mode === 'mobile' ? mobileCameraPresets : desktopCameraPresets
  const key = mode === 'mobile' ? mobileStorageKey : desktopStorageKey
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(key) ?? '{}') }
  } catch {
    return defaults
  }
}

interface CameraDevState {
  viewportMode: ViewportMode
  desktopPresets: Record<PortfolioSection, CameraPreset>
  mobilePresets: Record<PortfolioSection, CameraPreset>
  currentView: CameraPreset
  editMode: boolean
  setViewportMode: (mode: ViewportMode) => void
  setCurrentView: (preset: CameraPreset) => void
  setEditMode: (enabled: boolean) => void
  saveCurrentView: (section: PortfolioSection) => void
  updatePreset: (section: PortfolioSection, preset: CameraPreset) => void
  resetPreset: (section: PortfolioSection) => void
  getActivePreset: (section: PortfolioSection) => CameraPreset
}

export const useCameraDevStore = create<CameraDevState>((set, get) => ({
  viewportMode: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
  desktopPresets: loadPresetsForMode('desktop'),
  mobilePresets: loadPresetsForMode('mobile'),
  currentView: desktopCameraPresets.overview,
  editMode: false,
  setViewportMode: (viewportMode) => {
    const currentView = viewportMode === 'mobile' ? get().mobilePresets.overview : get().desktopPresets.overview
    set({ viewportMode, currentView })
  },
  setCurrentView: (currentView) => set({ currentView }),
  setEditMode: (editMode) => set({ editMode }),
  saveCurrentView: (section) => {
    const { viewportMode, desktopPresets, mobilePresets, currentView } = get()
    if (viewportMode === 'mobile') {
      const updated = { ...mobilePresets, [section]: currentView }
      localStorage.setItem(mobileStorageKey, JSON.stringify(updated))
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: currentView }
      localStorage.setItem(desktopStorageKey, JSON.stringify(updated))
      set({ desktopPresets: updated })
    }
  },
  updatePreset: (section, preset) => {
    const { viewportMode, desktopPresets, mobilePresets } = get()
    if (viewportMode === 'mobile') {
      const updated = { ...mobilePresets, [section]: preset }
      localStorage.setItem(mobileStorageKey, JSON.stringify(updated))
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: preset }
      localStorage.setItem(desktopStorageKey, JSON.stringify(updated))
      set({ desktopPresets: updated })
    }
  },
  resetPreset: (section) => {
    const { viewportMode, desktopPresets, mobilePresets } = get()
    if (viewportMode === 'mobile') {
      const updated = { ...mobilePresets, [section]: mobileCameraPresets[section] }
      localStorage.setItem(mobileStorageKey, JSON.stringify(updated))
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: desktopCameraPresets[section] }
      localStorage.setItem(desktopStorageKey, JSON.stringify(updated))
      set({ desktopPresets: updated })
    }
  },
  getActivePreset: (section) => {
    const state = get()
    return state.viewportMode === 'mobile' ? state.mobilePresets[section] : state.desktopPresets[section]
  },
}))

