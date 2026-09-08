import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState, type CSSProperties } from 'react'
import { Sparkles, ArrowLeft, Monitor, X } from 'lucide-react'
import './App.css'
import { Navigation, projectConfig } from './components/navigation/Navigation'
import { PortfolioPanel } from './components/panels/PortfolioPanel'
import { DashboardHeader, StatusBar } from './components/ui/DashboardChrome'
import { LoadingOverlay, SceneLoader } from './components/ui/Loading'
import { SceneControls } from './components/ui/SceneControls'
import { CameraDevControls } from './components/ui/CameraDevControls'
import { Tooltip } from './components/ui/Tooltip'
import { WebGLBoundary } from './components/ui/WebGLBoundary'
import { PortfolioScene } from './scene/PortfolioScene'
import { usePortfolioStore } from './store/portfolioStore'
import { useCameraDevStore } from './store/cameraDevStore'

function App() {
  const language = usePortfolioStore((state) => state.language)
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen)
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)
  const openSection = usePortfolioStore((state) => state.openSection)
  const overlay = usePortfolioStore((state) => state.sceneSettings.overlay)

  const isId = language === 'id'

  // Mobile Viewport detection (<768px)
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false))
  const [showMobile3D, setShowMobile3D] = useState(false)

  // Mobile First-Time Recommendation Modal State (Show when in mobile view)
  const [showMobileNotice, setShowMobileNotice] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      useCameraDevStore.getState().setViewportMode(mobile ? 'mobile' : 'desktop')

      // When switching to mobile dynamically in Inspect Element
      if (mobile) {
        setShowMobileNotice(true)
      } else {
        setShowMobileNotice(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const dismissMobileNotice = (launch3D = false) => {
    setShowMobileNotice(false)
    if (launch3D) {
      setShowMobile3D(true)
    }
  }

  // If on desktop, reset showMobile3D
  const shouldRender3D = !isMobile || (showMobile3D && !isPanelOpen)

  return (
    <main className="app-shell" style={{ '--scene-overlay': overlay } as CSSProperties}>
      <DashboardHeader />

      {/* Mobile Desktop Recommendation Pop-up Modal */}
      {showMobileNotice && (
        <div className="mobile-notice-backdrop" onClick={() => dismissMobileNotice(false)}>
          <div className="mobile-notice-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mobile-notice-close-btn"
              onClick={() => dismissMobileNotice(false)}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>

            <div className="mobile-notice-icon-wrapper">
              <Monitor size={28} color="#38bdf8" />
            </div>

            <span className="mobile-notice-badge">OPTIMAL VIEW RECOMMENDATION</span>
            <h3 className="mobile-notice-title">Pengalaman Terbaik di Desktop</h3>
            
            <p className="mobile-notice-text">
              Website ini dilengkapi <strong>Interactive 3D WebGL Room & Spatial Camera</strong> yang dirancang maksimal untuk layar <strong>Desktop / Laptop</strong>.
            </p>

            <div className="mobile-notice-actions">
              <button
                type="button"
                className="mobile-notice-primary-btn"
                onClick={() => dismissMobileNotice(false)}
              >
                Lanjutkan di Mobile
              </button>

              <button
                type="button"
                className="mobile-notice-secondary-btn"
                onClick={() => dismissMobileNotice(true)}
              >
                <Sparkles size={14} color="#c7f36b" />
                <span>Coba Mode 3D di HP</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="sidebar">
        <Navigation />
        <div className="sidebar-meta">
          <span>Explore Mode</span>
          <strong>Interactive Model</strong>
          <small>Orbit · Zoom · Select</small>
        </div>
      </aside>

      {/* Desktop 3D Canvas OR Fullscreen Mobile 3D Orbit Scene */}
      {shouldRender3D && (
        <section className={`scene-workspace ${isMobile && showMobile3D ? 'mobile-3d-fullscreen' : ''}`} aria-label="Interactive 3D portfolio model">
          {/* Mobile Back Button to Card List */}
          {isMobile && showMobile3D && (
            <button
              type="button"
              onClick={() => setShowMobile3D(false)}
              className="mobile-back-to-list"
              aria-label="Back to project list"
            >
              <ArrowLeft size={16} color="#38bdf8" />
              <span>Exit 3D View</span>
            </button>
          )}

          <WebGLBoundary>
            <Canvas
              className={`scene-canvas-element ${isSceneReady ? 'canvas-ready' : 'canvas-loading'}`}
              camera={{ position: [-64.8, 29, -62.4], fov: 44, near: 0.1, far: 500 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, powerPreference: 'high-performance' }}
              frameloop="always"
            >
              <Suspense fallback={<SceneLoader />}>
                <PortfolioScene />
              </Suspense>
            </Canvas>
          </WebGLBoundary>

          {!isMobile && (
            <div className="viewport-label">
              <span>Interactive model</span>
              <small>3D PORTFOLIO / EXPLORE</small>
            </div>
          )}

          {!isMobile && activeSection === 'overview' && (
            <div className="scene-intro">
              <p className="intro-kicker">Software Engineer · Portfolio</p>
              <h1>
                Dikri<br />
                <em>Ali</em>
              </h1>
              <p>Software engineer focused on building web applications, AI powered systems, and interactive 3D experiences through practical digital solutions.</p>
              <span className="intro-prompt">
                <i aria-hidden="true" /> Select a model node or use navigation
              </span>
            </div>
          )}

          {!isMobile && <SceneControls />}
          {import.meta.env.DEV && <CameraDevControls />}
          <p className="scene-hint">
            <span>Drag</span> orbit <span>Scroll</span> zoom <span>Right-drag</span> pan
          </p>
        </section>
      )}

      {/* Mobile Flat Card List Landing View (<768px default) */}
      {isMobile && !showMobile3D && !isPanelOpen && (
        <section className="mobile-flat-landing" aria-label="Mobile project catalog">
          {/* Bio Header */}
          <div className="mobile-bio-card">
            <span className="mobile-kicker">Software Engineer · Portfolio</span>
            <h1 className="mobile-bio-title">Dikri Ali</h1>
            <p className="mobile-bio-desc">
              Building enterprise systems, Computer Vision safety pipelines, cultural RAG engines, and interactive 3D Web experiences.
            </p>
            <button
              type="button"
              className="mobile-explore-3d-btn"
              onClick={() => setShowMobile3D(true)}
            >
              <Sparkles size={16} color="#c7f36b" />
              <span>🔍 Explore Interactive 3D Room</span>
            </button>
          </div>

          {/* Project Cards List */}
          <div className="mobile-projects-container">
            <div className="mobile-section-heading">
              <span>{isId ? 'PROYEK UNGGULAN' : 'FEATURED WORK'}</span>
              <small>{isId ? '04 PROYEK' : '04 PROJECTS'}</small>
            </div>

            {projectConfig.map((project) => {
              const IconComp = project.Icon
              return (
                <div
                  key={project.section}
                  className="mobile-project-card"
                  onClick={() => openSection(project.section)}
                >
                  <div className="mobile-card-top">
                    <div className="mobile-card-icon">
                      <IconComp size={20} color="#38bdf8" />
                    </div>
                    <div>
                      <span className="mobile-card-code">{project.code}</span>
                      <h2 className="mobile-card-title">{project.labels[language]}</h2>
                    </div>
                  </div>
                  <p className="mobile-card-tagline">{project.taglines[language]}</p>
                  <div className="mobile-card-cta">
                    <span>{isId ? 'Lihat Detail & Diagram Flow →' : 'View Project Details & Flow →'}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Project Detail Takeover Modal Layer */}
      <section id="main-content" className={`content-layer ${isMobile && isPanelOpen ? 'mobile-modal-takeover' : ''}`}>
        <PortfolioPanel />
      </section>

      <Tooltip />
      <LoadingOverlay />
      {!isMobile && <StatusBar />}
    </main>
  )
}

export default App
