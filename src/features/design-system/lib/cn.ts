import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

/**
 * tailwind-merge must know our custom @theme tokens, otherwise it treats
 * e.g. `text-card` (a font size) as a text color and drops it when a real
 * color class is merged in.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'hero',
            'display-xl',
            'display-lg',
            'display-md',
            'post-title',
            'lede',
            'sub',
            'card',
            'label',
            'chip',
            'tag',
          ],
        },
      ],
      shadow: ['shadow-brut', 'shadow-brut-sm', 'shadow-brut-lg'],
      rounded: [{ rounded: ['tile', 'card-sm', 'card', 'card-lg', 'card-xl'] }],
    },
  },
})

export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs))
}
