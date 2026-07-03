import { Accent } from '#/features/design-system/lib/accent'
import type { ProjectTag } from '#/features/work/lib/work-content'
import { cn } from '#/features/design-system/lib/cn'

interface ProjectTagChipProps {
  tag: ProjectTag
}

export function ProjectTagChip({ tag }: ProjectTagChipProps) {
  return (
    <span
      className={cn(
        'rounded-md border px-2.5 py-1 font-mono text-tag text-ink-fixed',
        Accent.border[tag.accent],
        Accent.tintBg[tag.accent],
      )}
    >
      {tag.label}
    </span>
  )
}
