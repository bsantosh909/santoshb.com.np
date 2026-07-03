import { Reveal } from '#/features/motion/components/Reveal'
import { OssContributionRow } from '#/features/work/components/OssContributionRow'
import { OssOtherTile } from '#/features/work/components/OssOtherTile'
import { OssContributions as Oss } from '#/features/work/lib/oss-contributions'

export function OssContributions() {
  return (
    <div>
      <Reveal className="mb-2 flex flex-col items-start gap-3">
        <span className="font-mono text-label uppercase text-faint">
          Contributions
        </span>
        <h2 className="m-0 font-display text-display-lg font-extrabold">
          Open source
        </h2>
        <p className="m-0 max-w-2xl text-sub text-muted">
          {Oss.totalMergedPrs()}+ merged pull requests across the ecosystem — a
          few favorites:
        </p>
      </Reveal>
      <div className="border-t border-chip">
        {Oss.highlights().map((contribution) => (
          <Reveal key={contribution.repo}>
            <OssContributionRow contribution={contribution} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <h3 className="m-0 mb-5 font-mono text-label uppercase text-faint">
          Other contributions
        </h3>
        <div className="flex flex-wrap gap-3">
          {Oss.others().map((contribution) => (
            <OssOtherTile key={contribution.repo} contribution={contribution} />
          ))}
        </div>
      </Reveal>
    </div>
  )
}
