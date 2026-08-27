import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function ProofLine() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="proof-heading" className="section bg-[var(--surface-2)]">
      <div>
        <h2 id="proof-heading" className="sr-only">
          {t.proof.heading}
        </h2>

        {/* Os números alinham pela direita numa coluna de largura fixa. Com
            117, 13, 257/257 e 36 lado a lado, deixar o alinhamento por conta
            da quebra de linha faz parecer acidente em vez de composição. */}
        <ul className="grid gap-x-2xl gap-y-lg @2xl:grid-cols-2">
          {t.proof.items.map((item) => (
            <li key={item.value}>
              <Link
                to={item.href}
                /* No celular empilha. A coluna fixa que alinha os números só
                   entra a partir de 640px, onde "257/257" cabe nela: forcar o
                   alinhamento numa tela estreita fazia o número invadir o
                   rótulo. */
                className="group grid items-baseline gap-2xs rounded-[var(--radius-sm)] no-underline @lg:grid-cols-[8.5rem_minmax(0,1fr)] @lg:gap-md"
              >
                <span className="num text-2xl font-semibold tracking-tight text-[var(--brand-text)] transition-colors group-hover:text-[var(--brand-hover)] @lg:text-right">
                  {item.value}
                </span>
                <span className="text-sm leading-snug text-[var(--ink-2)] underline decoration-[var(--line-strong)] decoration-1 underline-offset-4 transition-colors group-hover:decoration-[var(--brand-text)]">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-md font-mono text-xs text-[var(--ink-3)]">{t.proof.note}</p>
      </div>
    </section>
  )
}
