export type AccentName = 'orange' | 'blue' | 'lime' | 'amber' | 'pink'

/**
 * Maps accent names to literal utility classes (Tailwind only picks up
 * classes written out in source, so these cannot be composed dynamically).
 */
export class Accent {
  static readonly order: ReadonlyArray<AccentName> = [
    'orange',
    'blue',
    'lime',
    'amber',
    'pink',
  ]

  static readonly shadowTint: Record<AccentName, string> = {
    orange: 'shadow-tint-accent',
    blue: 'shadow-tint-accent-blue',
    lime: 'shadow-tint-accent-lime',
    amber: 'shadow-tint-accent-amber',
    pink: 'shadow-tint-accent-pink',
  }

  static readonly text: Record<AccentName, string> = {
    orange: 'text-accent',
    blue: 'text-accent-blue',
    lime: 'text-accent-lime',
    amber: 'text-accent-amber',
    pink: 'text-accent-pink',
  }

  static readonly bg: Record<AccentName, string> = {
    orange: 'bg-accent',
    blue: 'bg-accent-blue',
    lime: 'bg-accent-lime',
    amber: 'bg-accent-amber',
    pink: 'bg-accent-pink',
  }

  static readonly border: Record<AccentName, string> = {
    orange: 'border-accent',
    blue: 'border-accent-blue',
    lime: 'border-accent-lime',
    amber: 'border-accent-amber',
    pink: 'border-accent-pink',
  }

  static readonly tintBg: Record<AccentName, string> = {
    orange: 'bg-tint-orange',
    blue: 'bg-tint-blue',
    lime: 'bg-tint-lime',
    amber: 'bg-tint-amber',
    pink: 'bg-tint-pink',
  }

  /** Deterministic accent for list items (blog cards, chips). */
  static forIndex(index: number): AccentName {
    return Accent.order[index % Accent.order.length]
  }

  /** Stable accent for a string key (e.g. a post slug). */
  static forKey(key: string): AccentName {
    let hash = 0
    for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) | 0
    return Accent.forIndex(Math.abs(hash))
  }
}
