import { CopyCodeButton } from '#/features/blog/components/CopyCodeButton'
import type { CreatorCode } from '#/content/blog/data/creator-codes'

interface CreatorCodeTableProps {
  codes: ReadonlyArray<CreatorCode>
}

function CodeTable({ codes }: CreatorCodeTableProps) {
  return (
    <div className="overflow-x-auto rounded-card-sm border-brut">
      <table className="w-full border-collapse bg-surface text-left text-sm">
        <thead>
          <tr className="bg-surface-alt font-mono text-eyebrow uppercase text-faint">
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

export function CreatorCodeTable({ codes }: CreatorCodeTableProps) {
  const verified = codes.filter((entry) => entry.verified)
  const unverified = codes.filter((entry) => !entry.verified)

  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      <CodeTable codes={verified.length ? verified : codes} />
      {verified.length > 0 && unverified.length > 0 && (
        <details className="rounded-card-sm border-brut bg-surface-alt">
          <summary className="cursor-pointer px-4 py-3 font-semibold marker:text-faint">
            Show {unverified.length} unverified codes
            <span className="ml-2 font-mono text-xs font-normal text-faint">
              from the original 2020 list
            </span>
          </summary>
          <div className="border-t-2 border-line p-4">
            <p className="mt-0 mb-4 text-sm text-muted">
              No current creator-code list confirms these, so they may well have
              been retired. They are kept here in case they still work — but
              start with the checked list above.
            </p>
            <CodeTable codes={unverified} />
          </div>
        </details>
      )}
    </div>
  )
}
