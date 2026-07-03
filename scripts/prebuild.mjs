import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildRssFeed } from '../src/lib/rss-feed.mjs'
import { blogSitemapPages } from '../src/lib/blog-manifest.mjs'

/**
 * Runs before `vite build` (see package.json). feed.xml and sitemap.xml are
 * written into public/ so they're real public assets in every deploy mode —
 * the nitro server only serves files it knew about at build time, so
 * post-build generation would 404 there.
 */
const root = process.cwd()
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://www.santoshb.com.np'

writeFileSync(join(root, 'public/feed.xml'), buildRssFeed())
console.log('[prebuild] wrote public/feed.xml')

// Static pages (privacy deliberately excluded, as in v3), then content pages.
const today = new Date().toISOString().slice(0, 10)
const entries = [
  { path: '/', lastmod: today },
  { path: '/about/', lastmod: today },
  { path: '/work/', lastmod: today },
  { path: '/blog/', lastmod: today },
  { path: '/contact/', lastmod: today },
  ...readdirSync(join(root, 'src/content/work'))
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      path: `/work/${file.replace(/\.mdx$/, '')}/`,
      lastmod: today,
    })),
  ...blogSitemapPages().map((page) => ({
    path: page.path,
    lastmod: page.sitemap?.lastmod ?? today,
  })),
]

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">',
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
