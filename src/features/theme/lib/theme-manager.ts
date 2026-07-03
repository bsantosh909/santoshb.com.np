export type ThemeName = 'light' | 'dark'

export class ThemeManager {
  static readonly storageKey = 'sb-theme'

  /**
   * Runs before first paint (inlined in <head>) so the initial render
   * matches the stored/system preference and never flashes.
   */
  static readonly initScript = `(function(){try{var t=localStorage.getItem('${'sb-theme'}');if(t!=='dark'&&t!=='light'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

  static current(): ThemeName {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light'
  }

  static set(theme: ThemeName): void {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(ThemeManager.storageKey, theme)
    } catch {
      /* storage unavailable (private mode) — theme still applies */
    }
  }

  /**
   * Re-applies the stored theme. React hydration re-renders <html> and can
   * drop the data-theme the pre-paint script set — call this from a layout
   * effect so the fix lands before the browser paints.
   */
  static restore(): void {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(ThemeManager.storageKey)
    } catch {
      /* storage unavailable */
    }
    const theme: ThemeName =
      stored === 'dark' || stored === 'light'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }

  static toggle(): ThemeName {
    const next = ThemeManager.current() === 'dark' ? 'light' : 'dark'
    ThemeManager.set(next)
    return next
  }
}
