import { Reveal } from '#/features/motion/components/Reveal'
import { ContactHero } from '#/features/contact/components/ContactHero'
import { SocialCard } from '#/features/contact/components/SocialCard'
import { SocialLinks } from '#/features/contact/lib/social-links'

export function ContactPage() {
  return (
    <main className="mx-auto max-w-shell px-5 md:px-7 pt-10 pb-14 md:pt-20 md:pb-22">
      <ContactHero />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SocialLinks.all.map((link) => (
          <Reveal key={link.name}>
            <SocialCard link={link} />
          </Reveal>
        ))}
      </div>
    </main>
  )
}
