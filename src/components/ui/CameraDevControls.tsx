import { useState } from 'react'
import { useCameraDevStore } from '../../store/cameraDevStore'
import { type PortfolioSection, usePortfolioStore } from '../../store/portfolioStore'

const sections: PortfolioSection[] = ['overview', 'about', 'computerVision', 'bms', 'website', 'chatbot']
const labels: Record<PortfolioSection, string> = {
  overview: 'Overview',
  about: 'About',
  computerVision: 'Computer Vision',
  bms: 'BMS',
  website: 'Website',
  chatbot: 'Chatbot',
}

export function CameraDevControls() {
  const [isVisible, setIsVisible] = useState(false)
  const section = usePortfolioStore((state) => state.activeSection)
  const openSection = usePortfolioStore((state) => state.openSection)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const presets = useCameraDevStore((state) => state.presets)
  const currentView = useCameraDevStore((state) => state.currentView)
  const editMode = useCameraDevStore((state) => state.editMode)
  const setEditMode = useCameraDevStore((state) => state.setEditMode)
  const saveCurrentView = useCameraDevStore((state) => state.saveCurrentView)
  const updatePreset = useCameraDevStore((state) => state.updatePreset)
  const resetPreset = useCameraDevStore((state) => state.resetPreset)
  const preset = presets[section]

  const selectSection = (value: PortfolioSection) => value === 'overview' ? closeSection() : openSection(value)
  const setVector = (key: 'position' | 'target', index: number, value: number) => {
    const vector = [...preset[key]] as [number, number, number]
    vector[index] = value
    updatePreset(section, { ...preset, [key]: vector })
  }

  if (!isVisible) return <button className="camera-dev-toggle" type="button" onClick={() => setIsVisible(true)}>Camera editor</button>

  return (
    <section className="camera-dev-panel" aria-label="Camera focus editor">
      <header><strong>DEV / CAMERA</strong><span><button type="button" onClick={() => setEditMode(!editMode)}>{editMode ? 'Lock' : 'Edit'}</button><button type="button" onClick={() => { setEditMode(false); setIsVisible(false) }}>Hide</button></span></header>
      <label>Section<select value={section} onChange={(event) => selectSection(event.target.value as PortfolioSection)}>{sections.map((item) => <option key={item} value={item}>{labels[item]}</option>)}</select></label>
      {(['position', 'target'] as const).map((key) => <fieldset key={key}>
        <legend>{key}</legend>
        {(['X', 'Y', 'Z'] as const).map((axis, index) => <label key={axis}>{axis}<input type="number" step="0.1" value={Number(preset[key][index].toFixed(2))} onChange={(event) => setVector(key, index, Number(event.target.value))} /></label>)}
      </fieldset>)}
      <label>FOV<input type="number" min="15" max="100" step="1" value={preset.fov} onChange={(event) => updatePreset(section, { ...preset, fov: Number(event.target.value) })} /></label>
      <div className="camera-dev-readout">Live: {currentView.position.map((value) => value.toFixed(1)).join(', ')}</div>
      <div className="camera-dev-actions">
        <button type="button" onClick={() => saveCurrentView(section)}>Save current view</button>
        <button type="button" onClick={() => resetPreset(section)}>Reset section</button>
      </div>
      <small>{editMode ? 'Orbit, zoom, and pan enabled. Save current view when ready.' : 'Enable Edit to position camera.'}</small>
    </section>
  )
}
