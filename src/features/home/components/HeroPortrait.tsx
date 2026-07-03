import { StarburstIcon } from '#/features/design-system/components/icons/StarburstIcon'

export function HeroPortrait() {
  return (
    <div className="relative mx-auto size-70 flex-none md:size-90">
      <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 scale-105 rounded-full bg-accent-blue" />
      <div className="absolute inset-0 grid place-items-center overflow-hidden rounded-full border-brut-2 bg-surface-alt">
        <img
          src="/img/portrait.webp"
          srcSet="/img/portrait-480.webp 480w, /img/portrait-640.webp 640w, /img/portrait.webp 800w"
          sizes="(min-width: 768px) 360px, 280px"
          width={800}
          height={800}
          alt="Portrait of Santosh Bhandari"
          className="size-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <div className="absolute top-1 left-1 size-15 animate-float-c rounded-card-sm border-brut-2 border-ink-fixed bg-accent-amber" />
      <div className="absolute right-0 bottom-1.5 size-13 animate-float-b rounded-full border-brut-2 border-ink-fixed bg-accent-pink md:-right-6" />
      <div className="absolute -bottom-5 left-8 size-11 animate-float-c border-brut-2 border-ink-fixed bg-accent-lime" />
      <StarburstIcon className="absolute top-7 -right-4 size-13 animate-spin-slow overflow-visible md:-right-7" />
    </div>
  )
}
