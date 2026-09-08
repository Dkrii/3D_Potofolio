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
    <nav className="navigation" aria-label="Portfolio navigation">
      <p className="nav-label">{navLabels.nav}</p>

      {/* Overview */}
      <button
        className="nav-primary"
        type="button"
        aria-current={activeSection === 'overview' ? 'page' : undefined}
        onClick={closeSection}
        title={navLabels.overview}
      >
        <Home size={18} className="nav-icon" color={activeSection === 'overview' ? '#c7f36b' : '#38bdf8'} />
        <span className="nav-text">{navLabels.overview}</span>
      </button>

      {/* About Me */}
      <button
        className="nav-primary"
        type="button"
        aria-current={activeSection === 'about' ? 'page' : undefined}
        onClick={() => openSection('about')}
        title={navLabels.about}
      >
        <User size={18} className="nav-icon" color={activeSection === 'about' ? '#c7f36b' : '#38bdf8'} />
        <span className="nav-text">{navLabels.about}</span>
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
          title={navLabels.projects}
        >
          <Rocket size={18} className="nav-icon" color={projectActive ? '#c7f36b' : '#38bdf8'} />
          <span className="nav-text">{navLabels.projects}</span>
        </button>

        {projectsOpen && (
          <div id="project-navigation" className="project-submenu">
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
                    title={item.labels[language]}
                  >
                    <ItemIcon size={15} className="nav-icon" color={isActive ? '#c7f36b' : '#38bdf8'} />
                    <span className="nav-text">{item.labels[language]}</span>
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
