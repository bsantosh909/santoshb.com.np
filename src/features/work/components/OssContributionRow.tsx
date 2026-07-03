import { useState } from 'react'
import type { OssHighlight } from '#/features/work/lib/oss-contributions'

interface OssContributionRowProps {
  contribution: OssHighlight
}

export function OssContributionRow({ contribution }: OssContributionRowProps) {
  const [avatarFailed, setAvatarFailed] = useState(false)
  return (
    <a
      href={contribution.href}
      target="_blank"
      rel="noopener"
      className="flex flex-col gap-2 border-b border-chip py-4 text-ink no-underline transition-colors last:border-b-0 hover:text-accent md:flex-row md:items-center md:gap-6"
    >
      <span className="flex w-72 flex-none items-center gap-3">
        {avatarFailed ? (
          <span className="grid size-9 flex-none place-items-center rounded-tile border-brut bg-surface font-display text-sm font-bold">
            {contribution.repo.charAt(0).toUpperCase()}
          </span>
        ) : (
          <img
            src={contribution.avatar}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            className="size-9 flex-none rounded-tile border-brut bg-surface object-cover"
            onError={() => setAvatarFailed(true)}
          />
        )}
        <span className="truncate font-mono text-sm font-bold">
          {contribution.repo}
        </span>
      </span>
      <span className="flex-1 text-card text-muted">
        {contribution.description}
      </span>
      <span className="flex items-center gap-2 font-mono text-xs text-faint">
        {contribution.stat}
        <span aria-hidden>↗</span>
      </span>
    </a>
  )
}
