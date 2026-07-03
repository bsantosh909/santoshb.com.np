import type { AccentName } from '#/features/design-system/lib/accent'

export interface Skill {
  label: string
  accent: AccentName
}

export class Skills {
  /** Headline stack for the home marquee (full inventory lives in AboutContent.toolkit). */
  static readonly marquee: ReadonlyArray<Skill> = [
    { label: 'TypeScript', accent: 'lime' },
    { label: 'JavaScript', accent: 'orange' },
    { label: 'React', accent: 'amber' },
    { label: 'Next.js', accent: 'pink' },
    { label: 'Vue.js', accent: 'blue' },
    { label: 'Nuxt', accent: 'lime' },
    { label: 'Node.js', accent: 'orange' },
    { label: 'NestJS', accent: 'amber' },
    { label: 'GraphQL', accent: 'pink' },
    { label: 'PostgreSQL', accent: 'blue' },
    { label: 'MongoDB', accent: 'lime' },
    { label: 'Redis', accent: 'orange' },
    { label: 'Tailwind CSS', accent: 'amber' },
    { label: 'Docker', accent: 'pink' },
    { label: 'AWS', accent: 'blue' },
    { label: 'Claude', accent: 'lime' },
  ]
}
