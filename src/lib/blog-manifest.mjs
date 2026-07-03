import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const contentDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '../content/blog',
)

/**
 * Build-time (Node) view of the blog for vite.config — the app itself
 * reads posts through the MDX pipeline (BlogContent); this only extracts
 * what the sitemap needs from frontmatter without compiling MDX.
 */
export function blogSitemapPages() {
  return readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = readFileSync(join(contentDir, file), 'utf8')
      const created = source.match(/^created:\s*(\S+)/m)?.[1]
      const updated = source.match(/^updated:\s*(\S+)/m)?.[1]
      const lastmod = updated ?? created
      return {
        path: `/blog/${file.replace(/\.mdx$/, '')}/`,
        sitemap: lastmod ? { lastmod } : undefined,
      }
    })
}
