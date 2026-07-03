import { Link } from '@tanstack/react-router'
import { Accent } from '#/features/design-system/lib/accent'
import { ProjectTagChip } from '#/features/work/components/ProjectTagChip'
import type { ProjectMeta } from '#/features/work/lib/work-content'
import { cn } from '#/features/design-system/lib/cn'

interface ProjectDetailHeaderProps {
  project: ProjectMeta
}

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  return (
    <header>
      <Link
        to="/work/"
        className="inline-flex items-center gap-2 font-mono text-label normal-case text-faint no-underline transition-colors hover:text-accent"
      >
        <span>←</span> All work
      </Link>
      <div className="mt-6.5 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <ProjectTagChip key={tag.label} tag={tag} />
        ))}
      </div>
      <h1 className="mt-4.5 font-display text-post-title font-extrabold text-balance">
        {project.name}
        <span className={Accent.text[project.accent]}>.</span>
      </h1>
      <p className="mt-5 max-w-prose text-lede text-pretty text-muted">
        {project.summary}
      </p>
      <a
        href={project.url}
        target="_blank"
        rel="noopener"
        className={cn(
          'mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-bg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut-sm',
          Accent.shadowTint[project.accent],
        )}
      >
        Visit live <span aria-hidden>↗</span>
      </a>
    </header>
  )
}
