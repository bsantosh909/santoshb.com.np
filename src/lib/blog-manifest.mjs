import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const contentDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '../content/blog',
)

/**
 * Build-time (Node) view of the blog for the prebuild scripts — the app itself
 * reads posts through the MDX pipeline (BlogContent); this only reads
 * frontmatter, without compiling MDX.
 */
function readPosts() {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data } = matter(readFileSync(join(contentDir, file), 'utf8'))
      const lastmod = data.updated ?? data.created
      return {
        slug: file.replace(/\.mdx$/, ''),
        path: `/blog/${file.replace(/\.mdx$/, '')}/`,
        title: data.title ?? '',
        description: data.seoDescription ?? data.summary ?? '',
        draft: data.draft ?? false,
        lastmod: lastmod
          ? new Date(lastmod).toISOString().slice(0, 10)
          : undefined,
      }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1))
}

/** Post URLs plus `lastmod` from `updated ?? created`, for sitemap.xml. */
export function blogSitemapPages() {
  return readPosts().map((post) => ({
    path: post.path,
    sitemap: post.lastmod ? { lastmod: post.lastmod } : undefined,
  }))
}

/** Title + description per post, newest first, for llms.txt. */
export function blogLlmsPages() {
  return readPosts().map((post) => ({
    path: post.path,
    title: post.title,
    description: post.description,
  }))
}
