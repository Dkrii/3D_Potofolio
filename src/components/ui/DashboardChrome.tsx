import { useState } from 'react'
import { FileText, GitBranch, Menu, X, CheckCircle2, Activity, Languages } from 'lucide-react'
import { usePortfolioStore } from '../../store/portfolioStore'

export function DashboardHeader() {
  const language = usePortfolioStore((state) => state.language)
  const setLanguage = usePortfolioStore((state) => state.setLanguage)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isId = language === 'id'

  return (
    <header className="dashboard-header">
      {/* Brand Identity */}
      <div className="header-identity" onClick={closeSection} style={{ cursor: 'pointer' }}>
        <strong>DIKRI ALI</strong>
        <span>Software Engineer / Model-led Portfolio</span>
      </div>

      {/* Desktop Multi-action Header Bar (Sisi Kanan) */}
      <div className="desktop-header-actions" style={{ marginLeft: 'auto' }}>
        {/* Language Switcher Pill (Paling Kiri di Bar Kanan) */}
        <div
          className="lang-switcher-pill"
          role="group"
          aria-label="Language Switcher"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '2px 4px',
            gap: '2px',
          }}
        >
          <Languages size={14} color="#94a3b8" style={{ marginLeft: '4px', marginRight: '2px' }} />
          <button
            type="button"
            className={`lang-btn ${language === 'id' ? 'active' : ''}`}
            onClick={() => setLanguage('id')}
            style={{
              background: language === 'id' ? '#38bdf8' : 'transparent',
              color: language === 'id' ? '#080c0b' : '#94a3b8',
              border: 0,
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '0.72rem',
              fontWeight: language === 'id' ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            ID
          </button>
          <button
            type="button"
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            style={{
              background: language === 'en' ? '#38bdf8' : 'transparent',
              color: language === 'en' ? '#080c0b' : '#94a3b8',
              border: 0,
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '0.72rem',
              fontWeight: language === 'en' ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            EN
          </button>
        </div>

        <div className="status-badge">
          <span className="pulse-dot"></span>
          <span>{isId ? 'TERSEDIA UNTUK KERJA' : 'AVAILABLE FOR HIRE'}</span>
        </div>

        <a
          href="https://github.com/dkrii"
          target="_blank"
          rel="noopener noreferrer"
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
          <span>{isId ? 'Unduh CV' : 'Download CV'}</span>
        </a>
      </div>

      {/* Mobile Single Menu Icon (<768px) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        
        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Open actions menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} color="#38bdf8" /> : <Menu size={20} color="#38bdf8" />}
        </button>
      </div>

      {/* Mobile Compact Dropdown / Sheet */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-header">
              <span>{isId ? 'MENU CEPAT' : 'QUICK ACTIONS'}</span>
              <button type="button" onClick={() => setMobileMenuOpen(false)} style={{ background: 'transparent', border: 0, color: '#94a3b8' }}>
                <X size={18} />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', margin: '6px 0 12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Languages size={15} color="#38bdf8" />
                {isId ? 'Bahasa / Language' : 'Language / Bahasa'}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  style={{
                    background: language === 'id' ? '#38bdf8' : 'rgba(255, 255, 255, 0.06)',
                    color: language === 'id' ? '#080c0b' : '#94a3b8',
                    border: 0,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  style={{
                    background: language === 'en' ? '#38bdf8' : 'rgba(255, 255, 255, 0.06)',
                    color: language === 'en' ? '#080c0b' : '#94a3b8',
                    border: 0,
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  EN
                </button>
              </div>
            </div>

            <div className="mobile-sheet-status">
              <CheckCircle2 size={16} color="#4ade80" />
              <span>{isId ? 'Tersedia untuk Kerja (Full-time / Kontrak)' : 'Available for Hire (Full-time / Contract)'}</span>
            </div>

            <div className="mobile-sheet-links">
              <a
                href="/CV_Dikri_Ali.pdf"
                download="CV_Dikri_Ali.pdf"
                className="mobile-sheet-cv-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={16} color="#080c0b" />
                <span>{isId ? 'Unduh CV' : 'Download CV'}</span>
              </a>

              <a
                href="https://github.com/dkrii"
                target="_blank"
                rel="noopener noreferrer"
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
