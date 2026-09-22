import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Deliberately standalone rather than reusing vite.config.ts: that config
// mounts the full TanStack Start / Nitro / MDX plugin chain, which expects an
// SSR build pipeline and fails under the test runner. Unit tests only need
// module resolution, so this config keeps the plugin list empty.
export default defineConfig({
  resolve: {
    alias: {
      // Mirrors the `imports` map in package.json (`#/*` -> `./src/*`),
      // which Vite does not read on its own.
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // The suite is intentionally thin; an empty run is a pass, not a failure,
    // so `pnpm test` stays usable in CI while coverage grows.
    passWithNoTests: true,
  },
})
