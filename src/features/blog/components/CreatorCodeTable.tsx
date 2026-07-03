import { CopyCodeButton } from '#/features/blog/components/CopyCodeButton'
import type { CreatorCode } from '#/content/blog/data/creator-codes'

interface CreatorCodeTableProps {
  codes: ReadonlyArray<CreatorCode>
}

export function CreatorCodeTable({ codes }: CreatorCodeTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-card-sm border-brut">
      <table className="w-full border-collapse bg-surface text-left text-sm">
        <thead>
          <tr className="bg-surface-alt font-mono text-chip uppercase text-faint">
            <th className="border-b-2 border-line px-4 py-3">Creator</th>
            <th className="border-b-2 border-line px-4 py-3">Find them</th>
            <th className="border-b-2 border-line px-4 py-3">
              Code (tap to copy)
            </th>
          </tr>
        </thead>
        <tbody>
          {codes.map((entry) => (
            <tr
              key={entry.code}
              className="border-b border-chip last:border-b-0"
            >
              <td className="px-4 py-2.5 font-semibold">{entry.creator}</td>
              <td className="px-4 py-2.5">
                {entry.linkUrl ? (
                  <a
                    href={entry.linkUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-link no-underline hover:underline"
                  >
                    {entry.linkLabel ?? 'Link'} ↗
                  </a>
                ) : (
                  <span className="text-faint">—</span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <CopyCodeButton code={entry.code} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
