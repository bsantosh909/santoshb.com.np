import { visit } from 'unist-util-visit'
import { valueToEstree } from 'estree-util-value-to-estree'

const WORDS_PER_MINUTE = 200

/**
 * Counts words in the document and appends
 * `export const readingTime = { minutes, words, text }` to each MDX module.
 */
export default function remarkReadingTime() {
  return (tree) => {
    let words = 0
    visit(tree, ['text', 'code', 'inlineCode'], (node) => {
      words += String(node.value).trim().split(/\s+/).filter(Boolean).length
    })
    const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
    const readingTime = { minutes, words, text: `${minutes} min read` }
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
                    id: { type: 'Identifier', name: 'readingTime' },
                    init: valueToEstree(readingTime),
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
