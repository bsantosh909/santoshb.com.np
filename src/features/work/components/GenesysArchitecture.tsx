import { cn } from '#/features/design-system/lib/cn'

const BASE = '/img/diagrams/genesys-architecture'

const ALT =
  'Architecture diagram: the creator platform, storefront, mobile and companion apps ' +
  'call an auth gateway backed by a Keycloak realm. The gateway fronts a cluster of ' +
  'Node.js services — Sales, Ownership, NFT, Creator API, Print Server, Slicing ' +
  'Interface, Auth and Handshake — that publish to a RabbitMQ pipeline and read from ' +
  'PostgreSQL and Redis. Purchases mint a Right-to-Print token on Polygon. Slicing runs ' +
  'in the cloud so the STL never leaves it; the resulting GCode is encrypted for one hub ' +
  'and one printer, delivered over MQTT to the Hermes hub, which drives a Marlin or ' +
  'Klipper printer and reports completion back as a Proof-of-Print token.'

const srcSet = (src: string) =>
  `${src.replace(/\.webp$/, '-1200.webp')} 1200w, ${src} 2000w`

const SIZES = '(min-width: 768px) 760px, calc(100vw - 40px)'

/**
 * Theme-paired architecture art from scripts/generate-diagrams.mjs. Fits the
 * article column rather than scrolling sideways — the diagram's type is sized
 * for that reduction (see the note on `label` in the generator).
 */
export function GenesysArchitecture() {
  const shared = 'h-auto w-full rounded-card border-brut'
  return (
    <figure className="not-prose my-10">
      <img
        src={`${BASE}.webp`}
        srcSet={srcSet(`${BASE}.webp`)}
        sizes={SIZES}
        alt={ALT}
        loading="lazy"
        width={1000}
        height={690}
        className={cn('block dark:hidden', shared)}
      />
      <img
        src={`${BASE}-dark.webp`}
        srcSet={srcSet(`${BASE}-dark.webp`)}
        sizes={SIZES}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1000}
        height={690}
        className={cn('hidden dark:block', shared)}
      />
      <figcaption className="mt-3 text-center font-mono text-eyebrow uppercase text-faint">
        Purchase to print — the path a design takes
      </figcaption>
    </figure>
  )
}
