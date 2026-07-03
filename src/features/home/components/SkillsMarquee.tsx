import { MarqueeRow } from '#/features/home/components/MarqueeRow'

export function SkillsMarquee() {
  return (
    <div className="overflow-hidden border-y-2 border-line bg-ink-fixed py-3">
      <div className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none">
        <MarqueeRow />
        <MarqueeRow hidden />
      </div>
    </div>
  )
}
