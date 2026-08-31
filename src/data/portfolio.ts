import type { PortfolioSection } from '../store/portfolioStore'

export interface PortfolioContent {
  eyebrow: string
  title: string
  description: string
  items?: { title: string; detail: string }[]
  tags?: string[]
}

export const portfolioContent: Record<Exclude<PortfolioSection, 'overview'>, PortfolioContent> = {
  about: {
    eyebrow: 'About', title: 'Dikri Ali',
    description: 'Software Engineer focused on system integration, computer vision, and interactive 3D web visualization.',
  },
  computerVision: {
    eyebrow: 'Applied AI', title: 'Computer Vision',
    description: 'Computer vision workflows, integrations, and monitoring experiences.',
  },
  bms: {
    eyebrow: 'Interactive visualization', title: '3D / BMS',
    description: 'Interactive building management visualization.',
    items: [1, 2, 3, 4].map((part) => ({ title: `BMS Part ${part}`, detail: 'Details coming soon' })),
  },
  website: {
    eyebrow: 'Web development', title: 'Website',
    description: 'Website projects and interactive web experiences.',
  },
  chatbot: {
    eyebrow: 'AI project', title: 'PORTOFOLIO CHATBOT',
    description: 'Details coming soon.',
  },
}
