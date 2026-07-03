import { Link } from '@tanstack/react-router'
import { SocialLinks } from '#/features/contact/lib/social-links'

export function PostCtaBanner() {
  return (
    <div className="mt-9 flex flex-wrap items-center justify-between gap-4.5 rounded-card-lg bg-ink-fixed p-7 text-paper-fixed md:p-10">
      <div>
        <h3 className="m-0 mb-1 font-display text-2xl font-bold">
          Enjoyed this?
        </h3>
        <p className="m-0 text-sm text-ink-soft-fixed">
          Find me as{' '}
          <span className="text-accent-lime">{SocialLinks.handle}</span> — let's
          talk.
        </p>
      </div>
      <Link
        to="/contact/"
        className="inline-flex items-center gap-2 rounded-full bg-accent-lime px-6 py-3 text-card font-bold whitespace-nowrap text-ink-fixed no-underline transition-transform duration-300 hover:-translate-y-1"
      >
        Get in touch →
      </Link>
    </div>
  )
}
