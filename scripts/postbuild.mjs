import { existsSync } from 'node:fs'
import { join, relative } from 'node:path'
import { generateSW } from 'workbox-build'

/**
 * Runs after `vite build` (see package.json), once the full static output —
 * including prerendered HTML — exists.
 *
 * /sw.js — workbox precache over the final files. skipWaiting +
 *    clientsClaim are required: v3 (Nuxt) registered a service worker at
 *    this same path, and the new worker must take over for returning
 *    visitors instead of letting the stale one keep serving the old site.
 */

/**
 * Every directory a host may serve as the site root.
 *
 * Nitro chooses its preset from the environment. Locally and on Netlify it
 * writes .output/public, but on Vercel it emits the Build Output API layout
 * instead, and Vercel serves .vercel/output/static while ignoring the
 * `outputDirectory` in vercel.json. That copy is made during the nitro build —
 * before this script runs — so generating the worker only into .output/public
 * shipped a Vercel deployment with no /sw.js in it at all: the request fell
 * through to the trailing-slash redirect for unknown paths, registration
 * failed on every page ("script resource is behind a redirect"), and the PWA
 * never installed.
 *
 * Writing into each root that exists keeps every precache manifest matched to
 * the files actually served beside it, without sniffing host env vars.
 */
const NITRO_ROOTS = ['.vercel/output/static', '.output/public']
/** Plain `vite build` output, used only when no nitro output is present. */
const FALLBACK_ROOT = 'dist/client'

function resolveOutDirs() {
  const found = NITRO_ROOTS.map((dir) => join(process.cwd(), dir)).filter(
    (dir) => existsSync(dir),
  )
  return found.length > 0 ? found : [join(process.cwd(), FALLBACK_ROOT)]
}

for (const outDir of resolveOutDirs()) {
  const { count, size } = await generateSW({
    globDirectory: outDir,
    swDest: join(outDir, 'sw.js'),
    // HTML is deliberately NOT precached: pages go network-first below so a
    // deploy is visible on the very next load, with cache as offline fallback.
    globPatterns: ['**/*.{js,css,png,svg,webp,xml,txt,webmanifest}'],
    runtimeCaching: [
      {
        // navigations: URLs whose last segment has no file extension
        urlPattern: /\/[^.?]*$/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          networkTimeoutSeconds: 3,
          expiration: { maxEntries: 50 },
        },
      },
    ],
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    sourcemap: false,
  })
  console.log(
    `[postbuild] precached ${count} files (${(size / 1024).toFixed(1)} kB) ` +
      `into ${relative(process.cwd(), outDir)}/sw.js`,
  )
}
