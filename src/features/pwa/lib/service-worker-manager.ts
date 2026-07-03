export class ServiceWorkerManager {
  /**
   * Registers /sw.js — the same path v3's Nuxt PWA used, so the new worker
   * (built with skipWaiting + clientsClaim) replaces the stale one that
   * returning visitors still have installed.
   */
  static register(): void {
    if (import.meta.env.DEV) return
    if (typeof navigator === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => {
      /* offline support is progressive enhancement — never break the page */
    })
  }
}
