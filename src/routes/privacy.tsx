import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPage } from '#/features/legal/pages/PrivacyPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/privacy')({
  head: () =>
    Seo.page({
      title: 'Privacy Policy - Santosh Bhandari',
      description:
        'Privacy policy for santoshb.com.np — what is collected, how it is used.',
      path: '/privacy/',
    }),
  component: PrivacyPage,
})
