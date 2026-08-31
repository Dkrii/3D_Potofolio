import { usePortfolioStore } from '../../store/portfolioStore'

const sectionNames = {
  overview: 'Overview', about: 'About', computerVision: 'Computer Vision', bms: 'BMS', website: 'Website', chatbot: 'Chatbot',
}

export function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <div className="header-identity"><strong>DIKRI ALI</strong><span>Software Engineer / Model-led Portfolio</span></div>
      <div className="system-online"><i aria-hidden="true" /><span>3D model</span><strong>ACTIVE</strong></div>
    </header>
  )
}

export function StatusPanel() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  return (
    <aside className="status-panel" aria-label="Portfolio status">
      <div className="panel-heading"><span>Portfolio Status</span><small>SYS-01</small></div>
      <dl className="status-summary">
        <div><dt>Portfolio</dt><dd className="status-active">Available</dd></div>
        <div><dt>Interface</dt><dd>3D + Navigation</dd></div>
        <div><dt>Current View</dt><dd>{sectionNames[activeSection]}</dd></div>
      </dl>
      <div className="panel-heading subsystem-heading"><span>Focus areas</span><small>03 AREAS</small></div>
      <ul className="subsystem-list">
        <li><span><i />Computer Vision</span><strong>Explore</strong></li>
        <li><span><i />BMS</span><strong>4 Parts</strong></li>
        <li><span><i />Website</span><strong>Explore</strong></li>
      </ul>
      <div className="status-note"><span>Experience</span><strong>3D PORTFOLIO</strong><small>Select model elements to open focused project sections</small></div>
    </aside>
  )
}

export function StatusBar() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const isSceneReady = usePortfolioStore((state) => state.isSceneReady)
  return (
    <footer className="status-bar">
      <span className="connected"><i />Connected</span>
      <span>{isSceneReady ? 'Model Loaded' : 'Model Loading'}</span>
      <span>Render: Demand</span>
      <span className="current-section">Current Section: <strong>{sectionNames[activeSection]}</strong></span>
    </footer>
  )
}
