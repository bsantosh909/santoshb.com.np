# santoshb.com.np v4 — React Rewrite Plan

Rewrite of the Nuxt 2 site as a TanStack Start app, implementing the new design
from Claude Design (`Portfolio.dc.html`), with the blog carried over and SEO as
a first-class concern.

## Decisions (confirmed 2026-07-02)

| Area      | Decision                                                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Framework | **TanStack Start** (React 19, TypeScript, Vite, TanStack Router)                                                                                                                                                   |
| Hosting   | **Host-agnostic**: full static prerender (`dist/client` is a plain static site, deployable to Netlify/Vercel/Cloudflare/any web server). No hosting adapter in the build. Netlify is just the first deploy target. |
| Content   | **MDX in-repo** with custom React components, typed frontmatter                                                                                                                                                    |
| Comments  | **Disqus** (keep — existing threads keyed by `identifier: <slug>`, `url: https://www.santoshb.com.np/blog/<slug>/`)                                                                                                |
| Analytics | **GTM** container; GA4 (or anything else) configured inside GTM, not in code                                                                                                                                       |
| Ads       | **Drop AdSense** — remove `ads.txt`, ad components                                                                                                                                                                 |
| PWA       | **Yes** via `vite-plugin-pwa`                                                                                                                                                                                      |
| Styling   | Tailwind CSS v4, tokens extracted from the Claude Design file                                                                                                                                                      |

## Architecture

```
src/
  routes/                    # file-based routes (TanStack Router)
    __root.tsx               # shell: nav, footer, GTM, global head defaults
    index.tsx                # portfolio/home (from Portfolio.dc.html)
    contact.tsx
    privacy.tsx
    blog/
      index.tsx              # blog listing
      $slug.tsx              # post page (MDX render + Disqus + JSON-LD)
    feed[.]xml.ts            # RSS server route — MUST stay at /feed.xml
    sitemap[.]xml.ts         # sitemap server route
  components/
    mdx/                     # custom components usable inside MDX posts
    ...
  content/
    blog/*.mdx               # migrated + future posts
  lib/
    content.ts               # content layer: glob posts, zod-validate frontmatter,
                             # reading time, sorted index
    seo.ts                   # meta/OG/JSON-LD builders
public/
  img/banners/...            # keep OLD asset URLs valid (RSS/Google Images reference them)
```

- **Rendering**: full static prerender (SSG) of every route at build time —
  same operational model as today, best Core Web Vitals, no server to keep warm.
  TanStack Start's built-in prerender (`crawlLinks: true`) emits plain HTML into
  `dist/client`; no hosting-specific adapter, deployable anywhere.
- **MDX pipeline**: `@mdx-js/rollup` (or content-collections if we want a
  heavier content layer later) + `remark-frontmatter` + `remark-gfm` +
  `rehype-pretty-code` (Shiki) replacing Prism. Frontmatter validated with zod
  at build — a bad post fails the build, not production.
- **Frontmatter schema** (superset of current): `title, subtitle?, summary,
banner, tags[], created, updated?, draft?`.

## SEO requirements (parity or better vs v3)

1. **URL preservation** — posts stay at `/blog/<slug>/` **with trailing slash**
   (router `trailingSlash: true` equivalent + consistent canonicals). Any URL
   that must change gets a 301 in Netlify `_redirects`.
2. **`/feed.xml`** RSS at the same path, same item links.
3. **`/sitemap.xml`** with lastmod from `updated ?? created`.
4. Per-page: title template (`%s - Santosh Blogs` for posts), description,
   canonical, OG (`og:type: article`, image, published/modified time, tags),
   Twitter cards — all exist today and must carry over.
5. **New wins**: JSON-LD (`BlogPosting` + `Person`/`WebSite`), `robots.txt`,
   RSS `<link rel="alternate">`, OG image fallback for pages without banners.
6. **Cutover monitoring**: Google Search Console before/after, crawl old
   sitemap URLs against new site → expect 100% 200s (or 301s).

## Edge cases to handle

- **Stale service worker**: v3 ships `@nuxtjs/pwa` — returning visitors have a
  workbox SW installed that will serve the OLD cached site. The new SW (same
  `/sw.js` path) must register with `skipWaiting` + `clientsClaim` so it takes
  over on first revisit.
- **`.md` → `.mdx` strictness**: MDX treats `{`, `<`, and stray JSX-ish text as
  syntax. Every migrated post needs a sanitize pass + build must compile all 7.
- **Trailing-slash duplicate content**: Netlify pretty-URLs + router must agree
  on one form; the other 301s. Canonicals always the trailing-slash form.
- **Disqus thread continuity**: identifier = bare slug, url = trailing-slash
  absolute URL. Verify on one post in prod before calling it done. Lazy-load
  Disqus (IntersectionObserver) so it doesn't wreck LCP/TBT.
- **GTM in an SPA**: router navigations don't fire page_view by default — push
  a `page_view`-style event to `dataLayer` on route change; configure GA4 tag
  in GTM with history-change trigger disabled (avoid double-count).
- **Banner asset URLs**: keep `/img/banners/<file>` paths working (used in OG
  tags of pages already indexed).
- **404**: prerendered 404 page wired to Netlify's 404 handling (v3 used
  `generate.fallback`).
- **AdSense removal**: delete `ads.txt`; expect (harmless) AdSense crawler 404s.
- **Old GA (UA) is dead** — nothing to migrate; GTM is a fresh start.
- **Emoji/HTML in old posts** (e.g. 😜, inline HTML) — verify MDX + Shiki output.

## Phases

### Phase 0 — Design import (blocked on `/design-login`)

Pull `Portfolio.dc.html` from Claude Design project
`d2ea0f81-0976-49f7-a855-8c734a485dda`, extract design tokens (colors, type
scale, spacing) into Tailwind theme, inventory the sections/components it
defines.

### Phase 1 — Scaffold + deploy pipeline first

New TanStack Start app (TS, Tailwind v4, ESLint/Prettier), Netlify adapter,
deploy a hello-world to a Netlify preview URL immediately so every later phase
has deploy previews. Old Nuxt site keeps running on prod domain untouched.

### Phase 2 — Content layer + migration

MDX pipeline, zod frontmatter, migrate all 7 posts (sanitize to MDX), move
banners preserving URLs, reading time, Shiki highlighting, draft support.

### Phase 3 — Pages from the design

Root shell (nav/footer), home/portfolio per `Portfolio.dc.html`, blog index,
blog post layout, contact, privacy, 404. Custom MDX components as needed.

### Phase 4 — SEO layer

Head/meta/OG/JSON-LD builders, sitemap.xml, feed.xml, robots.txt, canonicals,
trailing-slash policy, `_redirects`.

### Phase 5 — Integrations

GTM (+ route-change events), Disqus (lazy, correct identifiers), PWA
(vite-plugin-pwa, SW takeover strategy).

### Phase 6 — QA + cutover

Lighthouse ≥ 95s, old-sitemap parity crawl, feed validation, OG debugger pass,
Disqus thread check, then point Netlify prod at v4, watch GSC for a week.

## Migration safety net

v3 stays deployed until Phase 6 sign-off. The rewrite lives on
`v4/react-rewrite`; old code isn't deleted until v4 has been live and stable.
