import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const contentDir = join(
  dirname(fileURLToPath(import.meta.url)),
  '../content/blog',
)

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://www.santoshb.com.np'

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function plainText(value) {
  return String(value)
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function buildRssFeed() {
  const posts = readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data, content } = matter(
        readFileSync(join(contentDir, file), 'utf8'),
      )
      return {
        slug: file.replace(/\.mdx$/, ''),
        title: data.title,
        summary: data.summary ?? '',
        date: new Date(data.updated ?? data.created),
        body: content.trim(),
      }
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  const items = posts
    .map((post) =>
      [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <guid isPermaLink="false">${post.slug}</guid>`,
        `      <link>${SITE_URL}/blog/${post.slug}/</link>`,
        `      <description>${escapeXml(plainText(post.summary))}</description>`,
        `      <content:encoded><![CDATA[${post.body.replaceAll(']]>', ']]&gt;')}]]></content:encoded>`,
        `      <pubDate>${post.date.toUTCString()}</pubDate>`,
        '    </item>',
      ].join('\n'),
    )
    .join('\n')

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    '  <channel>',
    '    <title>Santosh Bhandari — Blog</title>',
    `    <link>${SITE_URL}/feed.xml</link>`,
    '    <description>RSS feed for my blog articles!</description>',
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
