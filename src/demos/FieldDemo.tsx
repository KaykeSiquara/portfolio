import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { Field } from '../ui/Field'

export function FieldDemo() {
  const { t } = useI18n()
  const copy = t.demos.field
  const states = t.demos.button.states
  const [value, setValue] = useState('1.284,90')

  const numeric = Number(value.replace(/\./g, '').replace(',', '.'))
  const invalid = value.trim() !== '' && (!Number.isFinite(numeric) || numeric <= 0)

  return (
    <div className="flex flex-col gap-sm">
      <div className="grid gap-lg @3xl:grid-cols-3">
        <Variant label={states.default}>
          <Field
            label={copy.label}
            srSuffix={states.default}
            help={copy.help}
            placeholder={copy.placeholder}
            inputMode="decimal"
            value={value}
            error={invalid ? copy.error : undefined}
            onChange={(event) => setValue(event.target.value)}
          />
        </Variant>

        <Variant label={states.error}>
          <Field
            label={copy.label}
            srSuffix={states.error}
            help={copy.help}
            placeholder={copy.placeholder}
            value="0,00"
            error={copy.error}
            readOnly
            onChange={() => undefined}
          />
        </Variant>

        <Variant label={states.disabled}>
          <Field
            label={copy.label}
            srSuffix={states.disabled}
            help={copy.help}
            placeholder={copy.placeholder}
            value=""
            disabled
            onChange={() => undefined}
          />
        </Variant>
      </div>

      <p className="text-xs text-[var(--ink-3)]">{copy.hint}</p>
    </div>
  )
}

function Variant({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-xs">
      <span aria-hidden="true" className="font-mono text-2xs uppercase tracking-wider text-[var(--ink-3)]">
        {label}
      </span>
      {children}
    </div>
  )
}
