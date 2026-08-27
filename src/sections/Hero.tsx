import { Link } from 'react-router-dom'
import { ArrowRightIcon, FileTextIcon } from '../ui/icons'

import { useI18n } from '../i18n/I18nProvider'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="section">
      {/* Papel e disponibilidade na mesma linha. O hero fica em quatro
          elementos de texto: aqui, o nome, a linha de apoio e os botões. */}
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">
        {t.hero.role}
        <span aria-hidden="true"> / </span>
        <span className="text-[var(--brand-text)]">{t.hero.availability}</span>
      </p>

      <h1
        className="mt-sm font-semibold"
        style={{ fontSize: 'var(--text-display-s)', letterSpacing: '-0.03em', lineHeight: 1.02 }}
      >
        {t.hero.name}
      </h1>

      <p className="mt-md max-w-[46ch] text-lg leading-relaxed text-[var(--ink-2)]">{t.hero.lede}</p>

      <div className="mt-lg flex flex-wrap gap-sm">
        <Link to="/inatos" className="btn btn--primary">
          {t.hero.ctaPrimary}
          <ArrowRightIcon size={15} aria-hidden="true" />
        </Link>
        <Link to="/curriculo" className="btn btn--secondary">
          <FileTextIcon size={15} aria-hidden="true" />
          {t.hero.ctaSecondary}
        </Link>
      </div>
    </section>
  )
}
