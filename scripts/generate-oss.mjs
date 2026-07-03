import { mkdirSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

/**
 * Refreshes merged-PR stats + org avatars for the open-source section
 * (`npm run oss`). Queries GitHub's public API — no auth needed at this
 * volume — rewrites oss-stats.json, and self-hosts org avatars as WebP so
 * the site never hotlinks GitHub at runtime. Curated repo descriptions
 * live in oss-contributions.ts.
 */
const AUTHOR = 'bsantosh909'

const res = await fetch(
  `https://api.github.com/search/issues?q=author:${AUTHOR}+type:pr+is:merged&per_page=100`,
  { headers: { Accept: 'application/vnd.github+json' } },
)
if (!res.ok) {
  console.error('[oss] GitHub API error', res.status, await res.text())
  process.exit(1)
}
const data = await res.json()

const prCounts = {}
for (const item of data.items) {
  const repo = item.repository_url.split('/').slice(-2).join('/')
  if (repo.startsWith(`${AUTHOR}/`)) continue
  prCounts[repo] = (prCounts[repo] ?? 0) + 1
}

const stats = {
  totalMergedPrs: data.total_count,
  prCounts,
  fetchedAt: new Date().toISOString().slice(0, 10),
}
writeFileSync(
  'src/features/work/lib/oss-stats.json',
  JSON.stringify(stats, null, 2) + '\n',
)
console.log(
  `[oss] ${stats.totalMergedPrs} merged PRs across ${Object.keys(prCounts).length} repos`,
)

// Self-host org avatars (96px WebP) for the rows/tiles.
mkdirSync('public/img/oss', { recursive: true })
// includes orgs referenced by curated/manual entries with no merged PRs
const EXTRA_ORGS = ['Statscell', 'CesiumLabs', 'RoyaleAPI']
const orgs = [
  ...new Set([
    ...Object.keys(prCounts).map((repo) => repo.split('/')[0]),
    ...EXTRA_ORGS,
  ]),
]
for (const org of orgs) {
  try {
    const avatar = await fetch(`https://github.com/${org}.png?size=128`)
    if (!avatar.ok) throw new Error(String(avatar.status))
    const buffer = Buffer.from(await avatar.arrayBuffer())
    await sharp(buffer)
      .resize(96, 96)
      .webp({ quality: 85 })
      .toFile(`public/img/oss/${org.toLowerCase()}.webp`)
  } catch (error) {
    console.warn(`[oss] avatar failed for ${org}:`, error.message)
  }
}
console.log(`[oss] avatars for ${orgs.length} orgs`)
