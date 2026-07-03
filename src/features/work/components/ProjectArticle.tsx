import type { ProjectEntry } from '#/features/work/lib/work-content'

export function ProjectArticle({ project }: { project: ProjectEntry }) {
  const { Component } = project
  return (
    <article className="prose prose-lg mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink prose-a:text-link prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:font-display prose-blockquote:text-xl prose-blockquote:font-semibold prose-blockquote:not-italic prose-code:rounded-md prose-code:bg-surface-alt prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-ink prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-card-sm prose-pre:border-brut prose-img:rounded-card-sm prose-img:border-brut">
      <Component />
    </article>
  )
}
