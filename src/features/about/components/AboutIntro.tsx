import { Reveal } from '#/features/motion/components/Reveal'
import { AboutPortrait } from '#/features/about/components/AboutPortrait'
import { StatCard } from '#/features/about/components/StatCard'
import { AboutContent } from '#/features/about/lib/about-content'

export function AboutIntro() {
  return (
    <section className="mx-auto max-w-shell px-5 md:px-7 pb-14 md:pb-25">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-16 md:text-left">
        <Reveal>
          <AboutPortrait />
        </Reveal>
        <Reveal className="min-w-72 flex-1 basis-115">
          <p className="m-0 mb-6 font-display text-display-md font-semibold text-pretty">
            I build and ship products end to end — and I care about the whole
            thing, from the data model to the last hover state.
          </p>
          <p className="m-0 mb-4.5 text-sub text-muted">
            My home turf is{' '}
            <span className="border-b-3 border-accent font-semibold text-ink">
              React/Next
            </span>{' '}
            and the modern{' '}
            <span className="border-b-3 border-accent-blue font-semibold text-ink">
              full stack JavaScript
            </span>{' '}
            ecosystem — clean APIs, solid data models, and interfaces that feel
            fast. Lately a lot of that is{' '}
            <span className="border-b-3 border-accent-pink font-semibold text-ink">
              AI work
            </span>
            : LLM-powered features, agents, and the plumbing that turns model
            output into product value.
          </p>
          <p className="m-0 text-sub text-muted">
            When I'm away from the editor, I write — essays, notes, and
            free-time thinking on my blog. Curiosity is the throughline:
            understand how something works, then rebuild it a little better.
          </p>
          <div className="mt-7.5 flex flex-wrap justify-center gap-3.5 md:justify-start">
            {AboutContent.stats().map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
