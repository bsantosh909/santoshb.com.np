import sharp from 'sharp'

/**
 * Portrait size ladders (`npm run portraits`). Each display size × DPR picks
 * the cheapest sufficient file via srcset — the largest rung covers 2x
 * retina at the biggest rendered size.
 *
 * Sources of truth live in assets/ (portrait.jpg studio, portrait-outdoor.jpg
 * pre-cropped 4:5 mountain shot).
 */
const LADDERS = [
  {
    // homepage hero (assets/portrait.jpg remains the OG-image source)
    src: 'assets/portrait-hero.jpg',
    out: (w) => `public/img/portrait${w === 800 ? '' : `-${w}`}.webp`,
    sizes: [
      [480, 480],
      [640, 640],
      [800, 800],
    ],
  },
  {
    src: 'assets/portrait-outdoor.jpg',
    out: (w) => `public/img/portrait-outdoor${w === 800 ? '' : `-${w}`}.webp`,
    sizes: [
      [480, 600],
      [640, 800],
      [800, 1000],
    ],
  },
]

for (const ladder of LADDERS) {
  for (const [width, height] of ladder.sizes) {
    const dest = ladder.out(width)
    const info = await sharp(ladder.src)
      .resize(width, height, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(dest)
    console.log('wrote', dest, `${Math.round(info.size / 1024)}KB`)
  }
}
