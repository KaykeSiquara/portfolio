import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

import { useI18n } from '../i18n/I18nProvider'
import { ContrastReport } from '../demos/ContrastReport'
import { PaletteDemo } from '../demos/PaletteDemo'
import { ResizeDemo } from '../demos/ResizeDemo'
import { StatesDemo } from '../demos/StatesDemo'
import { DialogDemo } from '../demos/DialogDemo'

const SECTION_IDS = [
  'problema',
  'migracao',
  'paleta',
  'estados',
  'acessibilidade',
  'contraste',
  'densidade',
  'regras',
] as const

export function InatosCase() {
  const { t } = useI18n()
  const copy = t.caseStudy
  const sections = copy.sections

  useEffect(() => {
    document.title = t.meta.caseTitle
    return () => {
      document.title = t.meta.title
    }
  }, [t])

  return (
    <>
          <header className="section">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">
              {copy.eyebrow}
            </p>
            <h1
              className="mt-sm font-semibold"
              style={{ fontSize: 'var(--text-display-s)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              {copy.title}
            </h1>
            <p className="mt-sm text-sm text-[var(--ink-3)]">{copy.subtitle}</p>
            <p className="mt-lg max-w-[64ch] text-lg leading-relaxed text-[var(--ink-2)]">
              {copy.intro}
            </p>

            {/* Um documento de oito seções
                precisa dizer no comeco o que tem dentro, senao a única forma
                de saber e rolar até o fim. */}
            <nav aria-labelledby="toc-heading" className="mt-2xl">
              <h2
                id="toc-heading"
                className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]"
              >
                {copy.toc}
              </h2>
              <ol className="mt-sm grid gap-x-lg gap-y-2xs @xl:grid-cols-2">
                {SECTION_IDS.map((id, index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="inline-flex min-h-9 items-baseline gap-sm text-sm text-[var(--ink-2)] hover:text-[var(--brand-text)]"
                    >
                      <span className="num font-mono text-xs text-[var(--ink-3)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="underline decoration-[var(--line-strong)] underline-offset-4">
                        {copy.rail[index]}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </header>

          <Section id="problema" number={sections.problem.number} title={sections.problem.title}>
            <Prose paragraphs={sections.problem.body} />
          </Section>

          <Section id="migracao" number={sections.migration.number} title={sections.migration.title}>
            <Prose paragraphs={sections.migration.body} />
          </Section>

          <Section id="paleta" number={sections.palette.number} title={sections.palette.title}>
            <Prose paragraphs={sections.palette.body} />
            <Exhibit>
              <PaletteDemo />
            </Exhibit>
          </Section>

          <Section id="estados" number={sections.states.number} title={sections.states.title}>
            <Prose paragraphs={sections.states.body} />
            <Exhibit>
              <div className="grid gap-xl @2xl:grid-cols-2">
                <StatesDemo />
                <DialogDemo />
              </div>
            </Exhibit>
          </Section>

          <Section
            id="acessibilidade"
            number={sections.a11y.number}
            title={sections.a11y.title}
          >
            <Prose paragraphs={sections.a11y.body} />
            <Exhibit>
              <div className="table-wrap">
                <table className="table">
                  <caption>{sections.a11y.table.caption}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{sections.a11y.table.columns.metric}</th>
                      <th scope="col" className="num">
                        {sections.a11y.table.columns.before}
                      </th>
                      <th scope="col" className="num">
                        {sections.a11y.table.columns.after}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.a11y.table.rows.map((row) => (
                      <tr key={row.metric}>
                        <th scope="row" className="font-normal">
                          {row.metric}
                        </th>
                        <td data-label={sections.a11y.table.columns.before} className="num text-[var(--ink-3)]">
                          {row.before}
                        </td>
                        <td
                          data-label={sections.a11y.table.columns.after}
                          className="num font-medium text-[var(--brand-text)]"
                        >
                          {row.after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Exhibit>
            <Prose paragraphs={[sections.a11y.after]} />
          </Section>

          <Section id="contraste" number={sections.contrast.number} title={sections.contrast.title}>
            <Prose paragraphs={sections.contrast.body} />
            <Exhibit>
              <ContrastReport />
            </Exhibit>
          </Section>

          <Section id="densidade" number={sections.density.number} title={sections.density.title}>
            <Prose paragraphs={sections.density.body} />
            <Exhibit>
              <ResizeDemo />
            </Exhibit>
          </Section>

          <Section id="regras" number={sections.rules.number} title={sections.rules.title}>
            <Prose paragraphs={sections.rules.body} />

            {/* Regra e o porquê dela, lado a lado. Uma regra sem a tela que a
                produziu e só opiniao com cara de padrão. */}
            <dl className="mt-lg">
              {sections.rules.items.map((item) => (
                <div key={item.title} className="border-t border-[var(--line)] py-lg">
                  <dt className="max-w-[56ch] text-base font-semibold">{item.title}</dt>
                  <dd className="mt-xs max-w-[68ch] text-sm leading-relaxed text-[var(--ink-2)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <p className="section text-center">
            <Link to="/" className="link text-sm">
              {copy.back}
            </Link>
          </p>
    </>
  )
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      /* scroll-mt para o título não ficar embaixo da barra fixa quando
         alguem chega por um link do indice. */
      className="section scroll-mt-16 border-t border-[var(--line)]"
    >
      <h2 className="mb-lg flex items-baseline gap-md text-2xl font-semibold tracking-tight @xl:text-3xl">
        <span className="font-mono text-base font-normal text-[var(--ink-3)]" aria-hidden="true">
          {number}
        </span>
        <span className="max-w-[22ch]">{title}</span>
      </h2>
      {children}
    </section>
  )
}

function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-md leading-relaxed text-[var(--ink-2)]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
    </div>
  )
}

function Exhibit({ children }: { children: ReactNode }) {
  return <div className="mt-xl">{children}</div>
}
