import { Link } from '@tanstack/react-router'
import { HeroPortrait } from '#/features/home/components/HeroPortrait'

export function Hero() {
  return (
    <section className="mx-auto max-w-shell px-5 md:px-7 pt-12 pb-8 md:pt-24 md:pb-15">
      <div className="flex flex-wrap items-center gap-8 md:gap-16">
        <div className="min-w-72 flex-1 basis-120 text-center md:text-left">
          <div className="inline-flex items-center gap-2.5 rounded-full border-brut border-ink-fixed bg-accent-lime px-3.5 py-2 font-mono text-label uppercase text-ink-fixed">
            <span className="size-2 animate-pulse-dot rounded-full bg-ink-fixed" />
            Full stack developer
          </div>
          <h1 className="mt-5.5 font-display font-extrabold">
            <span className="block text-hero">Santosh</span>
            <span className="block text-hero">
              Bhandari<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6.5 max-w-lg text-lede text-muted md:mx-0">
            I build things end to end —{' '}
            <span className="border-b-3 border-accent-blue font-semibold text-ink">
              backend
            </span>
            ,{' '}
            <span className="border-b-3 border-accent-amber font-semibold text-ink">
              frontend
            </span>
            , and the bits in between. Also a{' '}
            <span className="border-b-3 border-accent-pink font-semibold text-ink">
              writer
            </span>{' '}
            &amp; thinker.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5 md:justify-start">
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
          </div>
        </div>
        <HeroPortrait />
      </div>
    </section>
  )
}
