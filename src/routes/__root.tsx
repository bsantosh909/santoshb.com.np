import { useEffect, useLayoutEffect } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { Gtm } from '#/features/analytics/lib/gtm'
import { ServiceWorkerManager } from '#/features/pwa/lib/service-worker-manager'
import { SiteLayout } from '#/features/layout/components/SiteLayout'
import { NotFoundPage } from '#/features/layout/pages/NotFoundPage'
import { ThemeManager } from '#/features/theme/lib/theme-manager'
import { Seo } from '#/features/seo/lib/seo'
import { SiteConfig } from '#/features/seo/lib/site-config'
import appCss from '../styles.css?url'
import bricolageWoff2 from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url'
import spaceGroteskWoff2 from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'
import spaceMonoWoff2 from '@fontsource/space-mono/files/space-mono-latin-400-normal.woff2?url'

const FONT_PRELOADS = [bricolageWoff2, spaceGroteskWoff2, spaceMonoWoff2].map(
  (href) => ({
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href,
    // required for font preloads even same-origin
    crossOrigin: 'anonymous' as const,
  }),
)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: SiteConfig.title,
      },
      {
        name: 'description',
        content: SiteConfig.description,
      },
    ],
    links: [
      ...FONT_PRELOADS,
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Santosh Bhandari — Blog',
        href: '/feed.xml',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.webmanifest',
      },
    ],
    scripts: [
      ...(Gtm.enabled ? [{ children: Gtm.snippet }] : []),
      Seo.jsonLd(Seo.websiteSchema()),
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  shellComponent: RootDocument,
})

function RootComponent() {
  const router = useRouter()

  // Hydration can wipe the data-theme set by the pre-paint script; restore
  // it before the first post-hydration paint.
  useLayoutEffect(() => {
    ThemeManager.restore()
  }, [])

  useEffect(() => {
    ServiceWorkerManager.register()
    return router.subscribe('onResolved', ({ toLocation }) => {
      Gtm.pageView(toLocation.pathname)
    })
  }, [router])

  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // The pre-paint script below sets data-theme on <html> before React
  // hydrates. Rendering that same value here makes the client render match
  // the DOM — otherwise React 19 throws hydration error #418 and its
  // recovery re-render wipes the attribute (theme "reverts" to light).
  const theme =
    typeof document === 'undefined'
      ? undefined
      : (document.documentElement.getAttribute('data-theme') ?? undefined)
  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        {/* First thing in <head>: sets data-theme before any paint in every
            render mode — later placement can flash the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: ThemeManager.initScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
