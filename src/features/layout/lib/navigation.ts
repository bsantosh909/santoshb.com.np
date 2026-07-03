export interface NavItem {
  label: string
  to: string
}

export class Navigation {
  static readonly items: ReadonlyArray<NavItem> = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about/' },
    { label: 'Work', to: '/work/' },
    { label: 'Writing', to: '/blog/' },
  ]

  static readonly footerItems: ReadonlyArray<NavItem> = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about/' },
    { label: 'Work', to: '/work/' },
    { label: 'Writing', to: '/blog/' },
    { label: 'Contact', to: '/contact/' },
    { label: 'Privacy', to: '/privacy/' },
  ]
}
