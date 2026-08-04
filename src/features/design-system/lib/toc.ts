/** Heading entry emitted by the `remark-toc-export` plugin for every MDX module. */
export interface TocEntry {
  depth: 2 | 3
  text: string
  id: string
}
