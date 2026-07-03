import { createFileRoute } from '@tanstack/react-router'
import { NotFoundPage } from '#/features/layout/pages/NotFoundPage'

/**
 * Static hosts serve /404.html for unknown paths — this route exists only
 * so the prerenderer can emit that file (see `pages` in vite.config.ts).
 */
export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [
      { title: 'Not found - Santosh Bhandari' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: NotFoundPage,
})
