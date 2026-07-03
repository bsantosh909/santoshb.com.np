import { PathIcon } from '#/features/design-system/components/icons/PathIcon'
import { TechIcons } from '#/features/design-system/lib/tech-icons'

interface TechIconProps {
  label: string
  /** Tailwind size classes, e.g. `size-5`; inherits currentColor. */
  className?: string
}

export function TechIcon({ label, className }: TechIconProps) {
  return <PathIcon path={TechIcons.path(label)} className={className} />
}
