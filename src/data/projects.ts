export type ProjectId = 'inatos' | 'validador-contraste'

export type Project = {
  id: ProjectId
  year: string
  stack: readonly string[]
  caseHref?: string
  liveHref?: string
  codeHref?: string
  inProduction: boolean
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'inatos',
    year: '2026',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind v4', 'Radix UI', 'Recharts'],
    caseHref: '/inatos',
    inProduction: true,
  },
  {
    id: 'validador-contraste',
    year: '2026',
    stack: ['TypeScript', 'OKLCH', 'OKLab', 'WCAG 2.1', 'Node'],
    liveHref: '/inatos#contraste',
    inProduction: true,
  },
]
