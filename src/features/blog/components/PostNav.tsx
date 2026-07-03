import { PostNavCard } from '#/features/blog/components/PostNavCard'
import type { PostMeta } from '#/features/blog/lib/blog-content'

interface PostNavProps {
  older?: PostMeta
  newer?: PostMeta
}

export function PostNav({ older, newer }: PostNavProps) {
  if (!older && !newer) return null
  return (
    <div className="mt-12 flex flex-wrap justify-between gap-4 border-t-2 border-line pt-8">
      {older ? <PostNavCard post={older} direction="previous" /> : null}
      {newer ? <PostNavCard post={newer} direction="next" /> : null}
    </div>
  )
}
