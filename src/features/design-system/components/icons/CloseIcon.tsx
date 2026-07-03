interface CloseIconProps {
  className?: string
}

export function CloseIcon({ className }: CloseIconProps) {
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
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
