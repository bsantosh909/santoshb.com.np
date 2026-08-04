import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'

/**
 * Renders the hand-laid architecture diagrams to theme-paired WebP
 * (`<name>.webp` / `<name>-dark.webp`, each with a 1200w rung), the same
 * convention generate-banners.mjs uses. Run `npm run diagrams` after editing
 * a diagram's geometry.
 */

const root = process.cwd()
const outDir = join(root, 'public/img/diagrams')

const fonts = [
  join(root, 'assets/fonts/space-mono-700.ttf'),
  join(root, 'assets/fonts/space-grotesk-500.ttf'),
]

/** Tint blocks keep their light-mode ink in both themes, as they do on-site. */
const TINT = {
  lime: '#eaf6cf',
  pink: '#ffe0ec',
  ink: '#16110b',
  faint: '#6b6252',
}

/**
 * `accent` marks the device path (labels and strokes both). The site's
 * --color-accent-blue is only legible on paper — on the dark canvas it lands at
 * 3.0:1, under the 4.5:1 floor for the 10px edge labels, so dark lifts it to a
 * tint of the same hue at ~7.6:1.
 */
const THEMES = {
  light: {
    canvas: '#f3ecd9',
    panel: '#fffdf7',
    panelAlt: '#f3ecd9',
    ink: '#16110b',
    faint: '#6e6455',
    line: '#16110b',
    accent: '#2f49ff',
  },
  dark: {
    canvas: '#1a1510',
    panel: '#241d16',
    panelAlt: '#1f1812',
    ink: '#f6efe2',
    faint: '#998f80',
    line: '#5b4f40',
    accent: '#8fa3ff',
  },
}

const MONO = 'Space Mono'
const SANS = 'Space Grotesk'

const WIDTH = 1000
const HEIGHT = 690

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function box(x, y, w, h, fill, stroke, extra = '') {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${extra}/>`
}

/**
 * Type is sized for the diagram being *fitted* to the article column rather
 * than shown at native width — at 760px that is ~0.76x, so a 16px title lands
 * at ~12px on screen. Keep that scale factor in mind before shrinking anything.
 */
function label(
  x,
  y,
  text,
  { fill, size = 16, font = MONO, anchor = 'middle' },
) {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${font}" font-size="${size}" text-anchor="${anchor}">${esc(text)}</text>`
}

function arrow(d, { stroke, marker, width = 1.5, dash = '' }) {
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : ''
  return `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}"${dashAttr} marker-end="url(#${marker})"/>`
}

/**
 * Label sitting on the line it describes, on a canvas-colored chip that masks
 * the stroke behind it — floating text next to an edge reads as unattached.
 * Space Mono advances at 0.6em, so the chip can be sized from the glyph count.
 */
function edgeLabel(cx, cy, text, t, color, size = 13) {
  const w = text.length * size * 0.6 + 20
  const h = size + 13
  return (
    `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="6" fill="${t.canvas}"/>` +
    label(cx, cy + size * 0.35, text, { fill: color, size })
  )
}

/** Clients → gateway → services → slicing → encrypted delivery → hub → printer. */
function genesysArchitecture(t) {
  const clients = [
    [24, 'Creator platform', 'React · uploads, catalogue'],
    [268, 'Storefront', 'WordPress · checkout'],
    [512, 'Mobile app', 'Flutter · iOS + Android'],
  ]
  const services = [
    [44, 232, 'Sales'],
    [215, 232, 'Ownership'],
    [386, 232, 'NFT'],
    [557, 232, 'Creator API'],
    [44, 284, 'Print Server'],
    [215, 284, 'Slicing Interface'],
    [386, 284, 'Auth'],
    [557, 284, 'Handshake'],
  ]

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <!-- orient="auto" (not auto-start-reverse, which resvg ignores — the head
         then keeps its natural rightward tilt on vertical lines). userSpaceOnUse
         keeps 1.5px and 2px strokes from getting different-sized heads. -->
    <marker id="a" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="10" markerHeight="10" markerUnits="userSpaceOnUse" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.faint}"/>
    </marker>
    <marker id="b" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="${t.accent}"/>
    </marker>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${t.canvas}"/>

  ${clients
    .map(
      ([x, title, sub]) =>
        box(x, 24, 220, 56, t.panel, t.line) +
        label(x + 110, 47, title, { fill: t.ink }) +
        label(x + 110, 66, sub, { fill: t.faint, size: 13, font: SANS }),
    )
    .join('\n  ')}
  ${box(770, 24, 206, 56, t.panel, t.line)}
  ${label(873, 47, 'Companion app', { fill: t.ink })}
  ${label(873, 66, 'Wi-Fi hotspot pairing', { fill: t.faint, size: 13, font: SANS })}

  ${box(24, 112, 708, 52, t.panel, t.line)}
  ${label(378, 144, 'Auth gateway', { fill: t.ink })}
  ${box(770, 112, 206, 52, t.panel, t.line)}
  ${label(873, 137, 'Keycloak realm', { fill: t.ink, size: 15 })}
  ${label(873, 155, 'RBAC · client credentials', { fill: t.faint, size: 12, font: SANS })}

  <rect x="24" y="196" width="708" height="212" rx="14" fill="${t.panelAlt}" stroke="${t.line}" stroke-width="1.5" stroke-dasharray="6 5"/>
  ${label(44, 220, 'NODE.JS + TYPESCRIPT SERVICES', { fill: t.faint, size: 12, anchor: 'start' })}
  ${services
    .map(
      ([x, y, name]) =>
        `<rect x="${x}" y="${y}" width="155" height="40" rx="8" fill="${t.panel}" stroke="${t.line}" stroke-width="1.25"/>` +
        label(x + 77, y + 25, name, { fill: t.ink, size: 14 }),
    )
    .join('\n  ')}

  <rect x="44" y="344" width="668" height="42" rx="8" fill="${TINT.lime}" stroke="${t.line}" stroke-width="1.25"/>
  ${label(378, 363, 'RabbitMQ', { fill: TINT.ink, size: 15 })}
  ${label(378, 379, 'pre-process → process → post-process · backoff + DLQ', { fill: TINT.faint, size: 12.5, font: SANS })}

  ${box(770, 196, 206, 44, t.panel, t.line)}
  ${label(873, 223, 'PostgreSQL', { fill: t.ink, size: 15 })}
  ${box(770, 252, 206, 44, t.panel, t.line)}
  ${label(873, 279, 'Redis', { fill: t.ink, size: 15 })}

  <rect x="770" y="330" width="206" height="78" rx="10" fill="${TINT.pink}" stroke="${t.line}" stroke-width="1.5"/>
  ${label(873, 352, 'Polygon mainnet', { fill: TINT.ink, size: 15 })}
  ${label(873, 372, 'Right-to-Print · purchase', { fill: TINT.faint, size: 12.5, font: SANS })}
  ${label(873, 390, 'Proof-of-Print · completion', { fill: TINT.faint, size: 12.5, font: SANS })}

  ${box(24, 446, 340, 64, t.panel, t.line)}
  ${label(194, 474, 'Cloud slicing · Orca', { fill: t.ink })}
  ${label(194, 493, 'STL never leaves the cloud', { fill: t.faint, size: 13, font: SANS })}
  ${box(392, 446, 340, 64, t.panel, t.line)}
  ${label(562, 474, 'Encrypted GCode', { fill: t.ink })}
  ${label(562, 493, 'bound to one hub, one printer', { fill: t.faint, size: 13, font: SANS })}

  <rect x="392" y="562" width="220" height="62" rx="10" fill="${t.panel}" stroke="${t.accent}" stroke-width="2"/>
  ${label(502, 588, 'Hermes hub', { fill: t.ink })}
  ${label(502, 607, 'Genesys OS · gateway agent', { fill: t.faint, size: 13, font: SANS })}
  <rect x="656" y="562" width="152" height="62" rx="10" fill="${t.panel}" stroke="${t.accent}" stroke-width="2"/>
  ${label(732, 588, '3D printer', { fill: t.ink })}
  ${label(732, 607, 'Marlin / Klipper', { fill: t.faint, size: 13, font: SANS })}

  ${[
    'M 134 80 L 134 106',
    'M 378 80 L 378 106',
    'M 622 80 L 622 106',
    'M 732 138 L 764 138',
    'M 378 164 L 378 190',
    'M 732 218 L 764 218',
    'M 732 274 L 764 274',
    'M 121 324 L 121 338',
    'M 292 324 L 292 338',
    'M 463 324 L 463 338',
    'M 634 324 L 634 338',
    'M 712 365 L 764 365',
    'M 194 408 L 194 440',
    'M 364 478 L 386 478',
  ]
    .map((d) => arrow(d, { stroke: t.faint, marker: 'a' }))
    .join('\n  ')}
  ${arrow('M 562 510 L 562 556', { stroke: t.accent, marker: 'b', width: 2 })}
  ${arrow('M 612 593 L 650 593', { stroke: t.accent, marker: 'b', width: 2 })}
  ${arrow('M 502 624 L 502 664 L 873 664 L 873 414', { stroke: t.accent, marker: 'b', width: 2, dash: '5 4' })}
  ${edgeLabel(562, 534, 'MQTT · persistent, encrypted', t, t.accent)}
  ${edgeLabel(690, 664, 'print complete', t, t.accent)}
</svg>`
}

const DIAGRAMS = [{ slug: 'genesys-architecture', build: genesysArchitecture }]

mkdirSync(outDir, { recursive: true })

// resvg silently substitutes when a font file is missing — fail loudly instead.
for (const font of fonts) readFileSync(font)

/** Rasterize at 2x, then emit the 1200w/2000w WebP rungs. */
async function writeLadder(svg, basePath) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH * 2 },
    font: { fontFiles: fonts, loadSystemFonts: false },
  })
    .render()
    .asPng()
  await sharp(png).webp({ quality: 92 }).toFile(`${basePath}.webp`)
  await sharp(png)
    .resize({ width: 1200 })
    .webp({ quality: 92 })
    .toFile(`${basePath}-1200.webp`)
}

for (const { slug, build } of DIAGRAMS) {
  for (const [name, theme] of Object.entries(THEMES)) {
    const suffix = name === 'dark' ? '-dark' : ''
    await writeLadder(build(theme), join(outDir, `${slug}${suffix}`))
  }
  console.log(`[diagrams] ${slug} — light + dark`)
}
