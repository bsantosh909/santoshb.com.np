import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '#/features/home/pages/HomePage'
import { Seo } from '#/features/seo/lib/seo'
import { SiteConfig } from '#/features/seo/lib/site-config'

export const Route = createFileRoute('/')({
  head: () =>
    Seo.page({
      title: SiteConfig.title,
      description: SiteConfig.description,
      path: '/',
    }),
  component: HomePage,
})
