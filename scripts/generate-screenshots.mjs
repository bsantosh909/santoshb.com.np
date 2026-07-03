import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'
import sharp from 'sharp'

/**
 * Project cover images for the work cards/detail pages
 * (`npm run screenshots`). Two source kinds:
 *  - `url`: live-site capture at the banner aspect ratio
 *    (requires `npx playwright install chromium` once per machine)
 *  - `file`: curated art in assets/projects/ — used where the live site
 *    doesn't capture well; `contain` letterboxes wide banners onto their
 *    own sampled background color instead of cropping.
 * Output is always the 640/1200 WebP ladder.
 */
const PROJECTS = [
  { slug: 'relativity-invest', url: 'https://www.relativityinvest.ai' },
  { slug: 'zophal', url: 'https://www.zophal.com' },
  { slug: 'perceive-now', url: 'https://www.perceivenow.ai' },
  { slug: 'my-boat-2', file: 'assets/projects/my-boat-2.png', fit: 'cover' },
  {
    slug: 'global-diary',
    file: 'assets/projects/global-diary.png',
    fit: 'contain',
  },
  // thegenesys.tech 403s headless browsers — Facebook cover art instead
  {
    slug: 'the-genesys',
    file: 'assets/projects/the-genesys.png',
    fit: 'contain',
  },
]

mkdirSync('public/img/projects', { recursive: true })

async function writeLadder(slug, input, fit = 'cover') {
  let background
  if (fit === 'contain') {
    const { data } = await sharp(input)
      .extract({ left: 4, top: 4, width: 1, height: 1 })
      .raw()
      .toBuffer({ resolveWithObject: true })
    background = { r: data[0], g: data[1], b: data[2] }
  }
  for (const [width, height, suffix] of [
    [1200, 630, ''],
    [640, 336, '-640'],
  ]) {
    await sharp(input)
      .resize(width, height, { fit, background })
      .webp({ quality: 84 })
      .toFile(`public/img/projects/${slug}${suffix}.webp`)
  }
}

const needsBrowser = PROJECTS.some((project) => project.url)
const browser = needsBrowser ? await chromium.launch() : null
const page = browser
  ? await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
    })
  : null

for (const project of PROJECTS) {
  if (project.file) {
    await writeLadder(project.slug, project.file, project.fit)
    console.log('rendered', project.slug, '(local art)')
    continue
  }
  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 45000 })
  } catch {
    console.warn(
      `[screenshots] ${project.slug}: networkidle timeout, capturing anyway`,
    )
  }
  await page.waitForTimeout(2500)
  const png = await page.screenshot({ type: 'png' })
  await writeLadder(project.slug, png, 'cover')
  console.log('captured', project.slug)
}

if (browser) await browser.close()
