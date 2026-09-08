import { create } from 'zustand'
import {
  desktopCameraPresets,
  mobileCameraPresets,
  type CameraPreset,
  type ViewportMode,
} from '../data/cameraPresets'
import type { PortfolioSection } from './portfolioStore'

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
  desktopPresets: { ...desktopCameraPresets },
  mobilePresets: { ...mobileCameraPresets },
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
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: currentView }
      set({ desktopPresets: updated })
    }
  },
  updatePreset: (section, preset) => {
    const { viewportMode, desktopPresets, mobilePresets } = get()
    if (viewportMode === 'mobile') {
      const updated = { ...mobilePresets, [section]: preset }
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: preset }
      set({ desktopPresets: updated })
    }
  },
  resetPreset: (section) => {
    const { viewportMode, desktopPresets, mobilePresets } = get()
    if (viewportMode === 'mobile') {
      const updated = { ...mobilePresets, [section]: mobileCameraPresets[section] }
      set({ mobilePresets: updated })
    } else {
      const updated = { ...desktopPresets, [section]: desktopCameraPresets[section] }
      set({ desktopPresets: updated })
    }
  },
  getActivePreset: (section) => {
    const state = get()
    return state.viewportMode === 'mobile' ? state.mobilePresets[section] : state.desktopPresets[section]
  },
}))


