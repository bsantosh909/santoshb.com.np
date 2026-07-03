import { Reveal } from '#/features/motion/components/Reveal'
import { OssContributions } from '#/features/work/components/OssContributions'
import { ProjectCard } from '#/features/work/components/ProjectCard'
import { WorkCtaBanner } from '#/features/work/components/WorkCtaBanner'
import { WorkContent } from '#/features/work/lib/work-content'

export function WorkPage() {
  return (
    <main>
      <section className="mx-auto max-w-shell px-5 pt-12 pb-9 md:px-7 md:pt-22 md:pb-15">
        <span className="animate-rise font-mono text-label uppercase text-faint">
          Selected work
        </span>
        <h1 className="mt-4 max-w-4xl animate-rise font-display text-display-xl font-extrabold text-balance">
          Things I've built<span className="text-accent">.</span>
        </h1>
        <p className="mt-5.5 max-w-2xl animate-rise text-sub text-muted">
          A hand-picked selection — there's plenty more on GitHub, in private
          codebases, and behind NDAs. Tap any card for the story behind it.
        </p>
      </section>
      <section className="mx-auto max-w-shell px-5 pb-12 md:px-7 md:pb-20">
        <Reveal className="mb-8 flex flex-col items-start gap-3">
          <span className="font-mono text-label uppercase text-faint">
            Professional
          </span>
          <h2 className="m-0 font-display text-display-lg font-extrabold">
            On the job
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3">
          {WorkContent.byKind('professional').map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-shell px-5 pb-12 md:px-7 md:pb-20">
        <Reveal className="mb-8 flex flex-col items-start gap-3">
          <span className="font-mono text-label uppercase text-faint">
            Personal
          </span>
          <h2 className="m-0 font-display text-display-lg font-extrabold">
            In my free time
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3">
          {WorkContent.byKind('personal').map((project) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-shell px-5 pb-14 md:px-7 md:pb-25">
        <OssContributions />
        <Reveal>
          <WorkCtaBanner />
        </Reveal>
      </section>
    </main>
  )
}
