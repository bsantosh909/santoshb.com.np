import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
}

/**
 * Fades content in from below when it enters the viewport
 * (styles live on [data-reveal] in styles.css). Content is fully
 * visible without JS and for reduced-motion users.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    const failsafe = setTimeout(() => el.classList.add('in'), 1400)
    return () => {
      observer.disconnect()
      clearTimeout(failsafe)
    }
  }, [])

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}
