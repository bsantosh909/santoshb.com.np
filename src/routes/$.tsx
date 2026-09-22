import { createFileRoute } from '@tanstack/react-router'
import {
  NotFoundPage,
  notFoundHead,
} from '#/features/layout/pages/NotFoundPage'

/**
 * Catch-all for paths that match no route, and the source of the prerendered
 * 404.html (vite.config.ts renders `/404` through here).
 *
 * This deliberately replaces a dedicated `/404` route. Static hosts serve
 * 404.html while keeping the requested URL, so the client resolves whichever
 * route matches *that* path. With two routes both supplying a not-found head,
 * the server-rendered tags and the client's were emitted separately and the
 * page ended up with a duplicated `robots` meta, which broke hydration. One
 * route covering both cases keeps the head identical by construction.
 */
export const Route = createFileRoute('/$')({
  head: notFoundHead,
  component: NotFoundPage,
})
