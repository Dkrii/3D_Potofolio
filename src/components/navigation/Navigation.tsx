import { useState } from 'react'
import {
  Home,
  User,
  Rocket,
  Eye,
  Building2,
  Globe,
  MessageSquareCode,
} from 'lucide-react'
import type { PortfolioSection } from '../../store/portfolioStore'
import { usePortfolioStore } from '../../store/portfolioStore'

// Driven by config array: Dies Management -> Computer Vision -> Chatbot Sunda -> BMS Digital Twin
export const projectConfig: { label: string; section: Exclude<PortfolioSection, 'overview' | 'about'>; code: string; Icon: typeof Eye; tagline: string }[] = [
  { label: 'Dies Management', section: 'website', code: 'WB', Icon: Globe, tagline: 'Enterprise manufacturing dies tracking & preventive maintenance' },
  { label: 'Computer Vision', section: 'computerVision', code: 'CV', Icon: Eye, tagline: 'AI-powered PPE safety inspection & live stream detection' },
  { label: 'Chatbot Sunda RAG', section: 'chatbot', code: 'CB', Icon: MessageSquareCode, tagline: 'Cultural NLP & Paribasa Sunda RAG search engine' },
  { label: '3D BMS Digital Twin', section: 'bms', code: 'BM', Icon: Building2, tagline: 'Interactive 3D building visualization & telemetry dashboard' },
]

export function Navigation() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const openSection = usePortfolioStore((state) => state.openSection)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const projectActive = projectConfig.some((item) => item.section === activeSection)
  const [projectsOpen, setProjectsOpen] = useState(true)

  return (
    <nav className="navigation" aria-label="Portfolio navigation" style={{ padding: '24px 14px' }}>
      <p className="nav-label" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: '16px', color: '#64748b' }}>NAVIGATION</p>

      {/* Overview */}
      <button
        className="nav-primary"
        type="button"
        aria-current={activeSection === 'overview' ? 'page' : undefined}
        onClick={closeSection}
        style={{
          padding: '10px 12px',
          margin: '3px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: activeSection === 'overview' ? '#c7f36b' : '#94a3b8',
        }}
      >
        <Home size={18} color={activeSection === 'overview' ? '#c7f36b' : '#38bdf8'} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.9rem', fontWeight: activeSection === 'overview' ? 700 : 500 }}>Overview</span>
      </button>

      {/* About Me */}
      <button
        className="nav-primary"
        type="button"
        aria-current={activeSection === 'about' ? 'page' : undefined}
        onClick={() => openSection('about')}
        style={{
          padding: '10px 12px',
          margin: '3px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: activeSection === 'about' ? '#c7f36b' : '#94a3b8',
        }}
      >
        <User size={18} color={activeSection === 'about' ? '#c7f36b' : '#38bdf8'} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.9rem', fontWeight: activeSection === 'about' ? 700 : 500 }}>About Me</span>
      </button>

      {/* Projects */}
      <div className="nav-group">
        <button
          className="nav-primary"
          type="button"
          aria-current={projectActive ? 'page' : undefined}
          aria-expanded={projectsOpen}
          aria-controls="project-navigation"
          onClick={() => setProjectsOpen((open) => !open)}
          style={{
            padding: '10px 12px',
            margin: '3px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: projectActive ? '#c7f36b' : '#94a3b8',
          }}
        >
          <Rocket size={18} color={projectActive ? '#c7f36b' : '#38bdf8'} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.9rem', fontWeight: projectActive ? 700 : 500 }}>Projects</span>
        </button>

        {projectsOpen && (
          <div id="project-navigation" className="project-submenu" style={{ margin: '4px 0 8px 12px', paddingLeft: '12px', borderLeft: '1px solid rgba(56, 189, 248, 0.2)' }}>
            {projectConfig.map((item) => {
              const isActive = activeSection === item.section
              const ItemIcon = item.Icon
              return (
                <div className="project-nav-item" key={item.section}>
                  <button
                    type="button"
                    aria-current={isActive}
                    onClick={() => openSection(item.section)}
                    style={{
                      fontSize: '0.84rem',
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: isActive ? '#38bdf8' : '#cbd5e1',
                      fontWeight: isActive ? 700 : 500,
                      background: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ItemIcon size={16} color="#38bdf8" style={{ opacity: isActive ? 1 : 0.7, flexShrink: 0 }} />
                    {item.label}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
