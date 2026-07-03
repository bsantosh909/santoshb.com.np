import { useState } from 'react'
import { Accent } from '#/features/design-system/lib/accent'
import { cn } from '#/features/design-system/lib/cn'
import type { ProjectMeta } from '#/features/work/lib/work-content'

interface ProjectScreenshotProps {
  project: ProjectMeta
  /** Rendered widths for srcset selection. */
  sizes?: string
  /** What to show when no capture exists: accent tint block, or nothing. */
  fallback?: 'tint' | 'hide'
  className?: string
}

/**
 * Live-site capture from scripts/generate-screenshots.mjs. Projects without
 * a capture (site down, renders blank headless) fall back to the accent
 * tint block.
 */
export function ProjectScreenshot({
  project,
  sizes = '(min-width: 768px) 560px, calc(100vw - 40px)',
  fallback = 'tint',
  className,
}: ProjectScreenshotProps) {
  const [failed, setFailed] = useState(false)
  const missing = failed || !project.cover
  if (missing && fallback === 'hide') return null
  if (missing) {
    return (
      <div
        className={cn(
          'grid aspect-banner w-full place-items-center font-mono text-sm text-ink-fixed/70',
          Accent.tintBg[project.accent],
          className,
        )}
      >
        {project.name}
      </div>
    )
  }
  const base = `/img/projects/${project.slug}`
  return (
    <img
      src={`${base}.webp`}
      srcSet={`${base}-640.webp 640w, ${base}.webp 1200w`}
      sizes={sizes}
      alt={`Screenshot of ${project.name}`}
      loading="lazy"
      width={1200}
      height={630}
      className={cn('aspect-banner h-auto w-full object-cover', className)}
      onError={() => setFailed(true)}
    />
  )
}
