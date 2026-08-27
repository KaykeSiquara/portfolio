import type { ReactNode } from 'react'

// Título empilhado, sem rótulo em caixa alta acima e sem parágrafo flutuando
// na direita. `as` existe porque a mesma seção muda de nível conforme a página:
// sozinha ela é o h1, dentro de uma página com várias ela é h2.
export function SectionHeading({
  id,
  number,
  title,
  lede,
  as: Tag = 'h2',
}: {
  id?: string
  number?: string
  title: string
  lede?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <header className="mb-lg max-w-[52ch]">
      <Tag
        id={id}
        className={
          Tag === 'h3'
            ? 'text-xl font-semibold tracking-tight'
            : 'text-2xl font-semibold tracking-tight @xl:text-3xl'
        }
      >
        {number && (
          <span className="mr-sm font-mono text-base font-normal text-[var(--ink-3)]" aria-hidden="true">
            {number}
          </span>
        )}
        {title}
      </Tag>
      {lede && <p className="mt-sm text-[var(--ink-2)]">{lede}</p>}
    </header>
  )
}
