import { useState } from 'react'
import { type HotspotOffset, type HotspotSection, type SceneSettings, usePortfolioStore } from '../../store/portfolioStore'
import { useCameraDevStore } from '../../store/cameraDevStore'

const sliders: { key: Exclude<keyof SceneSettings, 'background' | 'hotspotOffsets' | 'bmsFloorGap'>; label: string; min: number; max: number; step: number }[] = [
  { key: 'exposure', label: 'Exposure', min: 0.2, max: 3.0, step: 0.05 },
  { key: 'ambient', label: 'Ambient', min: 0, max: 6, step: 0.1 },
  { key: 'hemisphere', label: 'Hemisphere', min: 0, max: 6, step: 0.1 },
  { key: 'keyLight', label: 'Key light', min: 0, max: 8, step: 0.1 },
  { key: 'fillLight', label: 'Fill light', min: 0, max: 8, step: 0.1 },
  { key: 'overlay', label: 'UI shading', min: 0, max: 0.8, step: 0.02 },
]

const hotspotTargets: { key: HotspotSection; label: string }[] = [
  { key: 'about', label: 'About (Developer Desk)' },
  { key: 'computerVision', label: 'Computer Vision (Corner TV)' },
  { key: 'bms', label: 'BMS (Main Wall Screen)' },
  { key: 'website', label: 'Website (Side Monitor)' },
  { key: 'chatbot', label: 'Chatbot (Small Monitor)' },
]

export function SceneControls() {
  const settings = usePortfolioStore((state) => state.sceneSettings)
  const isOpen = usePortfolioStore((state) => state.isSceneControlsOpen)
  const setSetting = usePortfolioStore((state) => state.setSceneSetting)
  const reset = usePortfolioStore((state) => state.resetSceneSettings)
  const toggle = usePortfolioStore((state) => state.toggleSceneControls)

  const [selectedHotspot, setSelectedHotspot] = useState<HotspotSection>('about')
  const [copied, setCopied] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  const currentOffset = settings.hotspotOffsets[selectedHotspot] ?? { x: 0, y: 0, z: 0 }

  const handleOffsetChange = (axis: keyof HotspotOffset, value: number) => {
    setSetting('hotspotOffsets', {
      ...settings.hotspotOffsets,
      [selectedHotspot]: {
        ...currentOffset,
        [axis]: value,
      },
    })
  }

  const copyConfigCode = () => {
    const code = `// Paste into src/store/portfolioStore.ts -> defaultSceneSettings\nexposure: ${settings.exposure.toFixed(2)},\nambient: ${settings.ambient.toFixed(1)},\nhemisphere: ${settings.hemisphere.toFixed(1)},\nkeyLight: ${settings.keyLight.toFixed(1)},\nfillLight: ${settings.fillLight.toFixed(1)},\noverlay: ${settings.overlay.toFixed(2)},\nbmsFloorGap: ${settings.bmsFloorGap.toFixed(2)},\nhotspotOffsets: ${JSON.stringify(settings.hotspotOffsets, null, 2)},`
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

  return (
    <div className="scene-controls">
      <button className="scene-controls-toggle" type="button" aria-expanded={isOpen} aria-controls="scene-controls-panel" onClick={toggle}>
        Light & Object Controls
      </button>
      {isOpen && (
        <section id="scene-controls-panel" className="scene-controls-panel" aria-label="Scene lighting and Object controls">
          <header>
            <span>Scene & Object controls</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button type="button" onClick={copyConfigCode}>{copied ? 'Copied!' : '📋 Copy'}</button>
              <button type="button" onClick={reset}>Reset</button>
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

          {sliders.map(({ key, label, min, max, step }) => (
            <label key={key}>
              <span>{label}<output>{settings[key].toFixed(key === 'overlay' || key === 'exposure' ? 2 : 1)}</output></span>
              <input type="range" min={min} max={max} step={step} value={settings[key]} onChange={(event) => setSetting(key, Number(event.target.value))} />
            </label>
          ))}
          <label className="color-control">
            <span>Background<output>{settings.background}</output></span>
            <input type="color" value={settings.background} onChange={(event) => setSetting('background', event.target.value)} />
          </label>

          {/* ALL OBJECT LABELS POSITION CONTROLS */}
          <div style={{ margin: '12px 0 8px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <label style={{ margin: '0 0 8px' }}>
              <span style={{ fontSize: '0.7rem', color: '#c7f36b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Select Object Label
              </span>
              <select
                value={selectedHotspot}
                onChange={(e) => setSelectedHotspot(e.target.value as HotspotSection)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '5px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                }}
              >
                {hotspotTargets.map((t) => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
            </label>

            {(['x', 'y', 'z'] as const).map((axis) => (
              <label key={axis} style={{ margin: '4px 0' }}>
                <span>{selectedHotspot} {axis.toUpperCase()} Offset<output>{currentOffset[axis].toFixed(2)}</output></span>
                <input
                  type="range"
                  min={axis === 'y' ? -1 : -5}
                  max={axis === 'y' ? 5 : 5}
                  step={0.05}
                  value={currentOffset[axis]}
                  onChange={(e) => handleOffsetChange(axis, Number(e.target.value))}
                />
              </label>
            ))}
          </div>

          <button
            className="bright-preset"
            type="button"
            onClick={() => {
              setSetting('exposure', 1.35)
              setSetting('ambient', 3)
              setSetting('hemisphere', 3.5)
              setSetting('keyLight', 4.5)
              setSetting('fillLight', 3)
              setSetting('overlay', 0.12)
            }}
          >
            Apply Bright Preset
          </button>
        </section>
      )}
    </div>
  )
}
