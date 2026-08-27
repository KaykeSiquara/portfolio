import { useState } from 'react'
import { PaperclipIcon } from '../ui/icons'

import { useI18n } from '../i18n/I18nProvider'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { FileField } from '../ui/Field'

export function DialogDemo() {
  const { t, formatBytes } = useI18n()
  const copy = t.demos.dialog
  const [open, setOpen] = useState(false)
  const [closedOnce, setClosedOnce] = useState(false)

  function close() {
    setOpen(false)
    setClosedOnce(true)
  }

  return (
    <div className="flex flex-col items-start gap-sm">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <PaperclipIcon size={15} aria-hidden="true" />
        {copy.trigger}
      </Button>

      {/* Confirma em texto o que acabou de acontecer com o foco. Sem isso, a
          única prova de que ele voltou e ver o anel piscar de volta. */}
      <p role="status" className="min-h-4 text-xs text-[var(--ink-3)]">
        {closedOnce && !open ? copy.closed : ''}
      </p>

      <Dialog
        open={open}
        onClose={close}
        title={copy.title}
        closeLabel={t.a11y.closeDialog}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              {copy.cancel}
            </Button>
            <Button variant="primary" onClick={close}>
              {copy.confirm}
            </Button>
          </>
        }
      >
        <p className="mb-md">{copy.body}</p>
        <FileField
          label={copy.fileLabel}
          chooseLabel={copy.fileChoose}
          emptyLabel={copy.fileNone}
          removeLabel={copy.fileRemove}
          formatSize={formatBytes}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </Dialog>
    </div>
  )
}
