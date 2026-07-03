import { SocialLinks } from '#/features/contact/lib/social-links'

export function ContactHero() {
  return (
    <div className="relative overflow-hidden rounded-card-xl bg-ink-fixed px-5 py-10 text-paper-fixed md:px-16 md:py-21">
      <div className="absolute -top-10 -right-7 size-42 animate-float-a rounded-full bg-accent-blue opacity-55 blur-sm" />
      <div className="absolute -bottom-12 left-1/4 size-35 animate-float-b rounded-full bg-accent opacity-40 blur-sm" />
      <div className="relative">
        <span className="animate-rise font-mono text-label uppercase text-faint-fixed">
          Contact
        </span>
        <h1 className="mt-3.5 max-w-3xl animate-rise font-display text-display-xl font-extrabold text-balance">
          Let's build something good.
        </h1>
        <p className="mt-6 mb-9 max-w-xl animate-rise text-lede text-ink-soft-fixed">
          Got an idea, a role, or just want to say hi? My inbox and DMs are open
          — I'm{' '}
          <span className="font-semibold text-accent-lime">
            {SocialLinks.handle}
          </span>{' '}
          on just about every platform.
        </p>
        <a
          href={`mailto:${SocialLinks.email}`}
          className="inline-flex animate-rise items-center gap-2 rounded-full bg-accent-lime px-5 md:px-7.5 py-4 text-lg font-bold text-ink-fixed no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-brut-sm shadow-tint-accent"
        >
          Start a conversation <span>→</span>
        </a>
      </div>
    </div>
  )
}
