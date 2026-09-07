import { useState } from 'react'
import { FileText, GitBranch, Menu, X, CheckCircle2, Activity } from 'lucide-react'
import { usePortfolioStore } from '../../store/portfolioStore'

export function DashboardHeader() {
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="dashboard-header">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="skip-to-content"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '10px',
          background: '#c7f36b',
          color: '#080c0b',
          padding: '6px 12px',
          zIndex: 100,
          fontWeight: 700,
          borderRadius: '4px',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => (e.target.style.top = '10px')}
        onBlur={(e) => (e.target.style.top = '-40px')}
      >
        Skip to Content
      </a>

      {/* Brand Identity */}
      <div className="header-identity" onClick={closeSection} style={{ cursor: 'pointer' }}>
        <strong>DIKRI ALI</strong>
        <span>Software Engineer / Model-led Portfolio</span>
      </div>

      {/* Desktop Multi-action Header Bar */}
      <div className="desktop-header-actions">
        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span>AVAILABLE FOR HIRE</span>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
          className="header-ghost-btn"
        >
          <GitBranch size={15} color="#94a3b8" />
          <span>GitHub</span>
        </a>

        <a
          href="/CV_Dikri_Ali.pdf"
          download="CV_Dikri_Ali.pdf"
          aria-label="Download CV Document"
          className="header-primary-btn"
        >
          <FileText size={14} color="#080c0b" />
          <span>Download CV</span>
        </a>
      </div>

      {/* Mobile Single Menu Icon (<768px) */}
      <button
        className="mobile-menu-btn"
        type="button"
        aria-label="Open actions menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} color="#38bdf8" /> : <Menu size={20} color="#38bdf8" />}
      </button>

      {/* Mobile Compact Dropdown / Sheet */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <span>QUICK ACTIONS</span>
              <button type="button" onClick={() => setMobileMenuOpen(false)} style={{ background: 'transparent', border: 0, color: '#94a3b8' }}>
                <X size={18} />
              </button>
            </div>

            <div className="mobile-sheet-status">
              <CheckCircle2 size={16} color="#4ade80" />
              <span>Available for Hire (Full-time / Contract)</span>
            </div>

            <div className="mobile-sheet-links">
              <a
                href="/CV_Dikri_Ali.pdf"
                download="CV_Dikri_Ali.pdf"
                className="mobile-sheet-cv-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={16} color="#080c0b" />
                <span>Download CV (ATS)</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="mobile-sheet-github-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <GitBranch size={16} color="#38bdf8" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function StatusBar() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)
  const closeSection = usePortfolioStore((state) => state.closeSection)

  const sectionNames: Record<string, string> = {
    overview: 'Overview', about: 'About', computerVision: 'Computer Vision', bms: 'BMS', website: 'Website', chatbot: 'Chatbot',
  }

  return (
    <footer className="status-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span className="connected"><i />System Online</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={14} color="#38bdf8" />
          {isSceneReady ? 'WebGL Model Ready (60 FPS)' : 'Loading 3D Engine...'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
        <span style={{ color: '#94a3b8', fontSize: '0.68rem' }}>💡 Click 3D Building objects to inspect</span>
        {activeSection !== 'overview' && (
          <button
            type="button"
            onClick={closeSection}
            aria-label="Back to Overview"
            style={{
              background: 'rgba(56, 189, 248, 0.2)',
              color: '#38bdf8',
              border: '1px solid #38bdf8',
              padding: '2px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.65rem',
              fontWeight: 600,
            }}
          >
            ← Back to Overview
          </button>
        )}
        <span className="current-section">Section: <strong style={{ color: '#38bdf8' }}>{sectionNames[activeSection] ?? activeSection}</strong></span>
      </div>
    </footer>
  )
}
