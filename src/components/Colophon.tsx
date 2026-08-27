import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTRAST_PAIRS } from '../lib/contrast-pairs'
import { useI18n } from '../i18n/I18nProvider'
import { PROFILE } from '../data/profile'

export function Colophon() {
  const { t } = useI18n()
  const copy = t.colophon
  const [year, setYear] = useState(copy.year)

  useEffect(() => setYear(String(new Date().getFullYear())), [])

  const rows = [
    { label: copy.builtWith, value: copy.stack },
    { label: copy.fontsLabel, value: copy.fonts },
    { label: copy.colorLabel, value: copy.color },
    { label: copy.contrastLabel, value: `${CONTRAST_PAIRS.length} ${copy.contrastNote}` },
  ]

  return (
    <footer className="section border-t border-[var(--line)]">
      <h2 className="sr-only">{copy.heading}</h2>

      <dl className="grid max-w-[80ch] gap-x-lg gap-y-xs font-mono text-xs leading-relaxed @xl:grid-cols-[8rem_1fr]">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-[var(--ink-3)]">{row.label}</dt>
            <dd className="text-[var(--ink-2)]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-lg flex flex-wrap items-baseline gap-x-lg gap-y-xs font-mono text-xs text-[var(--ink-3)]">
        <p>
          {copy.rights}, {year}.
        </p>

        {/* O currículo saiu da barra do topo e mora aqui, ao lado dos perfis:
            é o mesmo tipo de link, um lugar para onde ir depois de ler. */}
        <ul className="flex flex-wrap gap-x-lg gap-y-xs">
          <li>
            <Link className="link" to="/curriculo">
              {t.nav.resume}
            </Link>
          </li>
          <li>
            <a className="link" href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
              <span className="sr-only"> ({t.a11y.externalLink})</span>
            </a>
          </li>
          <li>
            <a className="link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
              <span className="sr-only"> ({t.a11y.externalLink})</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
