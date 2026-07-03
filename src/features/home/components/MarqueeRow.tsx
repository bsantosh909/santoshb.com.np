import { Accent } from '#/features/design-system/lib/accent'
import { TechIcon } from '#/features/design-system/components/TechIcon'
import { Skills } from '#/features/home/lib/skills'

interface MarqueeRowProps {
  hidden?: boolean
}

export function MarqueeRow({ hidden }: MarqueeRowProps) {
  return (
    <div
      aria-hidden={hidden}
      className="flex items-center gap-9 pr-9 font-display text-2xl font-bold whitespace-nowrap text-paper-fixed"
    >
      {Skills.marquee.map((skill) => (
        <span key={skill.label} className="contents">
          <span className="inline-flex items-center gap-2.5">
            <TechIcon label={skill.label} className="size-5.5" />
            {skill.label}
          </span>
          <span className={Accent.text[skill.accent]}>✦</span>
        </span>
      ))}
    </div>
  )
}
