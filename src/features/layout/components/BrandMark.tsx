import { cn } from '#/features/design-system/lib/cn'

interface BrandMarkProps {
  size?: 'sm' | 'md'
}

export function BrandMark({ size = 'md' }: BrandMarkProps) {
  const box = size === 'md' ? 'size-9.5 text-lg' : 'size-7.5 text-sm'
  return (
    <span
      className={cn(
        'grid',
        box,
        '-rotate-6 place-items-center rounded-tile bg-ink-fixed font-display font-extrabold text-accent-lime dark:border dark:border-line',
      )}
    >
      S
    </span>
  )
}
