import type { TocEntry } from '#/features/blog/lib/blog-content'

interface PostTocProps {
  toc: ReadonlyArray<TocEntry>
}

export function PostToc({ toc }: PostTocProps) {
  if (toc.length < 2) return null
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-card-sm border-brut bg-surface p-5"
    >
      <div className="mb-3 font-mono text-chip uppercase text-faint">
        On this page
      </div>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? 'pl-3.5' : ''}>
            <a
              href={`#${entry.id}`}
              className="text-sm leading-snug text-muted no-underline transition-colors hover:text-accent"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
