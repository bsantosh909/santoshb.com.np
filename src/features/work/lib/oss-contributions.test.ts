import { describe, expect, it } from 'vitest'

import { OssContributions } from '#/features/work/lib/oss-contributions'

describe('OssContributions.others', () => {
  const others = OssContributions.others()

  it('lists each repo once so React keys stay unique', () => {
    const repos = others.map((entry) => entry.repo)
    expect(repos).toHaveLength(new Set(repos).size)
  })

  it('keeps the curated commits link when a manual repo also has merged PRs', () => {
    const entry = others.find((o) => o.repo === 'RoyaleAPI/cr-api-docs')
    expect(entry).toBeDefined()
    expect(entry?.prsUrl).toContain('/commits?author=')
  })

  it('never repeats a curated highlight in the others list', () => {
    const highlighted = new Set(
      OssContributions.highlights().map((entry) => entry.repo),
    )
    expect(others.some((entry) => highlighted.has(entry.repo))).toBe(false)
  })
})
