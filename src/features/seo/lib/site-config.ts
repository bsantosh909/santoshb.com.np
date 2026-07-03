export class SiteConfig {
  /**
   * Base for all absolute URLs (canonical, OG, JSON-LD). Override with
   * VITE_SITE_URL to test rendered output locally (e.g.
   * VITE_SITE_URL=http://localhost:3000); dev defaults to localhost.
   */
  static readonly url: string =
    (import.meta.env.VITE_SITE_URL as string | undefined) ??
    (import.meta.env.DEV
      ? 'http://localhost:3000'
      : 'https://www.santoshb.com.np')
  static readonly name = 'Santosh Bhandari'
  static readonly title = 'Santosh Bhandari - Full Stack Developer'
  static readonly description =
    'Personal website, portfolio and blog of Santosh Bhandari — full stack developer working across backend, frontend, and everything in between.'
  static readonly blogTitleTemplate = '%s - Santosh Blogs'
  static readonly bannerBasePath = '/img/banners'
  static readonly sameAs: ReadonlyArray<string> = [
    'https://github.com/bsantosh909',
  ]

  /**
   * Cache-buster for og:image URLs. Social platforms and CDNs cache OG
   * images per URL; v4 regenerated the banner art under the same
   * filenames, so a version bump is what forces a fresh scrape.
   */
  static readonly ogImageVersion = '4'

  static absoluteUrl(path: string): string {
    return `${SiteConfig.url}${path}`
  }

  static ogImageUrl(path: string): string {
    return `${SiteConfig.absoluteUrl(path)}?v=${SiteConfig.ogImageVersion}`
  }

  static bannerUrl(banner: string): string {
    return SiteConfig.ogImageUrl(SiteConfig.bannerPath(banner))
  }

  static bannerPath(banner: string): string {
    return `${SiteConfig.bannerBasePath}/${banner}`
  }
}
