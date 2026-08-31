import { useState } from 'react'
import { defaultSceneSettings, type HotspotSection, type SceneSettings, usePortfolioStore } from '../../store/portfolioStore'

const hotspotLabels: Record<HotspotSection, string> = { about: 'About', computerVision: 'Computer Vision', bms: 'BMS', website: 'Website', chatbot: 'Chatbot' }
const hotspotSections = Object.keys(hotspotLabels) as HotspotSection[]

const sliders: { key: Exclude<keyof SceneSettings, 'background' | 'hotspotOffsets'>; label: string; min: number; max: number; step: number }[] = [
  { key: 'exposure', label: 'Exposure', min: 0.5, max: 2.5, step: 0.05 },
  { key: 'ambient', label: 'Ambient', min: 0, max: 6, step: 0.1 },
  { key: 'hemisphere', label: 'Hemisphere', min: 0, max: 6, step: 0.1 },
  { key: 'keyLight', label: 'Key light', min: 0, max: 8, step: 0.1 },
  { key: 'fillLight', label: 'Fill light', min: 0, max: 8, step: 0.1 },
  { key: 'overlay', label: 'UI shading', min: 0, max: 0.8, step: 0.02 },
  { key: 'bmsFloorGap', label: 'BMS floor gap', min: 0, max: 8, step: 0.25 },
]

export function SceneControls() {
  const [hotspotSection, setHotspotSection] = useState<HotspotSection>('about')
  const settings = usePortfolioStore((state) => state.sceneSettings)
  const isOpen = usePortfolioStore((state) => state.isSceneControlsOpen)
  const setSetting = usePortfolioStore((state) => state.setSceneSetting)
  const reset = usePortfolioStore((state) => state.resetSceneSettings)
  const toggle = usePortfolioStore((state) => state.toggleSceneControls)

  return (
    <div className="scene-controls">
      <button className="scene-controls-toggle" type="button" aria-expanded={isOpen} aria-controls="scene-controls-panel" onClick={toggle}>
        Light controls
      </button>
      {isOpen && <section id="scene-controls-panel" className="scene-controls-panel" aria-label="Scene lighting controls">
        <header><span>Scene controls</span><button type="button" onClick={reset}>Reset</button></header>
        {sliders.map(({ key, label, min, max, step }) => <label key={key}>
          <span>{label}<output>{settings[key].toFixed(key === 'overlay' || key === 'exposure' ? 2 : 1)}</output></span>
          <input type="range" min={min} max={max} step={step} value={settings[key]} onChange={(event) => setSetting(key, Number(event.target.value))} />
        </label>)}
        <label className="color-control">
          <span>Background<output>{settings.background}</output></span>
          <input type="color" value={settings.background} onChange={(event) => setSetting('background', event.target.value)} />
        </label>
        <div className="hotspot-controls">
          <label><span>Object label</span><select value={hotspotSection} onChange={(event) => setHotspotSection(event.target.value as HotspotSection)}>{hotspotSections.map((section) => <option key={section} value={section}>{hotspotLabels[section]}</option>)}</select></label>
          {(['x', 'y', 'z'] as const).map((axis) => <label key={axis}>
            <span>Position {axis.toUpperCase()}<output>{settings.hotspotOffsets[hotspotSection][axis].toFixed(2)}</output></span>
            <input type="range" min="-5" max="5" step="0.05" value={settings.hotspotOffsets[hotspotSection][axis]} onChange={(event) => setSetting('hotspotOffsets', { ...settings.hotspotOffsets, [hotspotSection]: { ...settings.hotspotOffsets[hotspotSection], [axis]: Number(event.target.value) } })} />
          </label>)}
        </div>
        <button className="bright-preset" type="button" onClick={() => {
          setSetting('exposure', 1.35)
          setSetting('ambient', 3)
          setSetting('hemisphere', 3.5)
          setSetting('keyLight', 4.5)
          setSetting('fillLight', 3.5)
          setSetting('overlay', 0)
          setSetting('background', defaultSceneSettings.background)
        }}>Bright preset</button>
      </section>}
    </div>
  )
}
