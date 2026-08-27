import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { XIcon } from './icons'
import { useFocusTrap } from '../lib/hooks'

export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  closeLabel,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  closeLabel: string
}) {
  const titleId = useId()
  const trapRef = useFocusTrap(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="dialog__backdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="dialog"
        ref={trapRef as React.RefObject<HTMLDivElement>}
      >
        <div className="mb-md flex items-start justify-between gap-md">
          <h2 id={titleId} className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="btn btn--ghost btn--icon btn--sm shrink-0"
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="text-sm leading-relaxed text-[var(--ink-2)]">{children}</div>

        {footer && <div className="mt-lg flex flex-wrap justify-end gap-xs">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
