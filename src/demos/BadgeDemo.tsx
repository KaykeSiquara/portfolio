import { useI18n } from '../i18n/I18nProvider'
import { StatusBadge } from '../ui/StatusBadge'
import type { Status } from '../ui/StatusBadge'

const ORDER: Status[] = ['paid', 'pending', 'review', 'rejected']

export function BadgeDemo() {
  const { t } = useI18n()

  return (
    <div className="inatos-palette flex flex-wrap gap-xs">
      {ORDER.map((status) => (
        <StatusBadge key={status} status={status} label={t.demos.badge[status]} />
      ))}
    </div>
  )
}
