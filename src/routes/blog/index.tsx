import { createFileRoute } from '@tanstack/react-router'
import { BlogIndexPage } from '#/features/blog/pages/BlogIndexPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/blog/')({
  head: () =>
    Seo.page({
      title: 'Writing - Santosh Bhandari',
      description:
        'Essays, notes on web development and APIs, and the occasional tangent.',
      path: '/blog/',
    }),
  component: BlogIndexPage,
})
