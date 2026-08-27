import { cn } from '../lib/cn'
import { useI18n } from '../i18n/I18nProvider'
import type { Locale } from '../i18n/types'

const OPTIONS: Array<{ locale: Locale; code: string; lang: string }> = [
  { locale: 'pt', code: 'PT', lang: 'pt-BR' },
  { locale: 'en', code: 'EN', lang: 'en' },
]

export function LangToggle({ onNav = false }: { onNav?: boolean }) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.a11y.langGroup}
      className={cn(
        'inline-flex items-center gap-[2px] rounded-[var(--radius-md)] p-[2px]',
        onNav
          ? 'bg-[var(--nav-group)]'
          : 'border border-[var(--field-line)] bg-[var(--surface-2)]',
      )}
    >
      {OPTIONS.map((option) => {
        const active = option.locale === locale
        return (
          <button
            key={option.locale}
            type="button"
            lang={option.lang}
            aria-current={active ? 'true' : undefined}
            aria-label={option.locale === 'pt' ? t.a11y.langPt : t.a11y.langEn}
            onClick={() => setLocale(option.locale)}
            className={cn(
              'inline-flex h-8 items-center rounded-[var(--radius-sm)] px-2 font-mono text-2xs font-medium tracking-wide transition-colors',
              onNav
                ? active
                  ? 'bg-[var(--nav-ink)] text-[var(--nav)]'
                  : 'text-[var(--nav-ink-2)] hover:text-[var(--nav-ink)]'
                : active
                  ? 'bg-[var(--ink)] text-[var(--bg)]'
                  : 'text-[var(--ink-3)] hover:text-[var(--ink)]',
            )}
          >
            {option.code}
            {active && <span className="sr-only">, {t.a11y.langCurrent}</span>}
          </button>
        )
      })}
    </div>
  )
}
