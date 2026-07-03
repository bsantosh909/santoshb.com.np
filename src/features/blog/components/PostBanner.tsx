import { SiteConfig } from '#/features/seo/lib/site-config'
import type { PostMeta } from '#/features/blog/lib/blog-content'
import { cn } from '#/features/design-system/lib/cn'

interface PostBannerProps {
  post: PostMeta
  className?: string
  /** Below-the-fold lists lazy-load; the post page banner loads eagerly. */
  loading?: 'lazy' | 'eager'
  /** `light` pins the light artwork (for fixed-ink surfaces); default follows the theme. */
  appearance?: 'auto' | 'light'
  /** Rendered widths for srcset selection, e.g. `(min-width: 768px) 256px, 100vw`. */
  sizes?: string
}

/**
 * Theme-aware banner art from scripts/generate-banners.mjs. On-site display
 * uses the WebP ladder (640w/1200w); the .png named in frontmatter is the
 * og:image. A missing file hides that variant instead of showing a broken
 * image.
 */
export function PostBanner({
  post,
  className,
  loading = 'lazy',
  appearance = 'auto',
  sizes = '(min-width: 768px) 648px, calc(100vw - 40px)',
}: PostBannerProps) {
  if (!post.banner) return null
  const hide = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.display = 'none'
  }
  const lightSrc = SiteConfig.bannerPath(post.banner.replace(/\.png$/, '.webp'))
  const darkSrc = SiteConfig.bannerPath(
    post.banner.replace(/\.png$/, '-dark.webp'),
  )
  const rung = (src: string) => src.replace(/\.webp$/, '-640.webp')
  const lightSrcSet = `${rung(lightSrc)} 640w, ${lightSrc} 1200w`
  const darkSrcSet = `${rung(darkSrc)} 640w, ${darkSrc} 1200w`
  const shared = `aspect-banner h-auto w-full bg-bg object-cover ${className ?? ''}`
  // The adjacent card/page text already carries the title.
  const alt = ''
  if (appearance === 'light') {
    return (
      <img
        src={lightSrc}
        srcSet={lightSrcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        width={1200}
        height={630}
        className={cn('block', shared)}
        onError={hide}
      />
    )
  }
  return (
    <>
      <img
        src={lightSrc}
        srcSet={lightSrcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        width={1200}
        height={630}
        className={cn('block dark:hidden', shared)}
        onError={hide}
      />
      <img
        src={darkSrc}
        srcSet={darkSrcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        width={1200}
        height={630}
        className={cn('hidden dark:block', shared)}
        onError={hide}
      />
    </>
  )
}
