import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import { Combobox } from '../ui/Combobox'

export function ComboboxDemo() {
  const { t } = useI18n()
  const copy = t.demos.combobox
  const [value, setValue] = useState(copy.options[0] ?? '')

  return (
    <div className="max-w-[24rem]">
      <Combobox
        label={copy.label}
        hint={copy.hint}
        options={copy.options}
        placeholder={copy.placeholder}
        emptyText={copy.empty}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
