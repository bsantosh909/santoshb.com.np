import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import satori from 'satori'
import sharp from 'sharp'
import { Resvg } from '@resvg/resvg-js'

/**
 * Generates on-theme post banners (1200x630 — OG ratio) from frontmatter.
 * Light variant doubles as the og:image; the dark variant (`<name>-dark.png`)
 * is shown on-site in dark mode. Run `npm run banners` after adding a post.
 */

const root = process.cwd()
const contentDir = join(root, 'src/content/blog')
const outDir = join(root, 'public/img/banners')

const fonts = [
  {
    name: 'Bricolage Grotesque',
    weight: 800,
    data: readFileSync(join(root, 'assets/fonts/bricolage-800.ttf')),
  },
  {
    name: 'Space Mono',
    weight: 700,
    data: readFileSync(join(root, 'assets/fonts/space-mono-700.ttf')),
  },
  {
    name: 'Space Grotesk',
    weight: 500,
    data: readFileSync(join(root, 'assets/fonts/space-grotesk-500.ttf')),
  },
]

const ACCENTS = {
  orange: '#ff5a36',
  blue: '#2f49ff',
  lime: '#aee03a',
  amber: '#ffae2e',
  pink: '#ff4d8d',
}
const ACCENT_ORDER = ['orange', 'blue', 'lime', 'amber', 'pink']

const THEMES = {
  light: {
    bg: '#faf4e9',
    ink: '#16110b',
    muted: '#544a3c',
    faint: '#9a8f7d',
    surface: '#fffdf7',
    line: '#16110b',
  },
  dark: {
    bg: '#14100b',
    ink: '#f6efe2',
    muted: '#c3b9a7',
    faint: '#8a8170',
    surface: '#1f1812',
    line: '#3c3328',
  },
}

// Mirrors Accent.forKey in src/features/design-system/lib/accent.ts so the
// banner accent matches the category chip shown on the post page.
function accentForKey(key) {
  let hash = 0
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return ACCENTS[ACCENT_ORDER[Math.abs(hash) % ACCENT_ORDER.length]]
}

const h = (type, style, children) => ({ type, props: { style, children } })

function bannerTree({ title, label, chip, chipColor, theme, cta = true }) {
  const t = THEMES[theme]
  const titleSize = title.length > 44 ? 64 : title.length > 26 ? 74 : 86
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: t.bg,
      padding: 64,
      position: 'relative',
      fontFamily: 'Space Grotesk',
    },
    [
      // decorative shapes, right side
      h('div', {
        position: 'absolute',
        right: -70,
        top: -70,
        width: 260,
        height: 260,
        borderRadius: 260,
        backgroundColor: chipColor,
        opacity: 0.9,
      }),
      h('div', {
        position: 'absolute',
        right: 150,
        top: 120,
        width: 56,
        height: 56,
        backgroundColor: ACCENTS.amber,
        border: `4px solid ${THEMES.light.ink}`,
        borderRadius: 14,
        transform: 'rotate(14deg)',
      }),
      h('div', {
        position: 'absolute',
        right: 84,
        top: 260,
        width: 44,
        height: 44,
        borderRadius: 44,
        backgroundColor: ACCENTS.pink,
        border: `4px solid ${THEMES.light.ink}`,
      }),
      h('div', {
        position: 'absolute',
        right: 320,
        bottom: 210,
        width: 40,
        height: 40,
        backgroundColor: ACCENTS.lime,
        border: `4px solid ${THEMES.light.ink}`,
        transform: 'rotate(-12deg)',
      }),
      // content in the upper half — social platforms overlay their own link
      // text along the bottom edge, so nothing important lives down there.
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 940,
          marginTop: 8,
        },
        [
          chip
            ? h(
                'div',
                {
                  display: 'flex',
                  alignSelf: 'flex-start',
                  backgroundColor: chipColor,
                  color: THEMES.light.ink,
                  border: `4px solid ${THEMES.light.ink}`,
                  borderRadius: 12,
                  padding: '8px 18px',
                  fontFamily: 'Space Mono',
                  fontSize: 22,
                  letterSpacing: 3,
                  marginBottom: 26,
                },
                chip.toUpperCase(),
              )
            : null,
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'Bricolage Grotesque',
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: t.ink,
            },
            [h('span', {}, title), h('span', { color: chipColor }, '.')],
          ),
          h(
            'div',
            {
              display: 'flex',
              fontSize: 28,
              color: t.muted,
              marginTop: 22,
              maxWidth: 760,
            },
            label,
          ),
        ],
      ),
      // Bottom-right, away from platform overlays (which sit bottom-left):
      // CTA pill on OG posters; plain accent bar on on-site banners, where
      // the reader is already on the article.
      h(
        'div',
        {
          display: 'flex',
          flexGrow: 1,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        },
        [
          cta
            ? h(
                'div',
                {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  backgroundColor: chipColor,
                  color: THEMES.light.ink,
                  border: `4px solid ${THEMES.light.ink}`,
                  borderRadius: 999,
                  padding: '14px 30px',
                  fontFamily: 'Space Mono',
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 1,
                },
                'Read the article →',
              )
            : h('div', {
                display: 'flex',
                width: 220,
                height: 12,
                borderRadius: 12,
                backgroundColor: chipColor,
              }),
        ],
      ),
    ],
  )
}

async function renderPng(tree, dest) {
  const svg = await satori(tree, { width: 1200, height: 630, fonts })
  const png = new Resvg(svg).render().asPng()
  writeFileSync(dest, png)
  console.log('wrote', dest.replace(root + '/', ''))
  return png
}

async function renderWebp(tree, dest) {
  const svg = await satori(tree, { width: 1200, height: 630, fonts })
  const png = new Resvg(svg).render().asPng()
  await sharp(png).webp({ quality: 88 }).toFile(dest)
  // 640w rung for card thumbnails (srcset picks it under ~2x320px display)
  await sharp(png)
    .resize(640, 336)
    .webp({ quality: 88 })
    .toFile(dest.replace(/\.webp$/, '-640.webp'))
  console.log('wrote', dest.replace(root + '/', ''), '+ 640w')
}

const posts = readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))
for (const file of posts) {
  const { data } = matter(readFileSync(join(contentDir, file), 'utf8'))
  const slug = file.replace(/\.mdx$/, '')
  const banner = data.banner ?? `${slug}.png`
  const base = banner.replace(/\.png$/, '')
  const spec = {
    title: data.title,
    chip: (data.tags ?? [])[0] ?? 'Notes',
    chipColor: accentForKey(slug),
    label: data.subtitle ?? 'Blog',
  }
  // PNG for og:image (social scrapers are unreliable with WebP);
  // WebP pair for on-site display.
  await renderPng(
    bannerTree({ ...spec, theme: 'light' }),
    join(outDir, `${base}.png`),
  )
  await renderWebp(
    bannerTree({ ...spec, theme: 'light', cta: false }),
    join(outDir, `${base}.webp`),
  )
  await renderWebp(
    bannerTree({ ...spec, theme: 'dark', cta: false }),
    join(outDir, `${base}-dark.webp`),
  )
}

// Site-wide OG image (Seo.page fallback for non-post pages) — hero-styled
// with the portrait, mirroring the homepage hero.
function siteOgTree() {
  const t = THEMES.light
  const portrait = `data:image/jpeg;base64,${readFileSync(join(root, 'assets/portrait.jpg')).toString('base64')}`
  return h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: t.bg,
      padding: 80,
      position: 'relative',
      fontFamily: 'Space Grotesk',
    },
    [
      // portrait on its offset blue disc, like the homepage hero
      h('div', {
        position: 'absolute',
        right: 66,
        top: 149,
        width: 360,
        height: 360,
        borderRadius: 360,
        backgroundColor: ACCENTS.blue,
      }),
      {
        type: 'img',
        props: {
          src: portrait,
          width: 360,
          height: 360,
          style: {
            position: 'absolute',
            right: 80,
            top: 135,
            borderRadius: 360,
            border: `6px solid ${t.ink}`,
          },
        },
      },
      h('div', {
        position: 'absolute',
        right: 408,
        top: 96,
        width: 60,
        height: 60,
        backgroundColor: ACCENTS.amber,
        border: `4px solid ${t.ink}`,
        borderRadius: 16,
        transform: 'rotate(14deg)',
      }),
      h('div', {
        position: 'absolute',
        right: 52,
        bottom: 82,
        width: 48,
        height: 48,
        borderRadius: 48,
        backgroundColor: ACCENTS.pink,
        border: `4px solid ${t.ink}`,
      }),
      h('div', {
        position: 'absolute',
        right: 430,
        bottom: 120,
        width: 42,
        height: 42,
        backgroundColor: ACCENTS.lime,
        border: `4px solid ${t.ink}`,
        transform: 'rotate(-12deg)',
      }),
      h(
        'div',
        {
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          gap: 14,
          backgroundColor: ACCENTS.lime,
          color: t.ink,
          border: `4px solid ${t.ink}`,
          borderRadius: 999,
          padding: '12px 26px',
          fontFamily: 'Space Mono',
          fontSize: 24,
          letterSpacing: 4,
        },
        [
          h('div', {
            width: 14,
            height: 14,
            borderRadius: 14,
            backgroundColor: t.ink,
          }),
          'FULL STACK DEVELOPER',
        ],
      ),
      h(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Bricolage Grotesque',
          fontWeight: 800,
          fontSize: 100,
          lineHeight: 1.04,
          letterSpacing: -3,
          color: t.ink,
          marginTop: 44,
          maxWidth: 640,
        },
        [
          h('span', {}, 'Santosh'),
          h('div', { display: 'flex' }, [
            h('span', {}, 'Bhandari'),
            h('span', { color: ACCENTS.orange }, '.'),
          ]),
        ],
      ),
      h(
        'div',
        {
          display: 'flex',
          fontSize: 30,
          color: t.muted,
          marginTop: 26,
          maxWidth: 560,
        },
        'Backend, frontend, and the bits in between.',
      ),
    ],
  )
}

await renderPng(siteOgTree(), join(root, 'public/img/og-default.png'))
