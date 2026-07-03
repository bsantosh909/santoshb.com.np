import { SiteHeader } from '#/features/layout/components/SiteHeader'
import { SiteFooter } from '#/features/layout/components/SiteFooter'
import type { ReactNode } from 'react'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-bg text-ink">
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
