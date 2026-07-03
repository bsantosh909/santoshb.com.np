interface MenuIconProps {
  className?: string
}

export function MenuIcon({ className }: MenuIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
      className={className ?? 'size-4.5'}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}
