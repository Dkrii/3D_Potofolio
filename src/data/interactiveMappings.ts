import type { BmsPart, PortfolioSection } from '../store/portfolioStore'

export interface InteractiveMapping {
  section: Exclude<PortfolioSection, 'overview'>
  nodes: string[]
  nodeLabel: string
  label: string
  status: 'ACTIVE' | 'ONLINE'
  bmsPart?: BmsPart
}

export const interactiveMappings: InteractiveMapping[] = [
  { section: 'about', nodes: ['POTOFOLIO_ABOUT', 'PORTOFOLIO_ABOUT'], nodeLabel: 'PROFILE', label: 'About', status: 'ACTIVE' },
  { section: 'computerVision', nodes: ['POTOFOLIO_COMPUTER_VISION', 'PORTOFOLIO_COMPUTER_VISION'], nodeLabel: 'COMPUTER VISION', label: 'Computer Vision', status: 'ONLINE' },
  { section: 'website', nodes: ['POTOFOLIO_WEBSITE', 'PORTOFOLIO_WEBSITE'], nodeLabel: 'WEBSITE', label: 'Website', status: 'ONLINE' },
  { section: 'chatbot', nodes: ['POTOFOLIO_CHATBOT', 'PORTOFOLIO_CHATBOT'], nodeLabel: 'CHATBOT', label: 'Chatbot', status: 'ONLINE' },
  { section: 'bms', bmsPart: 1, nodes: ['POTOFOLIO_MINIATURE_01', 'PORTOFOLIO_MINIATURE_01'], nodeLabel: 'BMS PART 1', label: 'BMS Part 1', status: 'ACTIVE' },
  { section: 'bms', bmsPart: 2, nodes: ['POTOFOLIO_MINIATURE_02', 'PORTOFOLIO_MINIATURE_02'], nodeLabel: 'BMS PART 2', label: 'BMS Part 2', status: 'ACTIVE' },
  { section: 'bms', bmsPart: 3, nodes: ['POTOFOLIO_MINIATURE_03', 'PORTOFOLIO_MINIATURE_03'], nodeLabel: 'BMS PART 3', label: 'BMS Part 3', status: 'ACTIVE' },
  { section: 'bms', bmsPart: 4, nodes: ['POTOFOLIO_MINIATURE_04', 'PORTOFOLIO_MINIATURE_04'], nodeLabel: 'BMS PART 4', label: 'BMS Part 4', status: 'ACTIVE' },
]
