import { useId, useRef, useState } from 'react'
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { PaperclipIcon, WarningCircleIcon, XIcon } from './icons'
import { cn } from '../lib/cn'
import type { ForcedState } from './Button'

type Shared = {
  label: string
  help?: string
  error?: string
  forced?: ForcedState
  hideLabel?: boolean
  srSuffix?: string
  required?: boolean
}

export function Field({
  label,
  help,
  error,
  forced,
  hideLabel,
  required,
  srSuffix,
  className,
  id: givenId,
  ...rest
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId()
  // O id pode vir de fora quando algo precisa apontar para o campo, como o
  // resumo de erros do formulário de contato, que ancora em cada um deles.
  const id = givenId ?? autoId
  const helpId = `${id}-help`
  const errorId = `${id}-error`
  const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className={cn('field', className)}>
      <label htmlFor={id} className={cn('field__label', hideLabel && 'sr-only')}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--danger-text)]">
            {' *'}
          </span>
        )}
        {srSuffix && <span className="sr-only">, {srSuffix}</span>}
      </label>
      {help && (
        <span id={helpId} className="field__help">
          {help}
        </span>
      )}
      <input
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          'field__control',
          forced === 'hover' && 'is-hover',
          forced === 'focus' && 'is-focus',
          rest.disabled && 'is-disabled',
        )}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}

export function TextArea({
  label,
  help,
  error,
  hideLabel,
  required,
  className,
  id: givenId,
  ...rest
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const autoId = useId()
  const id = givenId ?? autoId
  const helpId = `${id}-help`
  const errorId = `${id}-error`
  const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className={cn('field', className)}>
      <label htmlFor={id} className={cn('field__label', hideLabel && 'sr-only')}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--danger-text)]">
            {' *'}
          </span>
        )}
      </label>
      {help && (
        <span id={helpId} className="field__help">
          {help}
        </span>
      )}
      <textarea
        {...rest}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className="field__control"
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} className="field__error">
      <WarningCircleIcon size={14} weight="fill" aria-hidden="true" className="mt-[2px] shrink-0" />
      {children}
    </span>
  )
}

export function FileField({
  label,
  help,
  error,
  chooseLabel,
  emptyLabel,
  removeLabel,
  formatSize,
  required,
  id: givenId,
  ...rest
}: Omit<Shared, 'forced' | 'hideLabel'> &
  InputHTMLAttributes<HTMLInputElement> & {
    chooseLabel: string
    emptyLabel: string
    removeLabel: string
    formatSize: (bytes: number) => string
  }) {
  const autoId = useId()
  const id = givenId ?? autoId
  const helpId = `${id}-help`
  const errorId = `${id}-error`
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{ name: string; size: number } | null>(null)

  const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className="field">
      <span className="field__label">
        {label}
        {required && (
          <span aria-hidden="true" className="text-[var(--danger-text)]">
            {' *'}
          </span>
        )}
      </span>
      {help && (
        <span id={helpId} className="field__help">
          {help}
        </span>
      )}

      <div className="filefield">
        <input
          {...rest}
          ref={inputRef}
          id={id}
          type="file"
          className="filefield__input"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          onChange={(event) => {
            const picked = event.target.files?.[0]
            setFile(picked ? { name: picked.name, size: picked.size } : null)
          }}
        />

        {/* O rótulo carrega o nome do campo escondido para o leitor de tela,
            senao o botão se anunciaria só como "Escolher arquivo" é a pessoa
            não saberia arquivo de que. */}
        <label htmlFor={id} className="btn btn--secondary">
          <PaperclipIcon size={15} aria-hidden="true" />
          {chooseLabel}
          <span className="sr-only">, {label}</span>
        </label>

        <span className="filefield__name" data-empty={file === null} aria-live="polite">
          {file ? (
            <>
              {file.name}
              <span className="filefield__size">{formatSize(file.size)}</span>
            </>
          ) : (
            emptyLabel
          )}
        </span>

        {file && (
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm"
            aria-label={removeLabel}
            onClick={() => {
              if (inputRef.current) inputRef.current.value = ''
              setFile(null)
              inputRef.current?.focus()
            }}
          >
            <XIcon size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  )
}
