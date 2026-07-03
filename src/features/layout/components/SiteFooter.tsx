import { Link } from '@tanstack/react-router'
import { BrandMark } from '#/features/layout/components/BrandMark'
import { FooterSocialLink } from '#/features/layout/components/FooterSocialLink'
import { SocialLinks } from '#/features/contact/lib/social-links'
import { SiteConfig } from '#/features/seo/lib/site-config'

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line bg-surface-alt">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-7 px-5 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-7">
        <div>
          <div className="flex items-center justify-center gap-2.5 sm:justify-start">
            <BrandMark />
            <span className="font-display text-lg font-bold text-ink">
              {SiteConfig.name}
            </span>
          </div>
          <p className="m-0 mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Building things end to end, from Nepal 🇳🇵
          </p>
          <a
            href={`mailto:${SocialLinks.email}`}
            className="mt-2.5 inline-block border-b-2 border-accent-lime pb-0.5 text-sm font-semibold text-ink no-underline transition-colors hover:text-accent"
          >
            {SocialLinks.email}
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          {SocialLinks.all.map((link) => (
            <FooterSocialLink
              key={link.name}
              name={link.name}
              url={link.url}
              iconPath={link.iconPath}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-chip">
        <div className="mx-auto flex max-w-shell flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 py-4.5 text-xs text-faint sm:justify-between md:px-7">
          <span>
            © {new Date().getFullYear()} {SiteConfig.name}
          </span>
          <span className="flex items-center gap-5">
            <Link
              to="/privacy/"
              className="text-faint no-underline transition-colors hover:text-ink"
            >
              Privacy
            </Link>
            <span className="font-mono">
              Made with too much tea<span className="text-accent">.</span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  )
}
