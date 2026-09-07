import { defaultSceneSettings, type HotspotOffset, type SceneSettings, usePortfolioStore } from '../../store/portfolioStore'

const sliders: { key: Exclude<keyof SceneSettings, 'background' | 'hotspotOffsets' | 'bmsFloorGap'>; label: string; min: number; max: number; step: number }[] = [
  { key: 'exposure', label: 'Exposure', min: 0.5, max: 2.5, step: 0.05 },
  { key: 'ambient', label: 'Ambient', min: 0, max: 6, step: 0.1 },
  { key: 'hemisphere', label: 'Hemisphere', min: 0, max: 6, step: 0.1 },
  { key: 'keyLight', label: 'Key light', min: 0, max: 8, step: 0.1 },
  { key: 'fillLight', label: 'Fill light', min: 0, max: 8, step: 0.1 },
  { key: 'overlay', label: 'UI shading', min: 0, max: 0.8, step: 0.02 },
]

export function SceneControls() {
  const settings = usePortfolioStore((state) => state.sceneSettings)
  const isOpen = usePortfolioStore((state) => state.isSceneControlsOpen)
  const setSetting = usePortfolioStore((state) => state.setSceneSetting)
  const reset = usePortfolioStore((state) => state.resetSceneSettings)
  const toggle = usePortfolioStore((state) => state.toggleSceneControls)

  const bmsOffset = settings.hotspotOffsets.bms ?? { x: 0, y: 0, z: 0 }

  const handleBmsOffsetChange = (axis: keyof HotspotOffset, value: number) => {
    setSetting('hotspotOffsets', {
      ...settings.hotspotOffsets,
      bms: {
        ...bmsOffset,
        [axis]: value,
      },
    })
  }

  return (
    <div className="scene-controls">
      <button className="scene-controls-toggle" type="button" aria-expanded={isOpen} aria-controls="scene-controls-panel" onClick={toggle}>
        Light & BMS controls
      </button>
      {isOpen && (
        <section id="scene-controls-panel" className="scene-controls-panel" aria-label="Scene lighting and BMS controls">
          <header><span>Scene controls</span><button type="button" onClick={reset}>Reset</button></header>
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

          {/* BMS Hotspot Label Offset Controls */}
          {/* <div style={{ margin: '10px 0 6px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>
              BMS Hotspot Position
            </span>
            {(['x', 'y', 'z'] as const).map((axis) => (
              <label key={axis} style={{ margin: '4px 0' }}>
                <span>BMS Offset {axis.toUpperCase()}<output>{bmsOffset[axis].toFixed(2)}</output></span>
                <input
                  type="range"
                  min={axis === 'y' ? -1.5 : -3}
                  max={axis === 'y' ? 3.5 : 3}
                  step={0.05}
                  value={bmsOffset[axis]}
                  onChange={(e) => handleBmsOffsetChange(axis, Number(e.target.value))}
                />
              </label>
            ))}
          </div> */}

          <button
            className="bright-preset"
            type="button"
            onClick={() => {
              setSetting('exposure', 1.35)
              setSetting('ambient', 3)
              setSetting('hemisphere', 3.5)
              setSetting('keyLight', 4.5)
              setSetting('fillLight', 3.5)
              setSetting('overlay', 0)
              setSetting('background', defaultSceneSettings.background)
            }}
          >
            Bright preset
          </button>
        </section>
      )}
    </div>
  )
}
