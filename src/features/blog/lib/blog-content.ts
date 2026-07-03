import { z } from 'zod'
import type { ComponentType } from 'react'

const frontmatterSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  author: z.string().default('Santosh Bhandari'),
  summary: z.string().min(1),
  banner: z.string().optional(),
  tags: z.array(z.string()).default([]),
  created: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
})

export type PostFrontmatter = z.infer<typeof frontmatterSchema>

export interface ReadingTime {
  minutes: number
  words: number
  text: string
}

export interface TocEntry {
  depth: 2 | 3
  text: string
  id: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  readingTime: ReadingTime
}

export interface Post {
  meta: PostMeta
  toc: ReadonlyArray<TocEntry>
  Component: ComponentType<{ components?: Record<string, ComponentType> }>
}

interface PostModule {
  default: Post['Component']
  frontmatter: unknown
  readingTime: ReadingTime
  toc: ReadonlyArray<TocEntry>
}

const modules = import.meta.glob<PostModule>('../../../content/blog/*.mdx', {
  eager: true,
})

export class BlogContent {
  static #posts: Post[] = Object.entries(modules)
    .map(([path, mod]) => BlogContent.#parse(path, mod))
    .filter((post) => !post.meta.draft || import.meta.env.DEV)
    .sort((a, b) => b.meta.created.getTime() - a.meta.created.getTime())

  static #parse(path: string, mod: PostModule): Post {
    const parsed = frontmatterSchema.safeParse(mod.frontmatter)
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in ${path}: ${parsed.error.message}`)
    }
    return {
      meta: {
        ...parsed.data,
        slug: BlogContent.#slugFromPath(path),
        readingTime: mod.readingTime,
      },
      toc: mod.toc,
      Component: mod.default,
    }
  }

  static #slugFromPath(path: string): string {
    return path.replace(/^.*\//, '').replace(/\.mdx$/, '')
  }

  /** Published posts, newest first (drafts included in dev). */
  static all(): PostMeta[] {
    return BlogContent.#posts.map((post) => post.meta)
  }

  static get(slug: string): Post | undefined {
    return BlogContent.#posts.find((post) => post.meta.slug === slug)
  }

  /** Neighbors in publish order (posts are stored newest-first). */
  static adjacent(slug: string): { older?: PostMeta; newer?: PostMeta } {
    const index = BlogContent.#posts.findIndex(
      (post) => post.meta.slug === slug,
    )
    if (index < 0) return {}
    return {
      newer: BlogContent.#posts[index - 1]?.meta,
      older: BlogContent.#posts[index + 1]?.meta,
    }
  }
}
