import { Reveal } from '#/features/motion/components/Reveal'
import { Accent } from '#/features/design-system/lib/accent'
import { BlogContent } from '#/features/blog/lib/blog-content'
import { FeaturedPostCard } from '#/features/blog/components/FeaturedPostCard'
import { PostCard } from '#/features/blog/components/PostCard'

export function BlogIndexPage() {
  const posts = BlogContent.all()
  const featured = posts.at(0)
  const rest = posts.slice(1)
  return (
    <main>
      <section className="mx-auto max-w-shell px-5 md:px-7 pt-12 pb-7 md:pt-22 md:pb-12">
        <span className="animate-rise font-mono text-label uppercase text-faint">
          Writing
        </span>
        <h1 className="mt-4 max-w-3xl animate-rise font-display text-display-xl font-extrabold text-balance">
          Notes &amp; free-time thinking<span className="text-accent">.</span>
        </h1>
        <p className="mt-5.5 max-w-2xl animate-rise text-sub text-muted">
          Essays, things I learn while building, and the occasional tangent.
        </p>
      </section>
      <section className="mx-auto max-w-shell px-5 md:px-7 pb-14 md:pb-25">
        {featured ? (
          <>
            {/* Big ink panel only from md up — on mobile the latest post is a regular card. */}
            <Reveal className="hidden md:block">
              <FeaturedPostCard post={featured} />
            </Reveal>
            <Reveal className="mb-4.5 md:hidden">
              <PostCard post={featured} accent={Accent.forKey(featured.slug)} />
            </Reveal>
          </>
        ) : null}
        <div className="flex flex-col gap-4.5">
          {rest.map((post, index) => (
            <Reveal key={post.slug}>
              <PostCard post={post} accent={Accent.forIndex(index)} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
