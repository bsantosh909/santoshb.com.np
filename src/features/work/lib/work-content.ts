import { z } from 'zod'
import type { ComponentType } from 'react'

const accentSchema = z.enum(['orange', 'blue', 'lime', 'amber', 'pink'])

const frontmatterSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  summary: z.string().min(1),
  accent: accentSchema,
  order: z.number().int(),
  featured: z.boolean().default(false),
  kind: z.enum(['professional', 'personal']).default('professional'),
  cover: z.boolean().default(true),
  role: z.string().optional(),
  period: z
    .string()
    .optional()
    .transform((value) => (value ? value : undefined)),
  stack: z.array(z.string()).default([]),
  tags: z
    .array(z.object({ label: z.string(), accent: accentSchema }))
    .default([]),
  draft: z.boolean().default(false),
})

export type ProjectFrontmatter = z.infer<typeof frontmatterSchema>
export type ProjectTag = ProjectFrontmatter['tags'][number]

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string
}

export interface ProjectEntry {
  meta: ProjectMeta
  Component: ComponentType<{ components?: Record<string, ComponentType> }>
}

interface ProjectModule {
  default: ProjectEntry['Component']
  frontmatter: unknown
}

const modules = import.meta.glob<ProjectModule>('../../../content/work/*.mdx', {
  eager: true,
})

export class WorkContent {
  static #projects: ProjectEntry[] = Object.entries(modules)
    .map(([path, mod]) => WorkContent.#parse(path, mod))
    .filter((project) => !project.meta.draft || import.meta.env.DEV)
    .sort((a, b) => a.meta.order - b.meta.order)

  static #parse(path: string, mod: ProjectModule): ProjectEntry {
    const parsed = frontmatterSchema.safeParse(mod.frontmatter)
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${path}: ${parsed.error.message}`)
    }
    const slug = path.replace(/^.*\//, '').replace(/\.mdx$/, '')
    return { meta: { ...parsed.data, slug }, Component: mod.default }
  }

  static all(): ReadonlyArray<ProjectMeta> {
    return WorkContent.#projects.map((project) => project.meta)
  }

  static featured(): ReadonlyArray<ProjectMeta> {
    return WorkContent.all().filter((project) => project.featured)
  }

  static byKind(kind: ProjectMeta['kind']): ReadonlyArray<ProjectMeta> {
    return WorkContent.all().filter((project) => project.kind === kind)
  }

  static get(slug: string): ProjectEntry | undefined {
    return WorkContent.#projects.find((project) => project.meta.slug === slug)
  }
}
