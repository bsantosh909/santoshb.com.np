interface PathIconProps {
  /** Single SVG path on a 24x24 viewBox, filled with currentColor. */
  path: string
  className?: string
}

export function PathIcon({ path, className }: PathIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className ?? 'size-4'}
    >
      <path d={path} />
    </svg>
  )
}
