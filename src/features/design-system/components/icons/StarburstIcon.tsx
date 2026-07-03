interface StarburstIconProps {
  className?: string
}

/** The rotating hero accent star (fixed brand colors, both themes). */
export function StarburstIcon({ className }: StarburstIconProps) {
  return (
    <svg viewBox="0 0 50 50" aria-hidden className={className}>
      <path
        d="M25 0l6 19 19-6-12 16 12 16-19-6-6 19-6-19-19 6 12-16L0 13l19 6z"
        fill="var(--color-accent)"
        stroke="var(--color-ink-fixed)"
        strokeWidth="1.5"
      />
    </svg>
  )
}
