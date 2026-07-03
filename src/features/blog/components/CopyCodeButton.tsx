import { useEffect, useRef, useState } from 'react'
import { CopyIcon } from '#/features/design-system/components/icons/CopyIcon'
import { cn } from '#/features/design-system/lib/cn'

interface CopyCodeButtonProps {
  code: string
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeout.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — the code is still visible to copy manually */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy creator code ${code}`}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-md border-brut px-2.5 py-1 font-mono text-sm font-bold transition-colors',
        copied
          ? 'bg-accent-lime text-ink-fixed'
          : 'bg-surface text-ink hover:bg-chip',
      )}
    >
      {copied ? 'Copied!' : code}
      {copied ? null : <CopyIcon className="size-3.25" />}
    </button>
  )
}
