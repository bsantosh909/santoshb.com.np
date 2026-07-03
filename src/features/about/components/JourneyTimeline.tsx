import { Reveal } from '#/features/motion/components/Reveal'
import { TimelineEntry } from '#/features/about/components/TimelineEntry'
import { AboutContent } from '#/features/about/lib/about-content'

export function JourneyTimeline() {
  return (
    <section className="mx-auto max-w-shell px-5 md:px-7 py-14 md:py-25">
      <Reveal className="mb-12 flex flex-col items-start gap-3">
        <span className="font-mono text-label uppercase text-faint">
          Journey
        </span>
        <h2 className="m-0 font-display text-display-lg font-extrabold">
          How I got here
        </h2>
      </Reveal>
      <div>
        {AboutContent.journey.map((entry) => (
          <Reveal key={entry.period} className="group/timeline">
            <TimelineEntry entry={entry} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
