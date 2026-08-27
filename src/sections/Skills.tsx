import { useI18n } from '../i18n/I18nProvider'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="section">
      <SectionHeading title={t.skills.heading} lede={t.skills.lede} />

      <dl>
        {t.skills.groups.map((group) => (
          <div
            key={group.title}
            className="grid gap-2xs border-t border-[var(--line)] py-md @xl:grid-cols-[10rem_minmax(0,1fr)] @xl:gap-lg"
          >
            <dt className="text-sm font-semibold">{group.title}</dt>
            <dd className="text-sm leading-relaxed text-[var(--ink-2)]">{group.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
