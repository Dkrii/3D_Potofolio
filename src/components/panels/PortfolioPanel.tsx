import { portfolioContent } from '../../data/portfolio'
import type { BmsPart } from '../../store/portfolioStore'
import { usePortfolioStore } from '../../store/portfolioStore'

const sectionIds = { about: 'SEC-01', computerVision: 'SEC-02', bms: 'SEC-03', website: 'SEC-04', chatbot: 'SEC-05' }
const bmsParts: BmsPart[] = [1, 2, 3, 4]

export function PortfolioPanel() {
  const activeSection = usePortfolioStore((state) => state.activeSection)
  const activeBmsPart = usePortfolioStore((state) => state.activeBmsPart)
  const isPanelOpen = usePortfolioStore((state) => state.isPanelOpen)
  const setBmsPart = usePortfolioStore((state) => state.setBmsPart)
  const closeSection = usePortfolioStore((state) => state.closeSection)

  if (!isPanelOpen || activeSection === 'overview') return null
  const content = portfolioContent[activeSection]

  return (
    <aside className="portfolio-panel" aria-labelledby="panel-title">
      <div className="detail-header">
        <span>{sectionIds[activeSection]} / DETAIL VIEW</span>
        <button className="panel-close" type="button" onClick={closeSection} aria-label="Close detail panel">×</button>
      </div>
      <div className="detail-status"><i /><span>Portfolio section</span></div>
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 id="panel-title">{content.title}</h1>
      <div className="detail-block"><h2>Description</h2><p className="panel-description">{content.description}</p></div>
      {activeSection === 'bms' && (
        <div className="detail-block">
          <h2>Select BMS part</h2>
          <div className="bms-part-controls" aria-label="BMS part selector">
            {bmsParts.map((part) => <button key={part} type="button" aria-pressed={activeBmsPart === part} onClick={() => setBmsPart(part)}>Part {String(part).padStart(2, '0')}</button>)}
          </div>
          <p className="bms-part-state" aria-live="polite">{activeBmsPart ? `Part ${String(activeBmsPart).padStart(2, '0')} selected · Details coming soon` : 'Choose Part 01–04 to inspect its model segment.'}</p>
        </div>
      )}
      {content.tags && <div className="detail-block"><h2>Stack / Capabilities</h2><ul className="tag-list">{content.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>}
      {activeSection !== 'bms' && content.items && <div className="detail-block"><h2>Selected work</h2><ul className="project-list">{content.items.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.detail}</span></li>)}</ul></div>}
    </aside>
  )
}
