import { Link } from '@tanstack/react-router'
import { Accent } from '#/features/design-system/lib/accent'
import { PostAuthorRow } from '#/features/blog/components/PostAuthorRow'
import { PostCategoryChip } from '#/features/blog/components/PostCategoryChip'
import { PostDateline } from '#/features/blog/components/PostDateline'
import type { PostMeta } from '#/features/blog/lib/blog-content'

interface PostHeaderProps {
  meta: PostMeta
}

export function PostHeader({ meta }: PostHeaderProps) {
  return (
    <header>
      <Link
        to="/blog/"
        className="inline-flex items-center gap-2 font-mono text-label normal-case text-faint no-underline transition-colors hover:text-accent"
      >
        <span>←</span> All writing
      </Link>
      <div className="mt-6.5 flex flex-wrap items-center gap-2">
        {(meta.tags.length > 0 ? meta.tags : ['Notes']).map((tag) => (
          <PostCategoryChip
            key={tag}
            label={tag}
            accent={Accent.forKey(`${meta.slug}/${tag}`)}
            variant="solid"
          />
        ))}
      </div>
      <PostDateline meta={meta} className="mt-3" />
      <h1 className="mt-4.5 font-display text-post-title font-extrabold text-balance">
        {meta.title}
      </h1>
      <p className="mt-5 text-lede text-pretty text-muted">{meta.summary}</p>
      <PostAuthorRow />
    </header>
  )
}
