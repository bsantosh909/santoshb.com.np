import { Accent } from '#/features/design-system/lib/accent'
import type { AccentName } from '#/features/design-system/lib/accent'
import { cn } from '#/features/design-system/lib/cn'

interface PostCategoryChipProps {
  label: string
  accent: AccentName
  /** solid = accent background (post page); outline = bordered (cards). */
  variant?: 'solid' | 'outline'
}

function sentenceCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function PostCategoryChip({
  label,
  accent,
  variant = 'outline',
}: PostCategoryChipProps) {
  if (variant === 'solid') {
    return (
      <span
        className={cn(
          'rounded-md px-2 py-0.5 font-mono text-tag text-ink-fixed',
          Accent.bg[accent],
        )}
      >
        {sentenceCase(label)}
      </span>
    )
  }
  return (
    <span
      className={cn(
        'rounded-md border px-2 py-0.5 font-mono text-tag text-ink-fixed',
        Accent.border[accent],
        Accent.tintBg[accent],
      )}
    >
      {sentenceCase(label)}
    </span>
  )
}
