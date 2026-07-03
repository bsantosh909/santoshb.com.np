import type { AccentName } from '#/features/design-system/lib/accent'

export interface SocialLink {
  name: string
  handle: string
  url: string
  accent: AccentName
  /** SVG path (24x24 viewBox) rendered by SocialCard. */
  iconPath: string
}

export class SocialLinks {
  static readonly handle = '@bsantosh909'
  static readonly email = 'contact@santoshb.com.np'

  static readonly all: ReadonlyArray<SocialLink> = [
    {
      name: 'GitHub',
      handle: SocialLinks.handle,
      url: 'https://github.com/bsantosh909',
      accent: 'blue',
      iconPath:
        'M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z',
    },
    {
      name: 'LinkedIn',
      handle: SocialLinks.handle,
      url: 'https://www.linkedin.com/in/bsantosh909',
      accent: 'lime',
      iconPath:
        'M20.45 20.45h-3.56v-5.57c0-1.33 0-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
    },
    {
      name: 'Twitter / X',
      handle: SocialLinks.handle,
      url: 'https://x.com/bsantosh909',
      accent: 'orange',
      iconPath:
        'M18.9 1.5h3.6l-7.9 9 9.3 12.3h-7.3l-5.7-7.5-6.5 7.5H.7l8.4-9.6L0 1.5h7.5l5.2 6.9 6.2-6.9zm-1.3 19.2h2L6.5 3.6H4.4l13.2 17.1z',
    },
    {
      name: 'Instagram',
      handle: SocialLinks.handle,
      url: 'https://instagram.com/bsantosh909',
      accent: 'pink',
      iconPath:
        'M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 4.92a4.92 4.92 0 1 0 0 9.84 4.92 4.92 0 0 0 0-9.84zm0 8.12a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm6.27-8.31a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z',
    },
  ]
}
