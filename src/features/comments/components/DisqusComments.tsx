import { useEffect, useRef, useState } from 'react'
import { SiteConfig } from '#/features/seo/lib/site-config'

const DISQUS_SHORTNAME = 'santoshb'

interface DisqusComments {
  /** Bare post slug — v3 keyed existing threads this way; do not change. */
  identifier: string
  title: string
}

declare global {
  interface Window {
    disqus_config?: (this: {
      page: { url: string; identifier: string; title: string }
    }) => void
    DISQUS?: { reset: (options: { reload: boolean }) => void }
  }
}

/**
 * Lazy-loads the Disqus embed when the container scrolls into view so it
 * never competes with page rendering.
 */
export function DisqusComments({ identifier, title }: DisqusComments) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const url = SiteConfig.absoluteUrl(`/blog/${identifier}/`)
    window.disqus_config = function () {
      this.page.url = url
      this.page.identifier = identifier
      this.page.title = title
    }
    if (window.DISQUS) {
      window.DISQUS.reset({ reload: true })
      return
    }
    const script = document.createElement('script')
    script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', String(Date.now()))
    document.body.appendChild(script)
  }, [visible, identifier, title])

  return (
    <div ref={containerRef} className="mt-12 min-h-80">
      <div id="disqus_thread" />
    </div>
  )
}
