import { Link } from '@tanstack/react-router'
import { Accent } from '#/features/design-system/lib/accent'
import { ProjectScreenshot } from '#/features/work/components/ProjectScreenshot'
import { ProjectTagChip } from '#/features/work/components/ProjectTagChip'
import type { ProjectMeta } from '#/features/work/lib/work-content'
import { cn } from '#/features/design-system/lib/cn'

interface ProjectCardProps {
  project: ProjectMeta
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to="/work/$slug/"
      params={{ slug: project.slug }}
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-card-lg border-brut bg-surface text-ink no-underline transition-all duration-300 hover:-translate-y-2 hover:shadow-brut-lg',
        Accent.shadowTint[project.accent],
      )}
    >
      <ProjectScreenshot
        project={project}
        sizes="(min-width: 768px) 560px, calc(100vw - 40px)"
        className="border-b-2 border-line"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="m-0 font-display text-2xl font-extrabold">
            {project.name}
          </h3>
          <span className={cn('text-xl', Accent.text[project.accent])}>→</span>
        </div>
        <p className="mt-2.5 mb-4 line-clamp-2 text-card text-muted">
          {project.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <ProjectTagChip key={tag.label} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  )
}
