declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const Component: ComponentType<{
    components?: Record<string, ComponentType>
  }>
  export default Component
  export const frontmatter: unknown
  export const readingTime: {
    minutes: number
    words: number
    text: string
  }
  export const toc: Array<{ depth: 2 | 3; text: string; id: string }>
}
