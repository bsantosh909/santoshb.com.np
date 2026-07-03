import { Accent } from '#/features/design-system/lib/accent'
import type { Stat } from '#/features/about/lib/about-content'
import { cn } from '#/features/design-system/lib/cn'

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="min-w-36 flex-1 rounded-card-sm border-brut bg-surface px-5 py-4.5">
      <div
        className={cn(
          'font-display text-4xl leading-none font-extrabold',
          Accent.text[stat.accent],
        )}
      >
        {stat.value}
      </div>
      <div className="mt-1 text-sm text-muted">{stat.label}</div>
    </div>
  )
}
