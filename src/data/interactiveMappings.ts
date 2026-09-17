import type { PortfolioSection } from '../store/portfolioStore'

export interface InteractiveMapping {
  section: Exclude<PortfolioSection, 'overview'>
  nodes: string[]
  nodeLabel: string
  label: string
  status: 'ACTIVE' | 'ONLINE'
}

export const interactiveMappings: InteractiveMapping[] = [
  { section: 'about', nodes: ['POTOFOLIO_ABOUT', 'PORTOFOLIO_ABOUT'], nodeLabel: 'PROFILE', label: 'About', status: 'ACTIVE' },
  { section: 'computerVision', nodes: ['POTOFOLIO_COMPUTER_VISION', 'PORTOFOLIO_COMPUTER_VISION'], nodeLabel: 'COMPUTER VISION', label: 'Computer Vision', status: 'ONLINE' },
  { section: 'website', nodes: ['POTOFOLIO_WEBSITE', 'PORTOFOLIO_WEBSITE'], nodeLabel: 'WEBSITE', label: 'Website', status: 'ONLINE' },
  { section: 'chatbot', nodes: ['POTOFOLIO_CHATBOT', 'PORTOFOLIO_CHATBOT'], nodeLabel: 'CHATBOT', label: 'Chatbot', status: 'ONLINE' },
  { section: 'bms', nodes: ['POTOFOLIO_MINIATURE_01', 'PORTOFOLIO_MINIATURE_01', 'POTOFOLIO_MINIATURE_02', 'PORTOFOLIO_MINIATURE_02', 'POTOFOLIO_MINIATURE_03', 'PORTOFOLIO_MINIATURE_03'], nodeLabel: 'BMS', label: 'BMS', status: 'ACTIVE' },
]
