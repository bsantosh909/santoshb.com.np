import { describe, expect, it } from 'vitest'

import { Seo } from '#/features/seo/lib/seo'
import { SiteConfig } from '#/features/seo/lib/site-config'

describe('Seo.plainText', () => {
  it('strips HTML tags left in summaries', () => {
    expect(Seo.plainText('A <strong>bold</strong> claim')).toBe('A bold claim')
  })

  it('collapses whitespace and newlines into single spaces', () => {
    expect(Seo.plainText('one\n\n  two\tthree')).toBe('one two three')
  })

  it('trims surrounding whitespace', () => {
    expect(Seo.plainText('  padded  ')).toBe('padded')
  })
})

describe('SiteConfig URL helpers', () => {
  it('builds absolute URLs against the configured base', () => {
    expect(SiteConfig.absoluteUrl('/about/')).toBe(`${SiteConfig.url}/about/`)
  })

  it('cache-busts OG images so social scrapers refetch after art changes', () => {
    expect(SiteConfig.ogImageUrl('/img/og-default.png')).toBe(
      `${SiteConfig.url}/img/og-default.png?v=${SiteConfig.ogImageVersion}`,
    )
  })

  it('resolves banner URLs through the banner base path', () => {
    expect(SiteConfig.bannerUrl('post.png')).toBe(
      `${SiteConfig.url}${SiteConfig.bannerBasePath}/post.png?v=${SiteConfig.ogImageVersion}`,
    )
  })
})

describe('Seo.page', () => {
  const head = Seo.page({
    title: 'Test Page',
    description: 'A <em>short</em>   description',
    path: '/test/',
  })

  const meta = (key: string) =>
    head.meta.find((entry) => entry.name === key || entry.property === key)
      ?.content

  it('emits a canonical link matching the page path', () => {
    expect(head.links).toContainEqual({
      rel: 'canonical',
      href: `${SiteConfig.url}/test/`,
    })
  })

  it('reuses the cleaned description across meta, OG and Twitter tags', () => {
    expect(meta('description')).toBe('A short description')
    expect(meta('og:description')).toBe('A short description')
    expect(meta('twitter:description')).toBe('A short description')
  })

  it('defaults to the website OG type', () => {
    expect(meta('og:type')).toBe('website')
  })
})
