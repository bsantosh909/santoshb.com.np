import { WorkContent } from '#/features/work/lib/work-content'
import type { AccentName } from '#/features/design-system/lib/accent'

export interface Stat {
  value: string
  label: string
  accent: AccentName
}

export interface ToolkitCategory {
  title: string
  accent: AccentName
  items: ReadonlyArray<string>
}

export interface JourneyEntry {
  period: string
  role: string
  summary: string
  accent: AccentName
}

export class AboutContent {
  /** First public code — GitHub account creation (github.com/bsantosh909). */
  /** NOTE: My programming path started around 1.5 years before that */
  static readonly githubCareerStart = new Date('2016-11-11')

  /** Computed at build time (SSG) — refreshes on every deploy. */
  static stats(): ReadonlyArray<Stat> {
    const yearMs = 365.25 * 24 * 60 * 60 * 1000
    const years = Math.floor(
      (Date.now() - AboutContent.githubCareerStart.getTime()) / yearMs,
    )
    return [
      {
        value: `${years}+`,
        label: 'years engineering products',
        accent: 'orange',
      },
      {
        value: `${WorkContent.all().length}+`,
        label: 'products shipped',
        accent: 'blue',
      },
      { value: '∞', label: 'cups of tea', accent: 'amber' },
    ]
  }

  // Mirrors the skill taxonomy on github.com/bsantosh909.
  static readonly toolkit: ReadonlyArray<ToolkitCategory> = [
    {
      title: 'Languages',
      accent: 'orange',
      items: ['TypeScript', 'JavaScript', 'Python', 'Dart', 'SQL'],
    },
    {
      title: 'Frontend',
      accent: 'blue',
      items: [
        'React',
        'Next.js',
        'Vue.js',
        'Nuxt',
        'TanStack',
        'Redux',
        'Zustand',
        'Pinia',
        'Tailwind CSS',
        'Sass',
        'Storybook',
        'Vite',
      ],
    },
    {
      title: 'Backend & Data',
      accent: 'lime',
      items: [
        'Node.js',
        'Express',
        'NestJS',
        'GraphQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Prisma',
        'TypeORM',
        'Supabase',
        'Firebase',
      ],
    },
    {
      title: 'AI & Agents',
      accent: 'pink',
      items: ['Claude', 'OpenAI', 'MCP'],
    },
    {
      title: 'Tools & Platforms',
      accent: 'amber',
      items: [
        'AWS',
        'Docker',
        'RabbitMQ',
        'Git',
        'Cloudflare',
        'Vercel',
        'Netlify',
        'Cypress',
        'Vitest',
        'Postman',
        'Figma',
      ],
    },
  ]

  static readonly journey: ReadonlyArray<JourneyEntry> = [
    {
      period: '2026 - Onwards',
      role: 'Always building',
      summary:
        'Focused on creating products that solve real problems, from idea to deployment.',
      accent: 'blue',
    },
    {
      period: '2020',
      role: 'Open Source & Community',
      summary:
        'Started contributing to projects, learning from developers around the world.',
      accent: 'orange',
    },
    {
      period: '2018',
      role: 'Started professionally',
      summary: 'Fell for code, kept learning, started shipping.',
      accent: 'lime',
    },
    {
      period: '2010',
      role: 'Started programming',
      summary:
        'Got intrigued about how things actually work, so started exploring the depths',
      accent: 'pink',
    },
    {
      period: '2009',
      role: 'Introduced to Computer',
      summary:
        'Used Computer for the first ever time, always amazed by the powerful machine',
      accent: 'amber',
    },
  ]
}
