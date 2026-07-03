import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '#/features/about/pages/AboutPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    Seo.page({
      title: 'About - Santosh Bhandari',
      description:
        'Full stack developer from Nepal — React/Next, Node, and AI-powered products, built end to end.',
      path: '/about/',
    }),
  component: AboutPage,
})
