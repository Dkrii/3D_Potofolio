import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Play, X, ZoomIn } from 'lucide-react'
import { bmsPartDetails, portfolioContentI18n } from '../../data/portfolio'
import type { MediaItem } from '../../data/portfolio'
import type { BmsPart } from '../../store/portfolioStore'
import { usePortfolioStore } from '../../store/portfolioStore'

const sectionIds = { about: 'SEC-01', computerVision: 'SEC-02', bms: 'SEC-03', website: 'SEC-04', chatbot: 'SEC-05' }
const bmsParts: BmsPart[] = [1, 2, 3]

export function PortfolioPanel() {
  const language = usePortfolioStore((state) => state.language)
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const activeBmsPart = usePortfolioStore((state) => state.activeBmsPart)
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen)
  const setBmsPart = usePortfolioStore((state) => state.setBmsPart)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const telemetry = usePortfolioStore((state) => state.telemetry)
  const updateTelemetry = usePortfolioStore((state) => state.updateTelemetry)
  const panelRef = useRef<HTMLElement>(null)
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isClosingMedia, setIsClosingMedia] = useState(false)
  const closingTimeoutRef = useRef<number | null>(null)

  const handleOpenMedia = (item: MediaItem) => {
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current)
    }
    setIsClosingMedia(false)
    setSelectedMedia(item)
  }

  const handleCloseMedia = () => {
    if (isClosingMedia || !selectedMedia) return
    setIsClosingMedia(true)
    closingTimeoutRef.current = window.setTimeout(() => {
      setSelectedMedia(null)
      setIsClosingMedia(false)
    }, 220) // match CSS transition duration
  }

  useEffect(() => {
    return () => {
      if (closingTimeoutRef.current) {
        clearTimeout(closingTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (activeSection !== 'bms') return
    const interval = setInterval(updateTelemetry, 3000)
    return () => clearInterval(interval)
  }, [activeSection, updateTelemetry])

  // Close media modal on Escape key
  useEffect(() => {
    if (!selectedMedia) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseMedia()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedMedia, isClosingMedia])

  if (!isPanelOpen || activeSection === 'overview') return null
  const content = portfolioContentI18n[language][activeSection]
  const currentBmsDetail = activeBmsPart ? bmsPartDetails[activeBmsPart] : bmsPartDetails[1]

  return (
    <>
      <aside
        ref={panelRef}
        className="portfolio-panel scrollable-panel"
        aria-labelledby="panel-title"
      >
        <div className="detail-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="mobile-modal-back-btn"
              type="button"
              onClick={closeSection}
              aria-label="Back to overview"
            >
              <ArrowLeft size={18} color="#38bdf8" />
            </button>
            <span>{sectionIds[activeSection]} / {activeSection === 'bms' ? 'DIGITAL TWIN DEMO' : 'PROJECT OVERVIEW'}</span>
          </div>
          <button className="panel-close" type="button" onClick={closeSection} aria-label="Close detail panel">
            <X size={18} />
          </button>
        </div>

        <div className="detail-status">
          <i />
          <span>{activeSection === 'bms' ? 'SIMULATED DATA · TELEMETRY ACTIVE' : 'Portfolio section'}</span>
        </div>

        <p className="eyebrow">{content.eyebrow}</p>
        <h1 id="panel-title">{content.title}</h1>

        {/* Media & Demo Showcase Grid */}
        <div className="detail-block" style={{ marginTop: '12px' }}>
          <h2>Media & Demo Showcase</h2>
          {content.media && content.media.length > 0 ? (
            <div className="media-showcase-grid">
              {content.media.map((item, idx) => (
                <div
                  key={idx}
                  className={`media-showcase-card ${item.type === 'video' ? 'video-card' : 'screenshot-card'} active-media-card`}
                  onClick={() => handleOpenMedia(item)}
                >
                  <div className="media-card-thumbnail-wrap">
                    {item.type === 'video' ? (
                      <div className="media-card-video-preview">
                        <video
                          src={item.src}
                          poster={item.poster}
                          muted
                          playsInline
                          preload="metadata"
                          className="media-thumb-video"
                        />
                        <div className="media-play-overlay">
                          <Play size={20} color="#fff" fill="#fff" />
                        </div>
                      </div>
                    ) : (
                      <div className="media-card-img-preview">
                        <img src={item.src} alt={item.title} className="media-thumb-img" loading="lazy" />
                        <div className="media-zoom-overlay">
                          <ZoomIn size={18} color="#fff" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="media-card-meta">
                    <span className="media-card-title">{item.title}</span>
                    <span className="media-card-subtitle">{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="media-showcase-grid">
              <div className="media-showcase-card video-card">
                <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🎬</div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#38bdf8' }}>Demo Video</span>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>[ MP4 / Demo Preview ]</span>
              </div>
              <div className="media-showcase-card screenshot-card">
                <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>🖼️</div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1' }}>Dashboard Screenshot</span>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>[ Main Interface ]</span>
              </div>
              <div className="media-showcase-card analytics-card">
                <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>📊</div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#cbd5e1' }}>Analytics Preview</span>
                <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>[ Telemetry / Logs ]</span>
              </div>
            </div>
          )}
        </div>

      {/* Key Impact & Performance Metrics (Single Column on Mobile) */}
      {content.metrics && (
        <div className="detail-block">
          <h2>Key Impact & Performance Metrics</h2>
          <div className="metrics-summary-grid">
            {content.metrics.map((metric) => (
              <div key={metric.label} className="metric-item-card">
                <strong className="metric-val">{metric.value}</strong>
                <span className="metric-lbl">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detail-block">
        <h2>Description</h2>
        <p className="panel-description" style={{ lineHeight: '1.55', color: '#cbd5e1', fontSize: '0.88rem' }}>{content.description}</p>
      </div>

      {/* Render Workflow Step Diagram (Node Flow) */}
      {content.workflow && (
        <div className="detail-block">
          <h2>Project Flow Architecture</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              margin: '8px 0 12px',
              position: 'relative',
            }}
          >
            {content.workflow.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.2)',
                      color: '#38bdf8',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #38bdf8',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500, lineHeight: 1.3 }}>{step}</span>
                </div>
                {idx < (content.workflow?.length ?? 0) - 1 && (
                  <div
                    style={{
                      paddingLeft: '21px',
                      color: '#38bdf8',
                      fontSize: '0.9rem',
                      lineHeight: '14px',
                      margin: '1px 0',
                    }}
                  >
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'bms' && (
        <>
          {/* Dummy Live Telemetry Metrics */}
          <div className="detail-block">
            <h2>Simulated IoT Telemetry</h2>
            <div className="bms-telemetry-grid">
              <div className="telemetry-box">
                <span>AVG TEMP</span>
                <strong style={{ color: '#38bdf8' }}>{telemetry.temp} °C</strong>
              </div>
              <div className="telemetry-box">
                <span>POWER LOAD</span>
                <strong style={{ color: '#4ade80' }}>{telemetry.powerKw} kW</strong>
              </div>
              <div className="telemetry-box">
                <span>CO2 LEVEL</span>
                <strong style={{ color: '#facc15' }}>{telemetry.co2Ppm} ppm</strong>
              </div>
              <div className="telemetry-box">
                <span>OCCUPANCY</span>
                <strong style={{ color: '#a78bfa' }}>{telemetry.occupancyCount} Persons</strong>
              </div>
            </div>
          </div>

          {/* Part Selector */}
          <div className="detail-block">
            <h2>Select BMS Floor Part</h2>
            <div className="bms-part-controls" aria-label="BMS part selector">
              {bmsParts.map((part) => (
                <button key={part} type="button" aria-pressed={activeBmsPart === part} onClick={() => setBmsPart(part)}>
                  Part {String(part).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Dummy Zone Detail */}
          {currentBmsDetail && (
            <div className="detail-block" style={{ background: 'rgba(56, 189, 248, 0.04)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.05em', fontWeight: 600 }}>
                {currentBmsDetail.zone}
              </div>
              <h3 style={{ margin: '4px 0 8px', fontSize: '1rem', color: '#fff' }}>{currentBmsDetail.name}</h3>

              <h4 style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: '8px 0 4px', textTransform: 'uppercase' }}>Simulated Sensors</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px', display: 'grid', gap: '4px' }}>
                {currentBmsDetail.sensors.map((sensor) => (
                  <li key={sensor.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', background: 'rgba(0, 0, 0, 0.2)', padding: '4px 8px', borderRadius: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>{sensor.label}</span>
                    <strong style={{ color: sensor.status === 'active' ? '#4ade80' : '#e2e8f0' }}>{sensor.value}</strong>
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: '8px 0 4px', textTransform: 'uppercase' }}>CCTV Surveillance Feeds</h4>
              <div style={{ display: 'grid', gap: '4px' }}>
                {currentBmsDetail.cctvFeeds.map((cam) => (
                  <div key={cam.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 0, 0, 0.3)', padding: '6px 8px', borderRadius: '4px', borderLeft: '3px solid #38bdf8' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#38bdf8', marginRight: '6px' }}>{cam.id}</span>
                      <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{cam.location}</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '3px', fontWeight: 600 }}>
                      ● {cam.status} ({cam.fps} FPS)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {content.items && (
        <div className="detail-block">
          <h2>Key Features & Implementation</h2>
          <ul className="project-list">{content.items.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}</ul>
        </div>
      )}

      {content.tags && (
        <div className="detail-block">
          <h2>Tech Stack & Tools</h2>
          <ul className="tag-list">{content.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      )}

      {/* Bottom Spacer for safe scrolling */}
      <div style={{ height: '40px' }} />
    </aside>

    {/* Media Zoom / Video Player Lightbox Modal */}
    {selectedMedia && (
      <div
        className={`media-lightbox-backdrop ${isClosingMedia ? 'lightbox-exit' : 'lightbox-enter'}`}
        onClick={handleCloseMedia}
        role="dialog"
        aria-modal="true"
        aria-label="Media preview"
      >
        <div
          className={`media-lightbox-modal ${isClosingMedia ? 'modal-exit' : 'modal-enter'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="media-lightbox-close"
            onClick={(e) => {
              e.stopPropagation()
              handleCloseMedia()
            }}
            aria-label="Close preview"
          >
            <X size={20} />
          </button>

          <div className="media-lightbox-header">
            <span className="media-lightbox-badge">{selectedMedia.type.toUpperCase()} PREVIEW</span>
            <h3>{selectedMedia.title}</h3>
            <p>{selectedMedia.subtitle}</p>
          </div>

          <div className="media-lightbox-body">
            {selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.src}
                poster={selectedMedia.poster}
                controls
                autoPlay
                playsInline
                className="media-lightbox-video"
              />
            ) : (
              <img
                src={selectedMedia.src}
                alt={selectedMedia.title}
                className="media-lightbox-image"
              />
            )}
          </div>
        </div>
      </div>
    )}
  </>
  )
}
