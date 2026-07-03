import { CloseIcon } from '#/features/design-system/components/icons/CloseIcon'
import { MenuIcon } from '#/features/design-system/components/icons/MenuIcon'

interface MenuToggleButtonProps {
  open: boolean
  onToggle: () => void
}

export function MenuToggleButton({ open, onToggle }: MenuToggleButtonProps) {
  return (
    <button
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onToggle}
      className="grid size-10 cursor-pointer place-items-center rounded-full border-brut bg-transparent text-ink md:hidden"
    >
      {open ? (
        <CloseIcon className="size-4.5" />
      ) : (
        <MenuIcon className="size-4.5" />
      )}
    </button>
  )
}
