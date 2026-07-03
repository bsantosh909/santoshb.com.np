import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from '#/features/contact/pages/ContactPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    Seo.page({
      title: 'Contact - Santosh Bhandari',
      description:
        'Got an idea, a role, or just want to say hi? Reach Santosh Bhandari — @bsantosh909 on just about every platform.',
      path: '/contact/',
    }),
  component: ContactPage,
})
