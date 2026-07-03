import { Hero } from '#/features/home/components/Hero'
import { SkillsMarquee } from '#/features/home/components/SkillsMarquee'
import { IntroSection } from '#/features/home/components/IntroSection'
import { FeaturedWork } from '#/features/home/components/FeaturedWork'

export function HomePage() {
  return (
    <main>
      <Hero />
      <SkillsMarquee />
      <IntroSection />
      <FeaturedWork />
    </main>
  )
}
