import { createFileRoute, notFound } from '@tanstack/react-router'
import { BlogContent } from '#/features/blog/lib/blog-content'
import { BlogPostPage } from '#/features/blog/pages/BlogPostPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = BlogContent.get(params.slug)
    if (!post) throw notFound()
    return post.meta
  },
  head: ({ loaderData }) => (loaderData ? Seo.article(loaderData) : {}),
  component: BlogPostPage,
})
