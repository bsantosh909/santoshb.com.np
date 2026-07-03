import { createFileRoute, notFound } from '@tanstack/react-router'
import { WorkContent } from '#/features/work/lib/work-content'
import { WorkDetailPage } from '#/features/work/pages/WorkDetailPage'
import { Seo } from '#/features/seo/lib/seo'

export const Route = createFileRoute('/work/$slug')({
  loader: ({ params }) => {
    const project = WorkContent.get(params.slug)
    if (!project) throw notFound()
    return project.meta
  },
  head: ({ loaderData }) =>
    loaderData
      ? Seo.page({
          title: `${loaderData.name} - Work - Santosh Bhandari`,
          description: loaderData.summary,
          path: `/work/${loaderData.slug}/`,
        })
      : {},
  component: WorkDetailPage,
})
