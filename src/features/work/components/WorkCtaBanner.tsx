import { Link } from '@tanstack/react-router'

export function WorkCtaBanner() {
  return (
    <div className="mt-11 flex flex-wrap items-center justify-between gap-5 rounded-card-lg border-2 border-dashed border-line bg-surface-alt p-8 md:p-11">
      <div>
        <h3 className="m-0 mb-1.5 font-display text-2xl font-bold md:text-3xl">
          Want to see more?
        </h3>
        <p className="m-0 max-w-prose text-card text-muted">
          There's plenty more on GitHub, and I'm always building. Let's talk
          about what you need.
        </p>
      </div>
      <Link
        to="/contact/"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 md:px-7 py-3.5 font-semibold whitespace-nowrap text-bg no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut shadow-tint-accent"
      >
        Get in touch <span>→</span>
      </Link>
    </div>
  )
}
