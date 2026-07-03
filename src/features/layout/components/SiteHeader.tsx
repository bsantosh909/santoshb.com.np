import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { BrandMark } from '#/features/layout/components/BrandMark'
import { MenuToggleButton } from '#/features/layout/components/MenuToggleButton'
import { MobileNavDrawer } from '#/features/layout/components/MobileNavDrawer'
import { Navigation } from '#/features/layout/lib/navigation'
import { ThemeToggle } from '#/features/theme/components/ThemeToggle'
import { SiteConfig } from '#/features/seo/lib/site-config'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-line bg-nav backdrop-nav">
      <nav className="mx-auto flex max-w-shell items-center justify-between gap-4 px-5 py-3 md:px-7 md:py-3.5">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2.5 text-ink no-underline"
        >
          <BrandMark />
          <span className="font-display text-lg font-bold tracking-tight">
            {SiteConfig.name}
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {Navigation.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-ink no-underline transition-colors hover:text-accent"
              activeProps={{
                className:
                  'border-b-2 border-accent pb-0.5 font-semibold text-accent no-underline',
              }}
              activeOptions={{ exact: item.to === '/' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4.5 py-2.5 font-semibold whitespace-nowrap text-bg no-underline transition-colors hover:bg-accent hover:text-white"
          >
            Say hello
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />
          <MenuToggleButton
            open={menuOpen}
            onToggle={() => setMenuOpen((open) => !open)}
          />
        </div>
      </nav>
      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
