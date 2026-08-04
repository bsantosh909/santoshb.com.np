import { useParams } from '@tanstack/react-router'
import { Toc } from '#/features/design-system/components/Toc'
import { ProjectArticle } from '#/features/work/components/ProjectArticle'
import { ProjectScreenshot } from '#/features/work/components/ProjectScreenshot'
import { ProjectDetailHeader } from '#/features/work/components/ProjectDetailHeader'
import { ProjectFacts } from '#/features/work/components/ProjectFacts'
import { WorkCtaBanner } from '#/features/work/components/WorkCtaBanner'
import { WorkContent } from '#/features/work/lib/work-content'

/** Short write-ups don't need an on-this-page nav — only the deep dives do. */
const TOC_MIN_HEADINGS = 4

export function WorkDetailPage() {
  const { slug } = useParams({ from: '/work/$slug' })
  const project = WorkContent.get(slug)
  if (!project) return null
  const showToc = project.toc.length >= TOC_MIN_HEADINGS

  return (
    <div className="mx-auto w-full max-w-shell px-5 md:px-7 py-10 md:py-16">
      <div className="flex items-start gap-10">
        {showToc ? (
          <aside className="sticky top-24 hidden w-60 flex-none lg:block">
            <Toc toc={project.toc} />
          </aside>
        ) : null}
        <main className="mx-auto w-full max-w-article min-w-0">
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
      </div>
    </div>
  )
}
