import { Link } from '@tanstack/react-router'
import { Accent } from '#/features/design-system/lib/accent'
import { PostBanner } from '#/features/blog/components/PostBanner'
import { PostCategoryChip } from '#/features/blog/components/PostCategoryChip'
import { PostDateline } from '#/features/blog/components/PostDateline'
import type { AccentName } from '#/features/design-system/lib/accent'
import type { PostMeta } from '#/features/blog/lib/blog-content'
import { cn } from '#/features/design-system/lib/cn'

interface PostCardProps {
  post: PostMeta
  accent: AccentName
}

export function PostCard({ post, accent }: PostCardProps) {
  return (
    <Link
      to="/blog/$slug/"
      params={{ slug: post.slug }}
      className={cn(
        'flex flex-col gap-5 rounded-card border-brut bg-surface p-5 text-ink no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut md:flex-row md:items-center md:gap-7',
        Accent.shadowTint[accent],
      )}
    >
      <PostBanner
        post={post}
        sizes="(min-width: 768px) 256px, calc(100vw - 60px)"
        className="flex-none rounded-card-sm border-brut md:w-64"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {(post.tags.length > 0 ? post.tags : ['Notes']).map((tag) => (
            <PostCategoryChip key={tag} label={tag} accent={accent} />
          ))}
        </div>
        <PostDateline meta={post} className="mt-2.5" />
        <h2 className="mt-3 mb-2 font-display text-2xl leading-snug font-bold">
          {post.title}
        </h2>
        <p className="m-0 max-w-prose text-sm leading-relaxed text-muted md:line-clamp-2">
          {post.summary}
        </p>
      </div>
      <span
        className={cn('hidden text-2xl md:block', Accent.text[accent])}
        aria-hidden
      >
        →
      </span>
    </Link>
  )
}
