import { useParams } from '@tanstack/react-router'
import { ProjectArticle } from '#/features/work/components/ProjectArticle'
import { ProjectScreenshot } from '#/features/work/components/ProjectScreenshot'
import { ProjectDetailHeader } from '#/features/work/components/ProjectDetailHeader'
import { ProjectFacts } from '#/features/work/components/ProjectFacts'
import { WorkCtaBanner } from '#/features/work/components/WorkCtaBanner'
import { WorkContent } from '#/features/work/lib/work-content'

export function WorkDetailPage() {
  const { slug } = useParams({ from: '/work/$slug' })
  const project = WorkContent.get(slug)
  if (!project) return null

  return (
    <main className="mx-auto w-full max-w-article px-5 md:px-7 py-10 md:py-16">
      <ProjectDetailHeader project={project.meta} />
      <ProjectFacts project={project.meta} />
      <ProjectScreenshot
        project={project.meta}
        sizes="(min-width: 768px) 648px, calc(100vw - 40px)"
        fallback="hide"
        className="mt-8 rounded-card border-brut"
      />
      <ProjectArticle project={project} />
      <WorkCtaBanner />
    </main>
  )
}
