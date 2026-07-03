import { Accent } from '#/features/design-system/lib/accent'
import { PathIcon } from '#/features/design-system/components/icons/PathIcon'
import type { SocialLink } from '#/features/contact/lib/social-links'
import { cn } from '#/features/design-system/lib/cn'

interface SocialCardProps {
  link: SocialLink
}

export function SocialCard({ link }: SocialCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener"
      className={cn(
        'flex items-center gap-3.5 rounded-card-sm border-brut bg-surface px-5.5 py-5 text-ink no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-brut',
        Accent.shadowTint[link.accent],
      )}
    >
      <span className="grid size-11 flex-none place-items-center rounded-card-sm bg-ink text-bg">
        <PathIcon path={link.iconPath} className="size-5.25" />
      </span>
      <span>
        <span className="block font-bold">{link.name}</span>
        <span className="block font-mono text-xs text-faint">
          {link.handle}
        </span>
      </span>
    </a>
  )
}
