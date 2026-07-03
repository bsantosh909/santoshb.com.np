import { Link } from '@tanstack/react-router'
import { PostBanner } from '#/features/blog/components/PostBanner'
import type { PostMeta } from '#/features/blog/lib/blog-content'

interface FeaturedPostCardProps {
  post: PostMeta
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <Link
      to="/blog/$slug/"
      params={{ slug: post.slug }}
      className="relative mb-6 block overflow-hidden rounded-card-xl bg-ink-fixed p-7 text-paper-fixed no-underline transition-transform duration-300 hover:-translate-y-1.5 md:grid md:grid-cols-5 md:items-center md:gap-10 md:p-12"
    >
      <div className="absolute -top-12 -right-8 size-42 animate-float-a rounded-full bg-accent-blue opacity-45 blur-sm" />
      <div className="absolute -bottom-14 left-1/3 size-35 animate-float-b rounded-full bg-accent opacity-35 blur-sm" />
      <div className="relative md:col-span-3">
        <div>
          <span className="rounded-md border border-accent-lime px-2.5 py-1 font-mono text-chip uppercase text-accent-lime">
            Latest · {post.tags[0] ?? 'Notes'}
          </span>
          <div className="mt-3 font-mono text-xs text-faint-fixed">
            {dateFormatter.format(post.updated ?? post.created)} ·{' '}
            {post.readingTime.text}
          </div>
        </div>
        <h2 className="mt-4.5 mb-3 font-display text-display-md font-extrabold text-balance">
          {post.title}
        </h2>
        <p className="m-0 max-w-prose text-base leading-relaxed text-ink-soft-fixed">
          {post.summary}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-lime px-5.5 py-2.5 text-sm font-bold text-ink-fixed">
          Read post <span aria-hidden>→</span>
        </span>
      </div>
      <div className="relative mt-7 md:col-span-2 md:mt-0">
        <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-card-sm bg-accent" />
        <PostBanner
          post={post}
          appearance="light"
          className="relative rounded-card-sm border-brut-2 border-ink-fixed"
        />
      </div>
    </Link>
  )
}
