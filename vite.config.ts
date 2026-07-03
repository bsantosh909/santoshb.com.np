import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkReadingTime from './src/lib/remark-reading-time.mjs'
import remarkTocExport from './src/lib/remark-toc-export.mjs'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  build: { sourcemap: true },
  server: {
    // cloudflared quick tunnels (`cloudflared tunnel --url localhost:3000`)
    allowedHosts: ['.trycloudflare.com'],
  },
  plugins: [
    devtools(),
    tailwindcss(),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
          remarkReadingTime,
          remarkTocExport,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypePrettyCode,
            { theme: { light: 'github-light', dark: 'github-dark' } },
          ],
        ],
      }),
    },
    nitro(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
      },
      pages: [
        {
          path: '/404',
          prerender: {
            enabled: true,
            outputPath: '/404.html',
            autoSubfolderIndex: false,
          },
        },
      ],
    }),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

export default config
