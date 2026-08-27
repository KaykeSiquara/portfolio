import { ArrowRightIcon } from '../ui/icons'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useI18n } from '../i18n/I18nProvider'
import type { Locale } from '../i18n/types'


const OPTIONS: Array<{
  locale: Locale
  lang: string
  name: string
  description: string
  suggested: string
}> = [
  {
    locale: 'pt',
    lang: 'pt-BR',
    name: 'Português',
    description: 'Ver o site em português do Brasil',
    suggested: 'Sugerido pelo seu navegador',
  },
  {
    locale: 'en',
    lang: 'en',
    name: 'English',
    description: 'View the site in English',
    suggested: 'Suggested by your browser',
  },
]

export function LanguageGate() {
  const { locale, setLocale } = useI18n()

  return (
    <main id="main" className="flex min-h-dvh items-center justify-center px-lg py-2xl">
      <div className="w-full max-w-[42rem]">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">
          Kayke Siquara Mendonça
        </p>

        {/* O título aparece nas duas línguas porque, neste ponto, não dá para
            saber qual delas a pessoa le. */}
        <h1 className="mt-sm text-2xl font-semibold tracking-tight">
          <span lang="pt-BR">Escolha o idioma</span>
          <span aria-hidden="true" className="mx-xs text-[var(--ink-3)]">
            /
          </span>
          <span lang="en">Choose a language</span>
        </h1>

        <ul className="mt-xl grid gap-md sm:grid-cols-2">
          {OPTIONS.map((option) => {
            const isSuggested = option.locale === locale
            return (
              <li key={option.locale}>
                <button
                  type="button"
                  lang={option.lang}
                  onClick={() => setLocale(option.locale)}
                  className="group flex h-full w-full flex-col items-start gap-2xs rounded-[var(--radius-lg)] border border-[var(--field-line)] bg-[var(--surface)] p-lg text-left transition-colors hover:border-[var(--brand)] hover:bg-[var(--surface-2)]"
                >
                  <span className="flex w-full items-center justify-between gap-sm">
                    <span className="text-lg font-semibold">{option.name}</span>
                    <ArrowRightIcon
                      size={16}
                      aria-hidden="true"
                      className="text-[var(--ink-3)] transition-colors group-hover:text-[var(--brand-text)]"
                    />
                  </span>
                  <span className="text-sm text-[var(--ink-2)]">{option.description}</span>
                  {isSuggested && (
                    <span className="mt-xs rounded-[var(--radius-sm)] border border-[var(--brand-line)] bg-[var(--brand-subtle)] px-xs py-[2px] text-2xs font-medium text-[var(--brand-text)]">
                      {option.suggested}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* O controle de tema fica DEPOIS dos cartões na ordem de foco. Numa
            tela com uma tarefa só, o primeiro Tab tem que cair na tarefa: com
            ele no topo, o Enter trocava o tema em vez de escolher o idioma. */}
        <div className="mt-lg flex flex-wrap items-center justify-between gap-md">
          <p className="text-xs text-[var(--ink-3)]">
            <span lang="pt-BR">Dá para trocar a qualquer momento, no topo da página.</span>
            <span aria-hidden="true" className="mx-xs">
              /
            </span>
            <span lang="en">You can switch at any time, from the top of the page.</span>
          </p>
          {/* Rótulo nas duas línguas, como o resto desta tela: aqui ainda não
              existe idioma corrente para escolher um. */}
          <ThemeToggle label="Alternar tema claro e escuro / Switch between light and dark theme" />
        </div>
      </div>
    </main>
  )
}
