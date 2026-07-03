import PrivacyContent from '#/content/pages/privacy.mdx'

export function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-article px-5 md:px-7 py-10 md:py-16">
      <article className="prose mt-4 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-a:text-link">
        <PrivacyContent />
      </article>
    </main>
  )
}
