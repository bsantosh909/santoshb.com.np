import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import { valueToEstree } from 'estree-util-value-to-estree'

/**
 * Exports `toc` (h2/h3 entries with github-slugger ids — the same
 * algorithm rehype-slug uses on the rendered headings) from each MDX module.
 */
export default function remarkTocExport() {
  return (tree) => {
    const slugger = new GithubSlugger()
    const toc = []
    visit(tree, 'heading', (node) => {
      if (node.depth < 2 || node.depth > 3) return
      const text = toString(node)
      toc.push({ depth: node.depth, text, id: slugger.slug(text) })
    })
    tree.children.push({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: 'toc' },
                    init: valueToEstree(toc),
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}
