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
  const [copied, setCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const section = usePortfolioStore((state) => state.activeSection)
  const openSection = usePortfolioStore((state) => state.openSection)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  
  const viewportMode = useCameraDevStore((state) => state.viewportMode)
  const setViewportMode = useCameraDevStore((state) => state.setViewportMode)
  const desktopPresets = useCameraDevStore((state) => state.desktopPresets)
  const mobilePresets = useCameraDevStore((state) => state.mobilePresets)
  const currentView = useCameraDevStore((state) => state.currentView)
  const editMode = useCameraDevStore((state) => state.editMode)
  const setEditMode = useCameraDevStore((state) => state.setEditMode)
  const updatePreset = useCameraDevStore((state) => state.updatePreset)
  const resetPreset = useCameraDevStore((state) => state.resetPreset)

  const activePresets = viewportMode === 'mobile' ? mobilePresets : desktopPresets
  const preset = activePresets[section]

  const selectSection = (value: PortfolioSection) => value === 'overview' ? closeSection() : openSection(value)
  const setVector = (key: 'position' | 'target', index: number, value: number) => {
    const vector = [...preset[key]] as [number, number, number]
    vector[index] = value
    updatePreset(section, { ...preset, [key]: vector })
  }

  const copyCode = () => {
    const code = `// Paste into src/data/cameraPresets.ts -> ${viewportMode === 'mobile' ? 'mobileCameraPresets' : 'desktopCameraPresets'}.${section}\n${section}: {\n  position: [${preset.position.map((v) => Number(v.toFixed(2))).join(', ')}],\n  target: [${preset.target.map((v) => Number(v.toFixed(2))).join(', ')}],\n  fov: ${preset.fov},\n},`
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveDirectlyToCode = async () => {
    try {
      setIsSaving(true)
      setSaveStatus('Saving...')

      const payload = {
        desktopPresets: useCameraDevStore.getState().desktopPresets,
        mobilePresets: useCameraDevStore.getState().mobilePresets,
        sceneSettings: usePortfolioStore.getState().sceneSettings,
      }

      const res = await fetch('/__api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Failed to save')
      setSaveStatus('✅ Saved to Code!')
      setTimeout(() => setSaveStatus(null), 3000)
    } catch {
      setSaveStatus('❌ Save Error')
      setTimeout(() => setSaveStatus(null), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  if (!isVisible) return <button className="camera-dev-toggle" type="button" onClick={() => setIsVisible(true)}>Camera editor</button>

  return (
    <section className="camera-dev-panel" aria-label="Camera focus editor">
      <header>
        <strong>DEV / CAMERA</strong>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button type="button" onClick={() => setEditMode(!editMode)}>{editMode ? 'Lock' : 'Edit'}</button>
          <button type="button" onClick={() => { setEditMode(false); setIsVisible(false) }}>Hide</button>
        </div>
      </header>

      {/* Direct Save Button */}
      <div style={{ margin: '8px 0 4px' }}>
        <button
          type="button"
          onClick={saveDirectlyToCode}
          disabled={isSaving}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #c7f36b, #38bdf8)',
            color: '#080c0b',
            fontWeight: 700,
            fontSize: '0.8rem',
            padding: '7px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(199, 243, 107, 0.3)',
          }}
        >
          {saveStatus ? saveStatus : '💾 Save Directly to Code'}
        </button>
      </div>

      {/* Viewport Mode Switcher */}
      <div className="camera-mode-tabs" style={{ display: 'flex', gap: '4px', margin: '8px 0' }}>
        <button
          type="button"
          className={`mode-tab-btn ${viewportMode === 'desktop' ? 'active' : ''}`}
          onClick={() => setViewportMode('desktop')}
        >
          🖥️ Desktop
        </button>
        <button
          type="button"
          className={`mode-tab-btn ${viewportMode === 'mobile' ? 'active' : ''}`}
          onClick={() => setViewportMode('mobile')}
        >
          📱 Mobile
        </button>
      </div>

      <label>
        Section
        <select value={section} onChange={(event) => selectSection(event.target.value as PortfolioSection)}>
          {sections.map((item) => <option key={item} value={item}>{labels[item]}</option>)}
        </select>
      </label>

      {(['position', 'target'] as const).map((key) => (
        <fieldset key={key}>
          <legend>{key} ({viewportMode})</legend>
          {(['X', 'Y', 'Z'] as const).map((axis, index) => (
            <label key={axis}>
              {axis}
              <input
                type="number"
                step="0.5"
                value={Number(preset[key][index].toFixed(2))}
                onChange={(event) => setVector(key, index, Number(event.target.value))}
              />
            </label>
          ))}
        </fieldset>
      ))}

      <label>
        FOV ({viewportMode})
        <input
          type="number"
          min="10"
          max="100"
          step="1"
          value={preset.fov}
          onChange={(event) => updatePreset(section, { ...preset, fov: Number(event.target.value) })}
        />
      </label>

      <div className="camera-dev-readout">Live Pos: {currentView.position.map((value) => value.toFixed(1)).join(', ')}</div>

      <div className="camera-dev-actions">
        <button type="button" onClick={copyCode} style={{ background: '#38bdf8', color: '#080c0b', fontWeight: 'bold' }}>
          {copied ? 'Copied Code!' : '📋 Copy Code'}
        </button>
        <button type="button" onClick={() => resetPreset(section)}>Reset</button>
      </div>

      <small>
        {editMode ? `Editing ${viewportMode.toUpperCase()} camera live. Click "Save Directly to Code" to write changes to files.` : `Enable Edit to orbit & tweak live.`}
      </small>
    </section>
  )
}


