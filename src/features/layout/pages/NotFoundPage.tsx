import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex max-w-shell flex-col items-start gap-6 px-5 md:px-7 py-24">
      <span className="font-mono text-label uppercase text-faint">404</span>
      <h1 className="font-display text-display-xl font-extrabold">
        Nothing here<span className="text-accent">.</span>
      </h1>
      <p className="max-w-prose text-sub text-muted">
        The page you're after moved, never existed, or is hiding. The writing
        and work are still where they should be.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 md:px-7 py-3.5 font-semibold text-bg no-underline transition-transform hover:-translate-y-1"
      >
        Back home →
      </Link>
    </main>
  )
}
