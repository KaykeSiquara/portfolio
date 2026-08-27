import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../ui/icons'

import { useI18n } from '../i18n/I18nProvider'

export function CaseTeaser() {
  const { t } = useI18n()
  const copy = t.caseTeaser

  return (
    <section
      id="case"
      className="section bg-[var(--nav)] text-[var(--nav-ink)]"
    >
      <div className="grid gap-xl">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--nav-ink-2)]">
            {copy.eyebrow}
          </p>
          <h2 className="mt-sm text-2xl font-semibold tracking-tight @xl:text-3xl">{copy.heading}</h2>
          {/* lang no nome legal para o leitor de tela não pronunciar português com
              fonema de ingles. A glosa entre parenteses só existe em ingles: em
              portugues o nome já se explica sozinho. */}
          <p className="mt-2xs text-sm text-[var(--nav-ink-2)]">
            <span lang="pt-BR">{copy.org}</span>
            {copy.orgGloss && <span> ({copy.orgGloss})</span>}
          </p>
          <p className="mt-2xs font-mono text-xs text-[var(--nav-ink-2)]">{copy.period}</p>

          <p className="mt-lg max-w-[58ch] leading-relaxed text-[var(--nav-ink)]">{copy.body}</p>

          <Link
            to="/inatos"
            className="mt-xl inline-flex min-h-11 items-center gap-xs rounded-[var(--radius-md)] bg-[var(--nav-ink)] px-md text-sm font-medium text-[var(--nav)] transition-opacity hover:opacity-90"
          >
            {copy.cta}
            <ArrowRightIcon size={15} aria-hidden="true" />
          </Link>
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-x-lg gap-y-md @xl:grid-cols-4">
            {copy.facts.map((fact) => (
              <div key={fact.value}>
                <dt className="num text-2xl font-semibold tracking-tight">{fact.key}</dt>
                <dd className="mt-2xs text-sm text-[var(--nav-ink-2)]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
