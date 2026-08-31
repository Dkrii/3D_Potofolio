import { useState } from 'react'
import type { PortfolioSection } from '../../store/portfolioStore'
import { usePortfolioStore } from '../../store/portfolioStore'

const projects: { label: string; section: Exclude<PortfolioSection, 'overview' | 'about'>; code: string }[] = [
  { label: 'Computer Vision', section: 'computerVision', code: 'CV' },
  { label: 'BMS', section: 'bms', code: 'BM' },
  { label: 'Website', section: 'website', code: 'WB' },
  { label: 'Chatbot', section: 'chatbot', code: 'CB' },
]

export function Navigation() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const openSection = usePortfolioStore((state) => state.openSection)
  const closeSection = usePortfolioStore((state) => state.closeSection)
  const projectActive = projects.some((item) => item.section === activeSection)
  const [projectsOpen, setProjectsOpen] = useState(projectActive)

  return (
    <nav className="navigation" aria-label="Portfolio navigation">
      <p className="nav-label">Explore</p>
      <button className="nav-primary" type="button" aria-current={activeSection === 'overview' ? 'page' : undefined} onClick={closeSection}>
        <span className="nav-code">OV</span><span>Overview</span><i aria-hidden="true" />
      </button>
      <button className="nav-primary" type="button" aria-current={activeSection === 'about' ? 'page' : undefined} onClick={() => openSection('about')}>
        <span className="nav-code">AB</span><span>About</span><i aria-hidden="true" />
      </button>
      <div className="nav-group">
        <button className="nav-primary" type="button" aria-current={projectActive ? 'page' : undefined} aria-expanded={projectsOpen} aria-controls="project-navigation" onClick={() => setProjectsOpen((open) => !open)}>
          <span className="nav-code">PR</span><span>Projects</span><i aria-hidden="true" />
        </button>
        {projectsOpen && <div id="project-navigation" className="project-submenu">
          {projects.map((item) => <div className="project-nav-item" key={item.section}>
            <button type="button" aria-current={activeSection === item.section} onClick={() => openSection(item.section)}>
              <span>{item.code}</span>{item.label}
            </button>
          </div>)}
        </div>}
      </div>
    </nav>
  )
}
