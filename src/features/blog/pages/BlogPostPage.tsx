import { useParams } from '@tanstack/react-router'
import { BlogContent } from '#/features/blog/lib/blog-content'
import { DisqusComments } from '#/features/comments/components/DisqusComments'
import { PostArticle } from '#/features/blog/components/PostArticle'
import { PostBanner } from '#/features/blog/components/PostBanner'
import { PostCtaBanner } from '#/features/blog/components/PostCtaBanner'
import { PostHeader } from '#/features/blog/components/PostHeader'
import { PostNav } from '#/features/blog/components/PostNav'
import { PostTagList } from '#/features/blog/components/PostTagList'
import { PostToc } from '#/features/blog/components/PostToc'

export function BlogPostPage() {
  const { slug } = useParams({ from: '/blog/$slug' })
  const post = BlogContent.get(slug)
  if (!post) return null
  const { older, newer } = BlogContent.adjacent(slug)
  const title = post.meta.subtitle
    ? `${post.meta.title} - ${post.meta.subtitle}`
    : post.meta.title

  return (
    <div className="mx-auto w-full max-w-shell px-5 md:px-7 py-10 md:py-16">
      <div className="flex items-start gap-10">
        <aside className="sticky top-24 hidden w-60 flex-none lg:block">
          <PostToc toc={post.toc} />
        </aside>
        <main className="mx-auto w-full max-w-article min-w-0">
          <PostHeader meta={post.meta} />
          <PostBanner
            post={post.meta}
            loading="eager"
            className="mt-8 rounded-card border-brut"
          />
          <PostArticle post={post} />
          <footer className="mt-10 border-t-2 border-line pt-6">
            <PostTagList tags={post.meta.tags} />
          </footer>
          <PostNav older={older} newer={newer} />
          <PostCtaBanner />
          <DisqusComments identifier={slug} title={title} />
        </main>
      </div>
    </div>
  )
}
