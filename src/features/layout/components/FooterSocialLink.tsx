import { PathIcon } from '#/features/design-system/components/icons/PathIcon'

interface FooterSocialLinkProps {
  name: string
  url: string
  iconPath: string
  external?: boolean
}

export function FooterSocialLink({
  name,
  url,
  iconPath,
  external = true,
}: FooterSocialLinkProps) {
  return (
    <a
      href={url}
      aria-label={name}
      title={name}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className="grid size-10 place-items-center rounded-tile border-brut bg-surface text-ink transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-bg"
    >
      <PathIcon path={iconPath} className="size-4.5" />
    </a>
  )
}
