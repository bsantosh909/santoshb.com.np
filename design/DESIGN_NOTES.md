# Design Spec — v4 (from Claude Design project `d2ea0f81-0976-49f7-a855-8c734a485dda`)

Source pages: `Portfolio.dc.html`, `About.dc.html`, `Work.dc.html`, `Writing.dc.html`,
`BlogPost.dc.html`, `Contact.dc.html`, `posts.js`. Fetch any file verbatim via the
claude_design MCP (`get_file`) when pixel-level reference is needed.

## Language

Neo-brutalist: cream paper background, near-black ink, 1.5px solid `--line` borders
everywhere, chunky rounded cards (radius 16–30px), hard offset shadows on hover
(`box-shadow: 6px 8px 0 <accent>`, translateY(-4..8px)), rotated accents, floating
shapes, marquee strip. Playful but typographic.

## Tokens (already in src/styles.css @theme)

Light: bg #faf4e9 · surface #fffdf7 · surface2 #f3ecd9 · ink #16110b · muted #544a3c ·
faint #9a8f7d · line #16110b · chip #d8cdb6 · nav rgba(250,244,233,.82)
Dark ([data-theme=dark]): bg #14100b · surface #1f1812 · surface2 #1a1510 · ink #f6efe2 ·
muted #c3b9a7 · faint #8a8170 · line #3c3328 · chip #4a4036 · nav rgba(20,16,11,.82)
Accents: orange #ff5a36 (primary) · lime #aee03a · blue #2f49ff · amber #ffae2e · pink #ff4d8d

Fonts: display = Bricolage Grotesque (700/800, tight tracking, line-height ~.92–1.1);
body = Space Grotesk; labels/meta = Space Mono (11–13px, uppercase, letter-spacing .08–.18em).
Theme: `data-theme` on root, persisted `localStorage['sb-theme']`, falls back to
`prefers-color-scheme`. Sun/moon toggle button rotates 25deg on hover.

## Shared chrome (every page)

- **Header**: sticky, `backdrop-filter: blur(10px) saturate(140%)`, bg `--nav`, bottom
  1.5px line. Logo = "S" tile (ink bg, lime text, rotate -6deg, radius 11px) + name in
  display font. Nav: Home/About/Work/Writing + "Say hello" pill (ink bg → orange on
  hover) + theme toggle. Active link: orange w/ 2px orange underline.
- **Footer**: surface2 bg, top line; small "S" tile + © 2026; links About/Work/Writing/Privacy.
- **Reveal-on-scroll**: elements start opacity 0 / translateY(34px), transition .7s
  cubic-bezier(.2,.7,.2,1), IntersectionObserver threshold .1, plus 1.4s failsafe
  timeout; `rise` keyframe with stagger (.06–.32s delays) for above-the-fold.

## Home (Portfolio.dc.html)

1. Hero: lime pill badge "Full stack developer" (mono, pulsing dot) → giant display
   name (clamp 46–128px, orange period) → subtitle with colored underlines (backend=blue,
   frontend=amber, writer=pink) → CTAs "See my work" (ink pill, orange offset-shadow
   hover) + "Get in touch" (outline pill). Right: circular photo (image slot) on blue
   offset circle, floating amber square/pink circle/lime square + spinning orange star SVG.
2. Skills marquee: ink bg strip, display font 22px, items separated by colored ✦
   (JavaScript/TypeScript/Vue·Nuxt/React·Next/Node/SQL/C·C++), 26s linear loop, duplicated list.
3. "Hello" intro: mono label left, big display paragraph (Vue/Nuxt in blue, React/Next
   in orange), "More about me →" link with lime underline.
4. Featured work: label + "Recent work" h2 + "All projects →"; 2 cards (Zophal orange
   shadow, Perceive Now blue shadow): image slot 200px, title+↗, desc, mono uppercase
   chips (ink bg, colored text).

## About

1. H1 "Developer, writer, thinker." (orange comma).
2. Photo 4:5 rounded-24 + lime "Nepal 🇳🇵 · remote" badge (rotate -4deg) | lede
   (display 22–34px) + 2 muted paragraphs + 3 stat cards (5+ years orange, 4+ products
   blue, ∞ cups of tea amber — display 34px numbers).
3. Toolkit: full-bleed ink section; 4 cards on #1f1812, each accent-bordered:
   Languages(orange)/Frontend(blue)/Backend&Data(lime)/Tooling&CI(amber); skill pills
   1px #4a4036 border. Content: JS/TS/C/C++/SQL/VB; Vue/Nuxt/React/Next/SCSS/Bootstrap;
   Node/REST/SQL/JSON; Git/Bitbucket/Travis/VS Code/GitHub Desktop.
4. Journey timeline: left 2px line, colored dot markers (orange/blue/lime), mono date,
   display h3, muted copy. Entries are placeholders — needs real career data.
5. CTA pair (same as hero).

## Work

- H1 "Things I've built." + intro. Grid minmax(320px,1fr): 4 project cards — Zophal
  (orange), Perceive Now (blue), My Boat 2 (lime, apps.apple.com/us/app/my-boat-2/id1582824320),
  Global Diary (amber, globaldiary.com). Card = image slot 210px w/ tinted placeholder
  bg + 26px padding + title/↗ + desc + chips.
- "Want to see more?" banner: surface2, 1.5px DASHED border, radius 22, CTA pill.

## Writing (blog index)

- H1 "Notes & free-time thinking." + muted intro.
- Featured (latest) post: full-width card, "Latest · {category}" orange-outline mono
  chip + date·read, display title 26–40px, excerpt, big ↗; orange shadow hover.
- Grid minmax(280px,1fr) of post cards: category chip (chip-border) + accent dot
  top-right, display title 22px, excerpt (flex:1), mono date·read footer; blue shadow hover.
- NOTE: design used sample posts.js w/ per-post `category` + `accent`; real site maps
  MDX posts (derive accent by rotation or tag). Design linked out to old blog — v4
  replaces that with the real posts inline.

## Blog post (BlogPost.dc.html)

- Narrow article column (max 760px). "← All writing" mono link.
- Category chip (solid accent bg) + mono date·read → display H1 (34–62px, balance) →
  excerpt as lede (18–23px muted) → author row ("S" circle avatar, name + "Full stack
  developer" mono) with bottom line.
- Body type: p 17–19px/1.8; h2 display 24–32px; blockquote 4px orange left border,
  display 600 20–27px.
- Prev/Next cards (mono label + display title; blue/orange hover shadows).
- "Enjoyed this?" ink banner: `@bsantosh909` in lime + lime "Get in touch →" pill.
- v4 additions not in design: tags, Disqus (lazy below banner), banner image, TOC optional.

## Contact

- Big ink card radius 30: blurred floating blue/orange circles; mono "Contact" label;
  H1 "Let's build something good."; copy w/ lime @bsantosh909; lime CTA pill
  "Start a conversation →" (orange offset shadow hover).
- Social grid minmax(220px,1fr): GitHub/LinkedIn/Twitter-X/Instagram — all
  @bsantosh909; icon in 44px ink tile + bold name + mono handle; hover shadows
  blue/lime/orange/pink respectively.

## Assets needed from Santosh

- Hero portrait photo (circle) + About photo (4:5)
- Project screenshots: Zophal, Perceive Now, My Boat 2, Global Diary
- Real journey/timeline entries; confirm stats (5+ yrs, 4+ products)
