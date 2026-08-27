import { useI18n } from '../i18n/I18nProvider'
import { Button } from '../ui/Button'
import type { ForcedState } from '../ui/Button'

type Row = {
  key: keyof ReturnType<typeof useI18n>['t']['demos']['button']['states']
  forced?: ForcedState
  disabled?: boolean
  loading?: boolean
  error?: boolean
}

const ROWS: Row[] = [
  { key: 'default' },
  { key: 'hover', forced: 'hover' },
  { key: 'focus', forced: 'focus' },
  { key: 'active', forced: 'active' },
  { key: 'disabled', disabled: true },
  { key: 'loading', loading: true },
  { key: 'error', error: true },
]

export function StatesDemo({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n()
  const copy = t.demos.button

  return (
    <div className="flex flex-col gap-sm">
      <ul className="grid w-fit grid-cols-[auto_auto] items-center gap-x-md gap-y-xs @xl:gap-x-lg">
        {ROWS.map((row) => (
          <li key={row.key} className="contents">
            <span className="font-mono text-2xs uppercase tracking-wider text-[var(--ink-3)]">
              {copy.states[row.key]}
            </span>
            <span>
              <Button
                variant="primary"
                size={compact ? 'sm' : 'md'}
                forced={row.forced}
                disabled={row.disabled}
                loading={row.loading}
                loadingLabel={copy.loading}
                error={row.error}
                /* Estados forcados são vitrine, não controle: o leitor de tela
                   não deve encontrar sete botões que fazem a mesma coisa. */
                tabIndex={row.forced || row.disabled ? -1 : undefined}
                aria-hidden={row.forced ? true : undefined}
              >
                {row.error ? copy.error : copy.label}
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--ink-3)]">{copy.forcedNote}</p>
    </div>
  )
}
