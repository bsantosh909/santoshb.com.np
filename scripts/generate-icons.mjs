import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

/**
 * Brand icons from the "S" tile: favicon.svg (crisp at any size),
 * PNG app icons for the manifest, and apple-touch-icon. Run via
 * `npm run icons` after changing brand colors.
 */

const root = process.cwd()
const fonts = [
  {
    name: 'Bricolage Grotesque',
    weight: 800,
    data: readFileSync(join(root, 'assets/fonts/bricolage-800.ttf')),
  },
]

const INK = '#16110b'
const LIME = '#aee03a'

// maskable=true fills the whole canvas (safe-zone rules); false keeps the
// rounded tile silhouette on transparency.
function tileTree({ size, maskable }) {
  const radius = maskable ? 0 : Math.round(size * 0.28)
  const fontSize = Math.round(size * (maskable ? 0.52 : 0.62))
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: INK,
        borderRadius: radius,
        color: LIME,
        fontFamily: 'Bricolage Grotesque',
        fontWeight: 800,
        fontSize,
      },
      children: 'S',
    },
  }
}

async function render(size, maskable) {
  return satori(tileTree({ size, maskable }), {
    width: size,
    height: size,
    fonts,
  })
}

const svg = await render(512, false)
writeFileSync(join(root, 'public/favicon.svg'), svg)

for (const [file, size, maskable] of [
  ['public/logo192.png', 192, true],
  ['public/logo512.png', 512, true],
  ['public/apple-touch-icon.png', 180, true],
  ['public/favicon-32.png', 32, false],
]) {
  const png = new Resvg(await render(size, maskable)).render().asPng()
  writeFileSync(join(root, file), png)
  console.log('wrote', file)
}
