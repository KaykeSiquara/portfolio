import { useI18n } from '../i18n/I18nProvider'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  const { t } = useI18n()

  return (
    <section id="education" className="section">
      <SectionHeading title={t.education.heading} />

      <div className="grid gap-xl @xl:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold">{t.education.course}</h3>
          <p className="mt-2xs text-sm text-[var(--ink-2)]">{t.education.school}</p>
          <p className="mt-2xs font-mono text-xs text-[var(--ink-3)]">{t.education.period}</p>
        </div>

        <dl className="flex flex-col gap-md">
          {t.education.languages.map((language) => (
            <div key={language.name}>
              <dt className="text-sm font-semibold">
                {language.name}
                <span className="ml-xs font-normal text-[var(--brand-text)]">{language.level}</span>
              </dt>
              {language.detail && (
                <dd className="mt-2xs text-sm leading-relaxed text-[var(--ink-2)]">
                  {language.detail}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
