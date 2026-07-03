import { Link } from '@tanstack/react-router'
import type { PostMeta } from '#/features/blog/lib/blog-content'
import { cn } from '#/features/design-system/lib/cn'

interface PostNavCardProps {
  post: PostMeta
  direction: 'previous' | 'next'
}

export function PostNavCard({ post, direction }: PostNavCardProps) {
  const isNext = direction === 'next'
  return (
    <Link
      to="/blog/$slug/"
      params={{ slug: post.slug }}
      className={cn(
        'min-w-56 flex-1 rounded-card-sm border-brut bg-surface px-5 py-4.5 text-ink no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut-sm',
        isNext ? 'text-right shadow-tint-accent' : 'shadow-tint-accent-blue',
      )}
    >
      <div className="font-mono text-chip uppercase text-faint">
        {isNext ? 'Next →' : '← Previous'}
      </div>
      <div className="mt-1.5 font-display text-lg font-bold">{post.title}</div>
    </Link>
  )
}
