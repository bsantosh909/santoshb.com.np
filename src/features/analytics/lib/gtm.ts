export class Gtm {
  static readonly containerId: string | undefined = import.meta.env
    .VITE_GTM_ID as string | undefined

  static get enabled(): boolean {
    return Boolean(Gtm.containerId)
  }

  /** Standard GTM bootstrap, inlined in <head> when a container ID is set. */
  static get snippet(): string {
    return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${Gtm.containerId ?? ''}');`
  }

  /**
   * SPA navigations don't reload the page, so GTM never sees them — push a
   * page_view per route change. Keep GA4's built-in history trigger OFF in
   * the container to avoid double counting.
   */
  static pageView(path: string): void {
    if (!Gtm.enabled || typeof window === 'undefined') return
    const dataLayer = ((
      window as unknown as { dataLayer?: Array<unknown> }
    ).dataLayer ??= [])
    dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }
}
