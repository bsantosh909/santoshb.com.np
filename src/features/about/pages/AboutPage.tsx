import { Link } from '@tanstack/react-router'
import { Reveal } from '#/features/motion/components/Reveal'
import { AboutIntro } from '#/features/about/components/AboutIntro'
import { ToolkitSection } from '#/features/about/components/ToolkitSection'
import { JourneyTimeline } from '#/features/about/components/JourneyTimeline'

export function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-shell px-5 pt-12 pb-8 text-center md:px-7 md:pt-22 md:pb-12 md:text-left">
        <span className="animate-rise font-mono text-label uppercase text-faint">
          About me
        </span>
        <h1 className="mx-auto mt-4 max-w-4xl animate-rise font-display text-display-xl font-extrabold text-balance md:mx-0">
          Developer, writer<span className="text-accent">,</span> thinker.
        </h1>
      </section>
      <AboutIntro />
      <ToolkitSection />
      <JourneyTimeline />
      <section className="mx-auto max-w-shell px-5 md:px-7 pb-14 md:pb-25">
        <Reveal className="flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
          <Link
            to="/work/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 md:px-7 py-3.5 font-semibold text-bg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut shadow-tint-accent"
          >
            See my work <span className="text-lg">↘</span>
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 rounded-full border-brut px-5 md:px-7 py-3.5 font-semibold text-ink no-underline transition-transform duration-300 hover:-translate-y-1"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
