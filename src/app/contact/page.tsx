'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import ContactWizard from '@/components/sections/contact/ContactWizard'

export default function ContactPage() {
  const { dict } = useLocale()
  const c = dict.contact

  return (
    <main className="contact-page">
      <Link href="/" className="contact-page__back">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M6 1L12 5l-6 4M12 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {dict.notFound.backHome}
      </Link>

      <div className="contact-page__card">
        <div className="contact-page__card-head">
          <span className="label">{c.intro.eyebrow}</span>
          <h1 className="contact-page__heading">{c.intro.heading}</h1>
          <div className="contact-page__sla">
            <span className="contact-page__sla-dot" aria-hidden="true" />
            {c.sla.label}
          </div>
        </div>

        <ContactWizard />
      </div>
    </main>
  )
}
