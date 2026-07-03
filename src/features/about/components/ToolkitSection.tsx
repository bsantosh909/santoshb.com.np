import { Reveal } from '#/features/motion/components/Reveal'
import { ToolkitRow } from '#/features/about/components/ToolkitRow'
import { AboutContent } from '#/features/about/lib/about-content'

export function ToolkitSection() {
  return (
    <section className="py-14 md:py-25">
      <div className="mx-auto max-w-shell px-5 md:px-7">
        <Reveal className="mb-6 flex flex-col items-start gap-3">
          <span className="font-mono text-label uppercase text-faint">
            Toolkit
          </span>
          <h2 className="m-0 font-display text-display-lg font-extrabold text-ink">
            What I work with
          </h2>
        </Reveal>
        <div className="border-t border-chip">
          {AboutContent.toolkit.map((category) => (
            <Reveal key={category.title}>
              <ToolkitRow category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
