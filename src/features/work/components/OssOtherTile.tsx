import { useState } from 'react'
import type { OssOther } from '#/features/work/lib/oss-contributions'

interface OssOtherTileProps {
  contribution: OssOther
}

export function OssOtherTile({ contribution }: OssOtherTileProps) {
  const [avatarFailed, setAvatarFailed] = useState(false)
  return (
    <a
      href={contribution.prsUrl}
      target="_blank"
      rel="noopener"
      aria-label={contribution.repo}
      className="group relative flex text-ink no-underline transition-transform duration-300 hover:z-20 hover:-translate-y-1 focus-visible:z-20"
    >
      {avatarFailed ? (
        <span className="grid size-12 place-items-center rounded-card-sm border-brut bg-surface font-display text-lg font-bold">
          {contribution.name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <img
          src={contribution.avatar}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          className="size-12 rounded-card-sm border-brut bg-surface object-cover"
          onError={() => setAvatarFailed(true)}
        />
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 rounded-md border-brut bg-ink-fixed px-2 py-1 font-mono text-xs whitespace-nowrap text-paper-fixed opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {contribution.repo}
      </span>
    </a>
  )
}
