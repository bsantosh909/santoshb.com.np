import { SiteConfig } from '#/features/seo/lib/site-config'

export function PostAuthorRow() {
  return (
    <div className="mt-7.5 mb-2 flex items-center gap-3 border-b-2 border-line pb-7.5">
      <span className="grid size-10.5 place-items-center rounded-full bg-ink-fixed font-display text-lg font-extrabold text-accent-lime dark:border dark:border-line">
        S
      </span>
      <div>
        <div className="text-card font-semibold">{SiteConfig.name}</div>
        <div className="font-mono text-xs text-faint">Full stack developer</div>
      </div>
    </div>
  )
}
