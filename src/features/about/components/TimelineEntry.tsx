import { Accent } from '#/features/design-system/lib/accent'
import type { JourneyEntry } from '#/features/about/lib/about-content'
import { cn } from '#/features/design-system/lib/cn'

interface TimelineEntryProps {
  entry: JourneyEntry
}

export function TimelineEntry({ entry }: TimelineEntryProps) {
  return (
    // Each entry draws its own line segment, extended slightly into the
    // next entry so segments meet the following dot; the first starts at
    // its dot and the last entry draws none — the line never runs past
    // the final dot.
    <div className="relative pb-9.5 pl-8 group-last/timeline:pb-0">
      <span
        aria-hidden
        className="absolute top-0 -bottom-1.25 left-0 w-0.5 bg-line group-first/timeline:top-2 group-last/timeline:hidden"
      />
      <div
        className={cn(
          'absolute top-1 -left-1.75 size-4 rounded-full border-brut-2',
          Accent.bg[entry.accent],
        )}
      />
      <div className="font-mono text-label normal-case text-faint">
        {entry.period}
      </div>
      <h3 className="mt-1 mb-1.5 font-display text-2xl font-bold">
        {entry.role}
      </h3>
      <p className="m-0 max-w-prose text-card text-muted">{entry.summary}</p>
    </div>
  )
}
