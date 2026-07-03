import { createFileRoute } from '@tanstack/react-router'
import { WorkPage } from '#/features/work/pages/WorkPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/work/')({
  head: () =>
    Seo.page({
      title: 'Work - Santosh Bhandari',
      description:
        'Selected projects built across the stack — platforms, apps, and interfaces.',
      path: '/work/',
    }),
  component: WorkPage,
})
