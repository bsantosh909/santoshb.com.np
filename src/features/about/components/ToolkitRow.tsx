import { Accent } from '#/features/design-system/lib/accent'
import { TechIcon } from '#/features/design-system/components/TechIcon'
import type { ToolkitCategory } from '#/features/about/lib/about-content'
import { cn } from '#/features/design-system/lib/cn'

interface ToolkitRowProps {
  category: ToolkitCategory
}

export function ToolkitRow({ category }: ToolkitRowProps) {
  return (
    <div className="flex flex-col gap-3.5 border-b border-chip py-6 last:border-b-0 md:flex-row md:items-baseline md:gap-8 md:py-7">
      <div className="flex w-44 flex-none items-center gap-2.5 font-mono text-label uppercase text-muted">
        <span
          className={cn('size-2.5 flex-none', Accent.bg[category.accent])}
          aria-hidden
        />
        {category.title}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {category.items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-card font-medium text-ink"
          >
            <TechIcon label={item} className="size-4 text-muted" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
