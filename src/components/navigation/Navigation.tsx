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
import type { PortfolioSection, Language } from '../../store/portfolioStore'
import { usePortfolioStore } from '../../store/portfolioStore'

export interface ProjectConfigItem {
  section: Exclude<PortfolioSection, 'overview' | 'about'>
  code: string
  Icon: typeof Eye
  labels: Record<Language, string>
  taglines: Record<Language, string>
}

// Driven by config array: Dies Management -> Computer Vision -> Chatbot Sunda -> BMS Digital Twin
export const projectConfig: ProjectConfigItem[] = [
  {
    section: 'website',
    code: 'WB',
    Icon: Globe,
    labels: {
      id: 'Dies Management',
      en: 'Dies Management',
    },
    taglines: {
      id: 'Pelacakan siklus hidup dies manufaktur & preventive maintenance',
      en: 'Enterprise manufacturing dies tracking & preventive maintenance',
    },
  },
  {
    section: 'computerVision',
    code: 'CV',
    Icon: Eye,
    labels: {
      id: 'Computer Vision',
      en: 'Computer Vision',
    },
    taglines: {
      id: 'Inspeksi keselamatan APD bertenaga AI & deteksi live stream',
      en: 'AI-powered PPE safety inspection & live stream detection',
    },
  },
  {
    section: 'chatbot',
    code: 'CB',
    Icon: MessageSquareCode,
    labels: {
      id: 'Chatbot Sunda RAG',
      en: 'Chatbot Sunda RAG',
    },
    taglines: {
      id: 'Mesin pencarian RAG NLP & pelestarian Paribasa Sunda',
      en: 'Cultural NLP & Paribasa Sunda RAG search engine',
    },
  },
  {
    section: 'bms',
    code: 'BM',
    Icon: Building2,
    labels: {
      id: '3D BMS Digital Twin',
      en: '3D BMS Digital Twin',
    },
    taglines: {
      id: 'Visualisasi 3D gedung interaktif & dashboard telemetri IoT',
      en: 'Interactive 3D building visualization & telemetry dashboard',
    },
  },
]

export function Navigation() {
  const language = usePortfolioStore((state) => state.language)
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const openSection = usePortfolioStore((state) => state.openSection)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const projectActive = projectConfig.some((item) => item.section === activeSection)
  const [projectsOpen, setProjectsOpen] = useState(true)

  const navLabels = {
    id: { nav: 'NAVIGASI', overview: 'Ringkasan', about: 'Tentang Saya', projects: 'Daftar Proyek' },
    en: { nav: 'NAVIGATION', overview: 'Overview', about: 'About Me', projects: 'Projects' },
  }[language]

  return (
    <nav className="navigation" aria-label="Portfolio navigation" style={{ padding: '24px 14px' }}>
      <p className="nav-label" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: '16px', color: '#64748b' }}>{navLabels.nav}</p>

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
        <span style={{ fontSize: '0.9rem', fontWeight: activeSection === 'overview' ? 700 : 500 }}>{navLabels.overview}</span>
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
        <span style={{ fontSize: '0.9rem', fontWeight: activeSection === 'about' ? 700 : 500 }}>{navLabels.about}</span>
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
          <span style={{ fontSize: '0.9rem', fontWeight: projectActive ? 700 : 500 }}>{navLabels.projects}</span>
        </button>

        {projectsOpen && (
          <div id="project-navigation" className="project-submenu" style={{ margin: '4px 0 8px 12px', paddingLeft: '12px', borderLeft: '1px solid rgba(56, 189, 248, 0.2)' }}>
            {projectConfig.map((item) => {
              const isActive = activeSection === item.section
              const ItemIcon = item.Icon
              return (
                <div className="project-nav-item" key={item.section}>
                  <button
                    className="nav-sub-btn"
                    type="button"
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => openSection(item.section)}
                    style={{
                      padding: '8px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: isActive ? '#c7f36b' : '#cbd5e1',
                    }}
                  >
                    <ItemIcon size={15} color={isActive ? '#c7f36b' : '#38bdf8'} style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 600 : 400 }}>{item.labels[language]}</span>
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
