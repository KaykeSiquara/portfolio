import { useI18n } from '../i18n/I18nProvider'

const ROLES = ['success', 'warning', 'danger', 'info'] as const

const SWATCH_VAR: Record<(typeof ROLES)[number], string> = {
  success: 'var(--i-success)',
  warning: 'var(--i-warning)',
  danger: 'var(--i-danger)',
  info: 'var(--i-info)',
}

export function PaletteDemo() {
  const { t } = useI18n()
  const copy = t.demos.palette

  return (
    <div className="inatos-palette flex flex-col gap-lg">
      <div className="table-wrap">
        <table className="table">
          <caption className="sr-only">{copy.heading}</caption>
          <thead>
            <tr>
              <th scope="col">{copy.columns.origin}</th>
              <th scope="col">{copy.columns.hue}</th>
              <th scope="col">{copy.columns.role}</th>
              <th scope="col">{copy.columns.meaning}</th>
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row, index) => {
              const role = ROLES[index]!
              return (
                <tr key={row.role}>
                  <td data-label={copy.columns.origin}>
                    <span className="flex items-center gap-xs">
                      <span
                        aria-label={copy.swatchLabel(row.role)}
                        role="img"
                        className="size-4 shrink-0 rounded-[var(--radius-sm)]"
                        style={{ background: SWATCH_VAR[role] }}
                      />
                      {row.origin}
                    </span>
                  </td>
                  <td data-label={copy.columns.hue} className="num font-mono text-xs">
                    {row.hue}
                  </td>
                  <td data-label={copy.columns.role}>
                    <code className="font-mono text-xs" style={{ color: SWATCH_VAR[role] }}>
                      {row.role}
                    </code>
                  </td>
                  <td data-label={copy.columns.meaning} className="text-[var(--ink-2)]">
                    {row.meaning}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="border-l-0 border-t border-[var(--line)] pt-md">
        <h3 className="text-base font-semibold">{copy.tuningTitle}</h3>
        <p className="mt-xs max-w-[62ch] text-sm leading-relaxed text-[var(--ink-2)]">{copy.tuning}</p>
      </div>
    </div>
  )
}
