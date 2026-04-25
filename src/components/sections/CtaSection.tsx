'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { WindowFrame } from '@/components/ui/WindowFrame'

const COOLDOWN_SECONDS = 60

export default function CtaSection() {
  const { dict } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorKey, setErrorKey] = useState<'requiredFields' | 'invalidEmail' | 'errorMessage' | null>(null)
  const [shakeKey, setShakeKey] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [cooldown, setCooldown] = useState(0)
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const startCooldown = useCallback(() => setCooldown(COOLDOWN_SECONDS), [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    }

    if (!payload.name || !payload.email || !payload.message) {
      setErrorKey('requiredFields')
      setShakeKey((k) => k + 1)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setErrorKey('invalidEmail')
      setShakeKey((k) => k + 1)
      return
    }

    setLoading(true)
    setErrorKey(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, _hp: honeypot }),
      })
      if (!res.ok) {
        if (res.status === 429) setErrorKey('errorMessage')
        else if (res.status === 400) setErrorKey('invalidEmail')
        else setErrorKey('errorMessage')
        setLoading(false)
        return
      }
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      startCooldown()
      setLoading(false)
    } catch {
      setErrorKey('errorMessage')
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="homepage-section homepage-section--cta relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px]"
        style={{
          background: 'radial-gradient(ellipse 60% 46% at 50% 10%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 36%, transparent 74%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-5 lg:px-10">
        <SectionReveal className="mb-10 text-center">
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.cta.eyebrow}
          </span>
          <h2 className="text-[clamp(34px,4.6vw,56px)] font-medium tracking-tight text-white">
            {dict.cta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 md:text-[17px]">
            {dict.cta.subtitle}
          </p>
        </SectionReveal>

        <SurfaceReveal delay={0.1}>
          <WindowFrame
            variant="glass"
            className="overflow-hidden border-white/[0.08] transition-shadow duration-[600ms] hover:shadow-[0_0_80px_rgba(255,255,255,0.04)]"
          >
            <div className="px-7 py-8 md:px-10 md:py-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="py-8 text-center"
                  >
                    <p className="text-[17px] text-white/80">{dict.contact.successMessage}</p>
                    <p className="mt-3 font-mono text-[12px] text-white/40">
                      <a
                        href="mailto:hello@shubak.ai"
                        className="transition-colors hover:text-white/70"
                      >
                        hello@shubak.ai
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                    initial={{ opacity: 0 }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : shakeKey > 0
                          ? { opacity: 1, x: [0, -4, 4, -2, 2, 0] }
                          : { opacity: 1 }
                    }
                    transition={
                      shakeKey > 0
                        ? { duration: 0.4, ease: 'easeOut' }
                        : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                    }
                  >
                    {/* Honeypot — bots fill this, humans don't see it */}
                    <input
                      type="text"
                      name="company_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      aria-hidden="true"
                    />

                    <AnimatePresence>
                      {errorKey && (
                        <motion.div
                          key={errorKey}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          role="alert"
                          aria-live="polite"
                          className="rounded-[10px] border border-white/[0.1] bg-white/[0.03] p-4 text-[14px] text-white/65"
                        >
                          <p>{dict.contact[errorKey]}</p>
                          <button
                            type="button"
                            onClick={() => setErrorKey(null)}
                            className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:text-white"
                          >
                            {dict.contact.retry}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label
                        htmlFor="cta-name"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                      >
                        {dict.contact.name}
                      </label>
                      <input
                        id="cta-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        dir="auto"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }))
                          setErrorKey(null)
                        }}
                        placeholder={dict.contact.name}
                        className="w-full rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3] focus:ring-1 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-email"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                      >
                        {dict.contact.email}
                      </label>
                      <input
                        id="cta-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        spellCheck={false}
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }))
                          setErrorKey(null)
                        }}
                        placeholder={dict.contact.email}
                        className="w-full rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3] focus:ring-1 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cta-message"
                        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-white/40"
                      >
                        {dict.contact.message}
                      </label>
                      <textarea
                        id="cta-message"
                        name="message"
                        required
                        rows={4}
                        dir="auto"
                        value={form.message}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, message: e.target.value }))
                          setErrorKey(null)
                        }}
                        placeholder={dict.contact.message}
                        className="w-full resize-none rounded-none border-b border-white/[0.1] bg-transparent py-3 text-[15px] text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/25 hover:border-white/[0.2] focus:border-white/[0.3] focus:ring-1 focus:ring-white/10 focus:shadow-[0_0_20px_rgba(255,255,255,0.04)]"
                      />
                    </div>

                    <div className="flex flex-col items-start gap-4 pt-2">
                      <motion.button
                        type="submit"
                        disabled={loading || cooldown > 0}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-white to-white/92 px-8 text-[13px] font-medium uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_3px_rgba(0,0,0,0.3)] transition-[transform,box-shadow,opacity] duration-300 ease-[var(--ease-out-expo)] hover:scale-[1.01] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_rgba(255,255,255,0.15)] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading && (
                          <svg
                            className="h-3.5 w-3.5 shrink-0"
                            viewBox="0 0 14 14"
                            fill="none"
                            aria-hidden="true"
                            style={{ animation: 'svc-rotate 0.8s linear infinite' }}
                          >
                            <circle
                              cx="7"
                              cy="7"
                              r="5.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeDasharray="20 14"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {cooldown > 0 ? `${dict.contact.submit} (${cooldown}s)` : dict.contact.submit}
                      </motion.button>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                        · {dict.cta.trustLine}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </WindowFrame>
        </SurfaceReveal>
      </div>
    </section>
  )
}
