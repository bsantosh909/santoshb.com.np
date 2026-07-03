import type { PostMeta } from '#/features/blog/lib/blog-content'

interface PostTagListProps {
  tags: PostMeta['tags']
}

export function PostTagList({ tags }: PostTagListProps) {
  if (tags.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-chip px-3 py-1 font-mono text-sm capitalize text-ink"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
