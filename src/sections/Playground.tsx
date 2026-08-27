import type { ReactNode } from 'react'
import { KeyboardIcon } from '../ui/icons'

import { useI18n } from '../i18n/I18nProvider'
import { SectionHeading } from '../ui/SectionHeading'
import { BadgeDemo } from '../demos/BadgeDemo'
import { ComboboxDemo } from '../demos/ComboboxDemo'
import { DialogDemo } from '../demos/DialogDemo'
import { EntriesTable } from '../demos/EntriesTable'
import { ResizableArea } from '../ui/ResizableArea'
import { FieldDemo } from '../demos/FieldDemo'
import { StatesDemo } from '../demos/StatesDemo'

export function Playground() {
  const { t } = useI18n()
  const copy = t.playground

  return (
    <section id="playground" className="section">
      {/* h1: esta seção abre a página /design-system. */}
      <SectionHeading as="h1" title={copy.heading} lede={copy.lede} />

      <p className="mb-xl inline-flex items-center gap-xs rounded-[var(--radius-md)] bg-[var(--brand-subtle)] px-sm py-2xs text-xs text-[var(--brand-text)]">
        <KeyboardIcon size={14} aria-hidden="true" />
        {copy.keyboardNote}
      </p>

      <div className="flex flex-col">
        <Block title={copy.blocks.statesTitle} body={copy.blocks.statesBody}>
          <StatesDemo />
        </Block>

        <Block title={copy.blocks.fieldTitle} body={copy.blocks.fieldBody}>
          <FieldDemo />
        </Block>

        <Block title={copy.blocks.badgeTitle} body={copy.blocks.badgeBody}>
          <BadgeDemo />
        </Block>

        <Block title={copy.blocks.comboboxTitle} body={copy.blocks.comboboxBody}>
          <ComboboxDemo />
        </Block>

        <Block title={copy.blocks.dialogTitle} body={copy.blocks.dialogBody}>
          <DialogDemo />
        </Block>

        <Block title={copy.blocks.tableTitle} body={copy.blocks.tableBody}>
          {/* A mesma área redimensionável do estudo de caso. Aqui com o filtro
              ligado: a promessa do bloco e que a tabela filtra, ordena E muda
              de forma, então as três coisas precisam estar na mesma mao. */}
          <ResizableArea maxHeight="34rem">
            <EntriesTable />
          </ResizableArea>
        </Block>
      </div>
    </section>
  )
}

function Block({ title, body, children }: { title: string; body: string; children: ReactNode }) {
  return (
    <article className="border-t border-[var(--line)] py-xl">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="mb-lg mt-xs max-w-[62ch] text-sm leading-relaxed text-[var(--ink-2)]">{body}</p>
      {children}
    </article>
  )
}
