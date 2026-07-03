import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from '@tanstack/react-router'
import { BrandMark } from '#/features/layout/components/BrandMark'
import { CloseIcon } from '#/features/design-system/components/icons/CloseIcon'
import { PathIcon } from '#/features/design-system/components/icons/PathIcon'
import { Navigation } from '#/features/layout/lib/navigation'
import { SocialLinks } from '#/features/contact/lib/social-links'
import { cn } from '#/features/design-system/lib/cn'

interface MobileNavDrawerProps {
  open: boolean
  onClose: () => void
}

/**
 * Right-side navigation drawer (portaled to <body> — the sticky header's
 * backdrop-filter would otherwise trap position:fixed descendants).
 * Stays mounted so the slide/fade transitions run both ways.
 */
export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-60 md:hidden',
        open ? '' : 'pointer-events-none',
      )}
      inert={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          'absolute inset-0 w-full cursor-default bg-ink-fixed/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        className={cn(
          'absolute top-0 right-0 flex h-full w-72 max-w-[80vw] flex-col border-l-2 border-line bg-bg px-6 py-5 transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between">
          <BrandMark size="sm" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="grid size-9 cursor-pointer place-items-center rounded-full border-brut bg-transparent text-ink"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
        <nav className="mt-6 flex flex-1 flex-col">
          {Navigation.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="border-b border-chip py-3.5 font-display text-xl font-bold text-ink no-underline"
              activeProps={{ className: 'text-accent no-underline' }}
              activeOptions={{ exact: item.to === '/' }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact/"
            onClick={onClose}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-bg no-underline"
          >
            Say hello
          </Link>
        </nav>
        <div className="flex items-center gap-2.5 border-t border-chip pt-4">
          {SocialLinks.all.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener"
              aria-label={link.name}
              title={link.name}
              className="grid size-9.5 place-items-center rounded-tile border-brut bg-surface text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              <PathIcon path={link.iconPath} className="size-4" />
            </a>
          ))}
        </div>
      </aside>
    </div>,
    document.body,
  )
}
