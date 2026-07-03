import { Link } from '@tanstack/react-router'
import { Reveal } from '#/features/motion/components/Reveal'

export function IntroSection() {
  return (
    <section className="mx-auto max-w-shell px-5 py-16 md:px-7 md:py-27">
      <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        <Reveal className="font-mono text-label uppercase text-faint">
          Hello
        </Reveal>
        <Reveal>
          <p className="m-0 max-w-4xl font-display text-display-md font-semibold text-pretty">
            I build and ship products{' '}
            <span className="border-b-3 border-accent-blue font-semibold text-ink">
              end to end
            </span>{' '}
            — data model to the last pixel. Lately that means putting{' '}
            <span className="border-b-3 border-accent-pink font-semibold text-ink">
              AI
            </span>{' '}
            to work: LLM-powered features, agents, and the glue that makes them
            genuinely useful. Most at home in{' '}
            <span className="border-b-3 border-accent font-semibold text-ink">
              React / Next
            </span>
            .
          </p>
        </Reveal>
        <Reveal>
          <Link
            to="/about/"
            className="mt-3 inline-flex items-center gap-2 border-b-2 border-accent-lime pb-1 text-lg font-semibold text-ink no-underline transition-colors hover:text-accent"
          >
            More about me →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
