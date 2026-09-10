import { execFileSync } from 'node:child_process'
import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildRssFeed } from '../src/lib/rss-feed.mjs'
import { blogLlmsPages, blogSitemapPages } from '../src/lib/blog-manifest.mjs'

/**
 * Runs before `vite build` (see package.json). feed.xml, sitemap.xml and
 * llms.txt are written into public/ so they're real public assets in every
 * deploy mode — the nitro server only serves files it knew about at build
 * time, so post-build generation would 404 there.
 */
const root = process.cwd()
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://www.santoshb.com.np'
const SITE_NAME = 'Santosh Bhandari'
const SITE_DESCRIPTION =
  'Personal website, portfolio and blog of Santosh Bhandari — full stack developer working across backend, frontend, and everything in between.'

writeFileSync(join(root, 'public/feed.xml'), buildRssFeed())
console.log('[prebuild] wrote public/feed.xml')

const today = new Date().toISOString().slice(0, 10)

/**
 * Stamping today's date on every build tells crawlers each page changed on
 * every deploy, which is a freshness signal they learn to distrust.
 */
function gitLastModified(file) {
  try {
    const stdout = execFileSync(
      'git',
      ['log', '-1', '--format=%cs', '--', file],
      {
        cwd: root,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      },
    )
    return stdout.trim() || today
  } catch {
    return today
  }
}

// Static pages (privacy deliberately excluded, as in v3), then content pages.
const entries = [
  { path: '/', source: 'src/routes/index.tsx' },
  { path: '/about/', source: 'src/routes/about.tsx' },
  { path: '/work/', source: 'src/routes/work/index.tsx' },
  { path: '/blog/', source: 'src/routes/blog/index.tsx' },
  { path: '/contact/', source: 'src/routes/contact.tsx' },
  ...readdirSync(join(root, 'src/content/work'))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      path: `/work/${file.replace(/\.mdx$/, '')}/`,
      source: `src/content/work/${file}`,
    })),
]
  .map((entry) => ({
    path: entry.path,
    lastmod: gitLastModified(entry.source),
  }))
  .concat(
    blogSitemapPages().map((page) => ({
      path: page.path,
      lastmod: page.sitemap?.lastmod ?? today,
    })),
  )

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  // The sitemap schema namespace is http:// even though the site is https —
  // it's an identifier, not a URL to fetch, and validators reject the https form.
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.map((entry) =>
    [
      '  <url>',
      `    <loc>${SITE_URL}${entry.path}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')

writeFileSync(join(root, 'public/sitemap.xml'), sitemap)
console.log(`[prebuild] wrote public/sitemap.xml (${entries.length} urls)`)

// llms.txt — https://llmstxt.org
const llms = [
  `# ${SITE_NAME}`,
  '',
  `> ${SITE_DESCRIPTION}`,
  '',
  '## Pages',
  '',
  `- [About](${SITE_URL}/about/): Background, experience and what I work on.`,
  `- [Work](${SITE_URL}/work/): Selected projects, with the stack and my role on each.`,
  `- [Writing](${SITE_URL}/blog/): All blog posts.`,
  `- [Contact](${SITE_URL}/contact/): How to get in touch.`,
  '',
  '## Blog posts',
  '',
  ...blogLlmsPages().map((post) => {
    // a few summaries contain inline HTML
    const description = post.description
      .replace(/<[^>]*>?/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    return `- [${post.title}](${SITE_URL}${post.path})${description ? `: ${description}` : ''}`
  }),
  '',
  '## Feeds',
  '',
  `- [RSS](${SITE_URL}/feed.xml): Full-text feed of all posts.`,
  `- [Sitemap](${SITE_URL}/sitemap.xml)`,
  '',
].join('\n')

writeFileSync(join(root, 'public/llms.txt'), llms)
console.log('[prebuild] wrote public/llms.txt')
