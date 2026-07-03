import { TechIcon } from '#/features/design-system/components/TechIcon'
import type { ProjectMeta } from '#/features/work/lib/work-content'

interface ProjectFactsProps {
  project: ProjectMeta
}

export function ProjectFacts({ project }: ProjectFactsProps) {
  const hasFacts = project.role || project.period || project.stack.length > 0
  if (!hasFacts) return null

  return (
    <dl className="mt-8 flex flex-col gap-5 rounded-card-sm border-brut bg-surface p-5.5">
      {project.role ? (
        <div>
          <dt className="font-mono text-chip uppercase text-faint">Role</dt>
          <dd className="m-0 mt-1.5 text-card font-semibold text-ink">
            {project.role}
          </dd>
        </div>
      ) : null}
      {project.period ? (
        <div>
          <dt className="font-mono text-chip uppercase text-faint">Period</dt>
          <dd className="m-0 mt-1.5 text-card font-semibold text-ink">
            {project.period}
          </dd>
        </div>
      ) : null}
      {project.stack.length > 0 ? (
        <div>
          <dt className="font-mono text-chip uppercase text-faint">Stack</dt>
          <dd className="m-0 mt-2.5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-chip px-3 py-1.5 text-sm font-medium text-ink"
              >
                <TechIcon label={item} className="size-3.5 text-muted" />
                {item}
              </span>
            ))}
          </dd>
        </div>
      ) : null}
    </dl>
  )
}
