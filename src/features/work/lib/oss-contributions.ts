import stats from '#/features/work/lib/oss-stats.json'

export interface OssContribution {
  /** Full repo name (`ToolJet/ToolJet`) or org name (`Statscell`). */
  repo: string
  description: string
  /** Overrides the default "N+ merged PRs" stat (e.g. maintainer roles). */
  stat?: string
  /** Overrides the default merged-PRs link. */
  href?: string
}

export interface OssHighlight extends OssContribution {
  stat: string
  href: string
  avatar: string
}

export interface OssOther {
  repo: string
  name: string
  prsUrl: string
  avatar: string
}

const AUTHOR = 'bsantosh909'

// Featured elsewhere on the page (Know Nepal is a project card).
const EXCLUDED_ORGS = new Set(['Know-Nepal', 'amplication'])
// Swag-hunting era — not portfolio material.
const EXCLUDED_PATTERNS = [/hacktoberfest/i]

function avatarPath(repo: string): string {
  return `/img/oss/${repo.split('/')[0].toLowerCase()}.webp`
}

function prsUrl(repo: string): string {
  return `https://github.com/${repo}/pulls?q=is%3Apr+author%3A${AUTHOR}+is%3Amerged`
}

export class OssContributions {
  /** Curated highlights — counts and avatars refresh via `npm run oss`. */
  static readonly #curated: ReadonlyArray<OssContribution> = [
    {
      repo: 'Statscell',
      description: 'Community data & assets org for Supercell games',
      stat: '76+ commits · maintainer',
      href: 'https://github.com/Statscell',
    },
    {
      repo: 'ToolJet/ToolJet',
      description: 'Open-source low-code platform for internal tools',
    },
    {
      repo: 'gitroomhq/postiz-app',
      description: 'Open-source social media scheduling tool',
    },
    {
      repo: 'novuhq/novu',
      description: 'Open-source notification infrastructure',
    },
    {
      repo: 'meilisearch/meilisearch-js',
      description: 'Official JavaScript client for Meilisearch',
    },
    {
      repo: 'medusajs/admin',
      description: 'Admin dashboard for the Medusa commerce engine',
    },
    {
      repo: 'clashperk/clashofclans.js',
      description: 'JavaScript wrapper for the Clash of Clans API',
    },
  ]

  static totalMergedPrs(): number {
    return stats.totalMergedPrs
  }

  static highlights(): ReadonlyArray<OssHighlight> {
    const counts = stats.prCounts as Record<string, number>
    return OssContributions.#curated.map((entry) => {
      const count = counts[entry.repo] ?? 0
      return {
        ...entry,
        stat: entry.stat ?? (count > 0 ? `${count}+ merged PRs` : 'merged PRs'),
        href: entry.href ?? prsUrl(entry.repo),
        avatar: avatarPath(entry.repo),
      }
    })
  }

  /** Commit-level contributions the PR search can't see. */
  static readonly #manualOthers: ReadonlyArray<{ repo: string }> = [
    { repo: 'CesiumLabs/code-examples' },
    { repo: 'RoyaleAPI/cr-api-docs' },
  ]

  /** Everything else from the stats, minus highlights and excluded orgs. */
  static others(): ReadonlyArray<OssOther> {
    const curatedRepos = new Set(
      OssContributions.#curated.map((entry) => entry.repo),
    )
    const counts = stats.prCounts as Record<string, number>
    return Object.entries(counts)
      .filter(
        ([repo]) =>
          !curatedRepos.has(repo) &&
          !EXCLUDED_ORGS.has(repo.split('/')[0]) &&
          !EXCLUDED_PATTERNS.some((pattern) => pattern.test(repo)),
      )
      .sort((a, b) => b[1] - a[1])
      .map(([repo]) => ({
        repo,
        name: repo.split('/')[1],
        prsUrl: prsUrl(repo),
        avatar: avatarPath(repo),
      }))
      .concat(
        OssContributions.#manualOthers.map(({ repo }) => ({
          repo,
          name: repo.split('/')[1],
          prsUrl: `https://github.com/${repo}/commits?author=${AUTHOR}`,
          avatar: avatarPath(repo),
        })),
      )
  }
}
