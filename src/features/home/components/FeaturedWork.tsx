import { Link } from '@tanstack/react-router'
import { Reveal } from '#/features/motion/components/Reveal'
import { ProjectCard } from '#/features/work/components/ProjectCard'
import { WorkContent } from '#/features/work/lib/work-content'

export function FeaturedWork() {
  return (
    <section className="mx-auto max-w-shell px-5 md:px-7 pb-16 md:pb-27">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4.5">
        <div className="flex flex-col items-start gap-3">
          <span className="font-mono text-label uppercase text-faint">
            Featured
          </span>
          <h2 className="m-0 font-display text-display-lg font-extrabold">
            Recent work
          </h2>
        </div>
        <Link
          to="/work/"
          className="border-b-2 border-accent pb-0.5 text-card font-semibold text-ink no-underline transition-colors hover:text-accent"
        >
          All projects →
        </Link>
      </Reveal>
      <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3">
        {WorkContent.featured().map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
