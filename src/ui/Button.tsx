import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

export type ForcedState = 'hover' | 'focus' | 'active' | undefined

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  variant?: ButtonVariant
  size?: 'sm' | 'md'
  loading?: boolean
  loadingLabel?: string
  error?: boolean
  forced?: ForcedState
  iconOnly?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingLabel,
  error = false,
  forced,
  iconOnly = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const state = loading ? 'loading' : error ? 'error' : undefined

  return (
    <button
      type="button"
      {...rest}
      data-state={state}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'btn',
        `btn--${variant}`,
        size === 'sm' && 'btn--sm',
        iconOnly && 'btn--icon',
        forced === 'hover' && 'is-hover',
        forced === 'focus' && 'is-focus',
        forced === 'active' && 'is-active',
        disabled && 'is-disabled',
        className,
      )}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {loading && loadingLabel ? loadingLabel : children}
    </button>
  )
}
