import { cn } from '../lib/cn'

export type Status = 'paid' | 'pending' | 'rejected' | 'review'

export function StatusBadge({ status, label }: { status: Status; label: string }) {
  return (
    <span className={cn('badge', `badge--${status}`)}>
      <span className="badge__dot" aria-hidden="true" />
      {label}
    </span>
  )
}
