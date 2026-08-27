import { MoonIcon, SunIcon } from './icons'
import { useTheme } from '../theme/ThemeProvider'
import { useI18n } from '../i18n/I18nProvider'

export function ThemeToggle({ onNav = false, label }: { onNav?: boolean; label?: string }) {
  const { theme, toggle } = useTheme()
  const { t } = useI18n()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label ?? t.a11y.themeToggle}
      className={
        onNav
          ? 'inline-flex size-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--nav-ink-2)] transition-colors hover:bg-[color-mix(in_oklab,var(--nav-ink)_12%,transparent)] hover:text-[var(--nav-ink)]'
          : 'btn btn--secondary btn--icon btn--sm'
      }
    >
      {theme === 'dark' ? (
        <SunIcon size={16} aria-hidden="true" />
      ) : (
        <MoonIcon size={16} aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {theme === 'dark' ? t.a11y.themeNowDark : t.a11y.themeNowLight}
      </span>
    </button>
  )
}
