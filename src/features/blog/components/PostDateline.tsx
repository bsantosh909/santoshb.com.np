import type { PostMeta } from '#/features/blog/lib/blog-content'
import { cn } from '#/features/design-system/lib/cn'

interface PostDatelineProps {
  meta: PostMeta
  className?: string
}

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function PostDateline({ meta, className }: PostDatelineProps) {
  const label = meta.updated ? 'Updated on' : 'Created on'
  const date = meta.updated ?? meta.created
  return (
    <p className={cn('font-mono text-sm text-faint', className ?? '')}>
      {label} {formatter.format(date)} · {meta.readingTime.text}
    </p>
  )
}
