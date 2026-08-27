import { useState } from 'react'
import { CheckIcon, CopyIcon, EnvelopeSimpleIcon, PhoneIcon, WarningCircleIcon } from '../ui/icons'

import { PROFILE } from '../data/profile'
import { useCopyToClipboard } from '../lib/hooks'
import { useI18n } from '../i18n/I18nProvider'
import { Button } from '../ui/Button'
import { Field, TextArea } from '../ui/Field'
import { SectionHeading } from '../ui/SectionHeading'

type Errors = { name?: string; email?: string; message?: string }
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const FIELD_IDS = { name: 'contact-name', email: 'contact-email', message: 'contact-message' } as const

export function Contact() {
  const { t } = useI18n()
  const copy = t.contact

  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [copiedEmail, copyEmail] = useCopyToClipboard()
  const [copiedPhone, copyPhone] = useCopyToClipboard()

  function validate(next = values): Errors {
    const found: Errors = {}
    if (!next.name.trim()) found.name = copy.errors.nameRequired
    if (!next.email.trim()) found.email = copy.errors.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(next.email.trim()))
      found.email = copy.errors.emailInvalid
    if (!next.message.trim()) found.message = copy.errors.messageRequired
    return found
  }

  function update(key: keyof typeof values, value: string) {
    const next = { ...values, [key]: value }
    setValues(next)
    if (submitted) setErrors(validate(next))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    const found = validate()
    setErrors(found)

    const firstInvalid = (['name', 'email', 'message'] as const).find((key) => found[key])
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }

    if (!PROFILE.contactEndpoint) {
      const subject = encodeURIComponent(`${copy.heading}: ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n${values.name}\n${values.email}`)
      window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(PROFILE.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('sent')
      setValues({ name: '', email: '', message: '' })
      setSubmitted(false)
    } catch {
      setStatus('failed')
    }
  }

  const errorList = (['name', 'email', 'message'] as const).filter((key) => errors[key])

  return (
    <section id="contact" className="section">
      {/* h1: esta seção abre a página /contato. */}
      <SectionHeading as="h1" title={copy.heading} lede={copy.lede} />

      <div className="grid gap-2xl @3xl:grid-cols-12">
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-md @3xl:col-span-7">
          {submitted && errorList.length > 0 && (
            <div
              role="alert"
              className="rounded-[var(--radius-md)] border border-[var(--danger-line)] bg-[var(--danger-subtle)] p-md"
            >
              <p className="flex items-center gap-xs text-sm font-medium text-[var(--danger-text)]">
                <WarningCircleIcon size={15} weight="fill" aria-hidden="true" />
                {copy.errors.summary}
              </p>
              <ul className="mt-xs flex flex-col gap-2xs pl-lg">
                {errorList.map((key) => (
                  <li key={key} className="list-disc text-sm">
                    <a href={`#${FIELD_IDS[key]}`} className="link text-[var(--danger-text)]">
                      {errors[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-md @xl:grid-cols-2">
            <Field
              id={FIELD_IDS.name}
              name="name"
              label={copy.nameLabel}
              required
              autoComplete="name"
              value={values.name}
              error={errors.name}
              onChange={(event) => update('name', event.target.value)}
            />
            <Field
              id={FIELD_IDS.email}
              name="email"
              type="email"
              label={copy.emailLabel}
              required
              autoComplete="email"
              inputMode="email"
              value={values.email}
              error={errors.email}
              onChange={(event) => update('email', event.target.value)}
            />
          </div>

          <TextArea
            id={FIELD_IDS.message}
            name="message"
            label={copy.messageLabel}
            help={copy.messageHelp}
            required
            rows={5}
            value={values.message}
            error={errors.message}
            onChange={(event) => update('message', event.target.value)}
          />

          <div className="flex flex-wrap items-center gap-md">
            <Button type="submit" loading={status === 'sending'} loadingLabel={copy.sending}>
              {copy.submit}
            </Button>

            <p role="status" className="text-sm">
              {status === 'sent' && (
                <span className="inline-flex items-center gap-xs text-[var(--brand-text)]">
                  <CheckIcon size={14} weight="bold" aria-hidden="true" />
                  {copy.sent}
                </span>
              )}
              {status === 'failed' && (
                <span className="inline-flex items-center gap-xs text-[var(--danger-text)]">
                  <WarningCircleIcon size={14} weight="fill" aria-hidden="true" />
                  {copy.failed}
                </span>
              )}
            </p>
          </div>

          {!PROFILE.contactEndpoint && (
            <p className="text-xs text-[var(--ink-3)]">{copy.mailtoNote}</p>
          )}
        </form>

        <div className="@3xl:col-span-5">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-3)]">
            {copy.directLabel}
          </h2>

          <ul className="mt-md flex flex-col gap-sm">
            <ContactRow
              icon={<EnvelopeSimpleIcon size={16} aria-hidden="true" />}
              href={`mailto:${PROFILE.email}`}
              value={PROFILE.email}
              copyLabel={copy.copyEmail}
              copiedLabel={copy.copied}
              copied={copiedEmail}
              onCopy={() => copyEmail(PROFILE.email)}
            />
            <ContactRow
              icon={<PhoneIcon size={16} aria-hidden="true" />}
              href={`tel:${PROFILE.phone.replace(/\s/g, '')}`}
              value={PROFILE.phoneDisplay}
              copyLabel={copy.copyPhone}
              copiedLabel={copy.copied}
              copied={copiedPhone}
              onCopy={() => copyPhone(PROFILE.phone)}
            />
          </ul>

          <ul className="mt-lg flex flex-wrap gap-sm">
            <li>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn--secondary btn--sm">
                GitHub
                <span className="sr-only"> ({t.a11y.externalLink})</span>
              </a>
            </li>
            <li>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn--secondary btn--sm"
              >
                LinkedIn
                <span className="sr-only"> ({t.a11y.externalLink})</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function ContactRow({
  icon,
  href,
  value,
  copyLabel,
  copiedLabel,
  copied,
  onCopy,
}: {
  icon: React.ReactNode
  href: string
  value: string
  copyLabel: string
  copiedLabel: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <li className="flex items-center justify-between gap-sm rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] px-sm py-xs">
      <a href={href} className="flex min-w-0 items-center gap-xs text-sm">
        <span className="shrink-0 text-[var(--ink-3)]">{icon}</span>
        <span className="truncate">{value}</span>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copyLabel}
        className="btn btn--ghost btn--icon btn--sm shrink-0"
      >
        {copied ? (
          <CheckIcon size={14} weight="bold" aria-hidden="true" />
        ) : (
          <CopyIcon size={14} aria-hidden="true" />
        )}
        <span className="sr-only" role="status">
          {copied ? copiedLabel : ''}
        </span>
      </button>
    </li>
  )
}
