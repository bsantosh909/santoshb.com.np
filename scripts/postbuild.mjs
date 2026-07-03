import { existsSync } from 'node:fs'
import { join } from 'node:path'
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
function resolveOutDir() {
  const nitroOut = join(process.cwd(), '.output/public')
  if (existsSync(nitroOut)) return nitroOut
  return join(process.cwd(), 'dist/client')
}

const outDir = resolveOutDir()

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
  `[postbuild] precached ${count} files (${(size / 1024).toFixed(1)} kB) into sw.js`,
)
