import { MoonIcon } from '#/features/design-system/components/icons/MoonIcon'
import { SunIcon } from '#/features/design-system/components/icons/SunIcon'
import { ThemeManager } from '#/features/theme/lib/theme-manager'

/**
 * Stateless by design: the icons swap purely via the `dark:` variant, so the
 * server-rendered markup is already correct for whatever theme the pre-paint
 * init script applied — no hydration flicker.
 */
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => ThemeManager.toggle()}
      className="grid size-10 cursor-pointer place-items-center rounded-full border-brut bg-transparent text-ink transition-transform duration-300 hover:rotate-25"
    >
      <SunIcon className="hidden size-4.75 dark:block" />
      <MoonIcon className="block size-4.5 dark:hidden" />
    </button>
  )
}
