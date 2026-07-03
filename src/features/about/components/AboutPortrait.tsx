export function AboutPortrait() {
  return (
    <div className="relative w-56 flex-none md:w-72">
      <div className="grid aspect-4/5 w-full place-items-center overflow-hidden rounded-card-lg border-brut-2 bg-surface-alt">
        <img
          src="/img/portrait-outdoor.webp"
          srcSet="/img/portrait-outdoor-480.webp 480w, /img/portrait-outdoor-640.webp 640w, /img/portrait-outdoor.webp 800w"
          sizes="(min-width: 768px) 288px, 224px"
          alt="Santosh Bhandari in the mountains at sunset"
          width={800}
          height={1000}
          className="size-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none'
          }}
        />
      </div>
      <div className="absolute -right-4 -bottom-4 -rotate-4 rounded-full border-brut-2 border-ink-fixed bg-accent-lime px-3.5 py-2 font-mono text-xs font-bold text-ink-fixed">
        Nepal 🇳🇵 · remote
      </div>
    </div>
  )
}
