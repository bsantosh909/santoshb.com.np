import { SiteConfig } from '#/features/seo/lib/site-config'
import type { PostMeta } from '#/features/blog/lib/blog-content'

interface PageSeoInput {
  title: string
  description: string
  /** Route path with trailing slash, e.g. `/blog/my-post/`. */
  path: string
  image?: string
  ogType?: 'website' | 'article'
}

type MetaEntry = Record<string, string>
type LinkEntry = { rel: string; href: string }
type ScriptEntry = { type: string; children: string }

export interface HeadConfig {
  meta: Array<MetaEntry>
  links: Array<LinkEntry>
  scripts?: Array<ScriptEntry>
}

export class Seo {
  /** Strips residual HTML tags and collapses whitespace for meta contexts. */
  static plainText(value: string): string {
    return value
      .replace(/<[^>]*>?/gm, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /** Head entries (meta + canonical) shared by every page type. */
  static page(input: PageSeoInput): HeadConfig {
    const url = SiteConfig.absoluteUrl(input.path)
    const image = input.image ?? SiteConfig.ogImageUrl('/img/og-default.png')
    const description = Seo.plainText(input.description)
    return {
      meta: [
        { title: input.title },
        { name: 'description', content: description },
        { property: 'og:site_name', content: SiteConfig.name },
        { property: 'og:title', content: input.title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: input.ogType ?? 'website' },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: input.title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  }

  /** Full head config for a blog post: meta, canonical and BlogPosting JSON-LD. */
  static article(post: PostMeta): HeadConfig {
    const path = `/blog/${post.slug}/`
    const base = Seo.page({
      title: SiteConfig.blogTitleTemplate.replace('%s', post.title),
      description: post.summary,
      path,
      image: post.banner ? SiteConfig.bannerUrl(post.banner) : undefined,
      ogType: 'article',
    })
    return {
      meta: [
        ...base.meta,
        {
          property: 'article:published_time',
          content: post.created.toISOString(),
        },
        ...(post.updated
          ? [
              {
                property: 'article:modified_time',
                content: post.updated.toISOString(),
              },
            ]
          : []),
        // TanStack Router dedupes meta by property, so repeated article:tag
        // entries collapse to one — join instead (v3 behavior).
        { property: 'article:tag', content: post.tags.join(',') },
      ],
      links: base.links,
      scripts: [Seo.jsonLd(Seo.blogPostingSchema(post))],
    }
  }

  static jsonLd(schema: Record<string, unknown>): ScriptEntry {
    return {
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    }
  }

  static blogPostingSchema(post: PostMeta): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: Seo.plainText(post.summary),
      author: Seo.personSchema(),
      datePublished: post.created.toISOString(),
      ...(post.updated ? { dateModified: post.updated.toISOString() } : {}),
      keywords: post.tags.join(', '),
      ...(post.banner ? { image: SiteConfig.bannerUrl(post.banner) } : {}),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SiteConfig.absoluteUrl(`/blog/${post.slug}/`),
      },
      wordCount: post.readingTime.words,
      url: SiteConfig.absoluteUrl(`/blog/${post.slug}/`),
    }
  }

  static personSchema(): Record<string, unknown> {
    return {
      '@type': 'Person',
      name: SiteConfig.name,
      url: SiteConfig.url,
      sameAs: [...SiteConfig.sameAs],
    }
  }

  static websiteSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SiteConfig.name,
      url: SiteConfig.url,
      author: Seo.personSchema(),
    }
  }
}
