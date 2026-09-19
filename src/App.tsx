import { Suspense, lazy, useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Sparkles, ArrowLeft, Monitor, X } from 'lucide-react'
import './App.css'
import { Navigation, projectConfig } from './components/navigation/Navigation'
import { DashboardHeader, StatusBar } from './components/ui/DashboardChrome'
import { LoadingOverlay, Mobile3DLoader, SceneLoader } from './components/ui/Loading'
import { Tooltip } from './components/ui/Tooltip'
import { usePortfolioStore } from './store/portfolioStore'
import { useCameraDevStore } from './store/cameraDevStore'

const SceneCanvas = lazy(() => import('./components/SceneCanvas').then((m) => ({ default: m.SceneCanvas })))
const PortfolioPanel = lazy(() => import('./components/panels/PortfolioPanel').then((m) => ({ default: m.PortfolioPanel })))

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
  const [sceneBooted, setSceneBooted] = useState(false)

  // Mobile First-Time Recommendation Modal State (Show when in mobile view)
  const [showMobileNotice, setShowMobileNotice] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.innerWidth >= 768) return false
    try {
      return !window.sessionStorage.getItem('mobile-notice-dismissed')
    } catch {
      return true
    }
  })
  const prevIsMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const [isClosingNotice, setIsClosingNotice] = useState(false)
  const noticeCloseTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      const wasMobile = prevIsMobileRef.current
      prevIsMobileRef.current = mobile
      setIsMobile(mobile)
      useCameraDevStore.getState().setViewportMode(mobile ? 'mobile' : 'desktop')

      // Only show on desktop -> mobile transition, never on mobile -> mobile
      // (scroll triggers resize via address bar, must not retrigger modal)
      if (!mobile) {
        setShowMobileNotice(false)
        try {
          window.sessionStorage.removeItem('mobile-notice-dismissed')
        } catch {
          /* ponytail: storage unavailable, modal shows every entry */
        }
      } else if (!wasMobile) {
        let dismissed = false
        try {
          dismissed = !!window.sessionStorage.getItem('mobile-notice-dismissed')
        } catch {
          /* ponytail: storage unavailable, modal shows every entry */
        }
        if (!dismissed) setShowMobileNotice(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile && (!showMobile3D || isPanelOpen)) {
      const resetTimer = window.setTimeout(() => setSceneBooted(false), 0)
      return () => window.clearTimeout(resetTimer)
    }

    const bootTimer = window.setTimeout(() => setSceneBooted(true), isMobile ? 0 : 1200)
    return () => window.clearTimeout(bootTimer)
  }, [isMobile, isPanelOpen, showMobile3D])

  const dismissMobileNotice = useCallback((launch3D = false) => {
    if (isClosingNotice || !showMobileNotice) return
    setIsClosingNotice(true)
    if (noticeCloseTimeoutRef.current) {
      window.clearTimeout(noticeCloseTimeoutRef.current)
    }
    noticeCloseTimeoutRef.current = window.setTimeout(() => {
      setShowMobileNotice(false)
      setIsClosingNotice(false)
      try {
        window.sessionStorage.setItem('mobile-notice-dismissed', '1')
      } catch {
        /* ponytail: storage unavailable, modal shows every entry */
      }
      if (launch3D) {
        setShowMobile3D(true)
      }
    }, 200) // match noticeOut duration
  }, [isClosingNotice, showMobileNotice])

  useEffect(() => {
    return () => {
      if (noticeCloseTimeoutRef.current) {
        window.clearTimeout(noticeCloseTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!showMobileNotice || isClosingNotice) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissMobileNotice(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showMobileNotice, isClosingNotice, dismissMobileNotice])

  // If on desktop, reset showMobile3D
  const shouldShowSceneWorkspace = !isMobile || (showMobile3D && !isPanelOpen)

  return (
    <main className="app-shell" style={{ '--scene-overlay': overlay } as CSSProperties}>
      <DashboardHeader />

      {/* Mobile Desktop Recommendation Pop-up Modal */}
      {showMobileNotice && (
        <div
          className={`mobile-notice-backdrop ${isClosingNotice ? 'notice-exit' : 'notice-enter'}`}
          onClick={() => dismissMobileNotice(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-notice-title"
        >
          <div
            className={`mobile-notice-card ${isClosingNotice ? 'notice-card-exit' : 'notice-card-enter'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="mobile-notice-close-btn"
              onClick={() => dismissMobileNotice(false)}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>

            <div className="mobile-notice-icon-wrapper notice-stagger" style={{ '--notice-delay': '60ms' } as CSSProperties}>
              <Monitor size={28} color="#38bdf8" />
            </div>

            <span className="mobile-notice-badge notice-stagger" style={{ '--notice-delay': '110ms' } as CSSProperties}>OPTIMAL VIEW RECOMMENDATION</span>
            <h3 className="mobile-notice-title notice-stagger" id="mobile-notice-title" style={{ '--notice-delay': '160ms' } as CSSProperties}>Pengalaman Terbaik di Desktop</h3>

            <p className="mobile-notice-text notice-stagger" style={{ '--notice-delay': '210ms' } as CSSProperties}>
              Website ini dilengkapi <strong>Interactive 3D WebGL Room & Spatial Camera</strong> yang dirancang maksimal untuk layar <strong>Desktop / Laptop</strong>.
            </p>

            <div className="mobile-notice-actions notice-stagger" style={{ '--notice-delay': '260ms' } as CSSProperties}>
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
      {shouldShowSceneWorkspace && (
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

          {sceneBooted && (
            <Suspense fallback={isMobile ? <Mobile3DLoader /> : <SceneLoader />}>
              <SceneCanvas isMobile={isMobile} isSceneReady={isSceneReady} />
            </Suspense>
          )}

          {isMobile && showMobile3D && !isSceneReady && <Mobile3DLoader />}

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
        <Suspense fallback={null}>
          <PortfolioPanel />
        </Suspense>
      </section>

      <Tooltip />
      <LoadingOverlay />
      {!isMobile && <StatusBar />}
    </main>
  )
}

export default App
