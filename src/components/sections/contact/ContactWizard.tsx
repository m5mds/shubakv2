'use client'

import { useState, useRef, useCallback } from 'react'
import type { ReactElement } from 'react'
import { useLocale } from '@/lib/i18n/context'

type Step = 1 | 2 | 3 | 4 | 5

interface WizardState {
  reason: string
  products: string[]
  budget: string
  name: string
  email: string
  company: string
  phone: string
  brief: string
}

const EMPTY: WizardState = {
  reason: '', products: [], budget: '',
  name: '', email: '', company: '', phone: '', brief: '',
}

const REASON_KEYS = ['idea', 'consult', 'revamp', 'other'] as const
const PRODUCT_KEYS = ['web', 'mobile', 'ai', 'design', 'automation', 'consult'] as const
const BUDGET_KEYS = ['lt10', 'b1020', 'b2050', 'b50200', 'gt200', 'unsure'] as const
const BUDGET_VALUES = ['lt10', '10-20', '20-50', '50-200', 'gt200', 'unsure']
const STEP_KEYS = ['reason', 'product', 'budget', 'contact'] as const

/* SVG glyphs matching the original design */
const ReasonIcons: Record<typeof REASON_KEYS[number], ReactElement> = {
  idea: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  consult: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 8h20M6 16h14M6 24h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="26" cy="24" r="3" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  revamp: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="9" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5 14h22" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M21 19l3 3M24 19l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  other: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="10" cy="16" r="1.6" fill="currentColor"/>
      <circle cx="16" cy="16" r="1.6" fill="currentColor"/>
      <circle cx="22" cy="16" r="1.6" fill="currentColor"/>
    </svg>
  ),
}

const ProductIcons: Record<typeof PRODUCT_KEYS[number], ReactElement> = {
  web: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M3 9h22" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="6.5" cy="7" r="0.8" fill="currentColor"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="8" y="3" width="12" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M13 22h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 7v14M7 14h14" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  design: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 22L22 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M18 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M6 14h6l2-4 4 8 2-4h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  consult: (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4v4M14 24v-4M4 14h4M24 14h-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="10" y="10" width="8" height="8" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
}

const ArrowIcon = () => (
  <svg className="btn__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
    <path d="M8 1L2 5l6 4M2 5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SpinnerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
    style={{ animation: 'svc-rotate 0.8s linear infinite', flexShrink: 0 }}>
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"
      strokeDasharray="20 14" strokeLinecap="round"/>
  </svg>
)

export default function ContactWizard() {
  const { dict, locale } = useLocale()
  const wz = dict.contact.wizard

  const [step, setStep] = useState<Step>(1)
  const [prevStep, setPrevStep] = useState<Step | null>(null)
  const [dir, setDir] = useState(1)
  const [state, setState] = useState<WizardState>(EMPTY)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const prevTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback((next: Step, currentStep: Step) => {
    setDir(next > currentStep ? 1 : -1)
    setPrevStep(currentStep)
    setStep(next)
    setError('')
    if (prevTimerRef.current) clearTimeout(prevTimerRef.current)
    prevTimerRef.current = setTimeout(() => setPrevStep(null), 600)
  }, [])

  function validate(atStep: Step): boolean {
    if (atStep === 2 && state.products.length === 0) {
      setError(wz.errorRequired)
      return false
    }
    if (atStep === 4) {
      if (!state.name.trim() || !state.email.trim() || !state.phone.trim() || !state.brief.trim()) {
        setError(wz.errorRequired)
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
        setError(wz.errorEmail)
        return false
      }
    }
    return true
  }

  function next() {
    if (!validate(step)) return
    if (step < 4) goTo((step + 1) as Step, step)
  }

  function back() {
    if (step > 1 && step < 5) goTo((step - 1) as Step, step)
  }

  function onReasonSelect(val: string) {
    setState(s => ({ ...s, reason: val }))
    setTimeout(() => goTo(2, 1), 220)
  }

  function onBudgetSelect(val: string) {
    setState(s => ({ ...s, budget: val }))
    setTimeout(() => goTo(4, 3), 220)
  }

  function toggleProduct(val: string) {
    setState(s => ({
      ...s,
      products: s.products.includes(val)
        ? s.products.filter(p => p !== val)
        : [...s.products, val],
    }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step !== 4) return
    if (!validate(4)) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: state.reason,
          products: state.products,
          budget: state.budget,
          name: state.name.trim(),
          email: state.email.trim(),
          company: state.company.trim(),
          phone: state.phone.trim(),
          brief: state.brief.trim(),
          _hp: honeypot,
        }),
      })
      if (!res.ok) {
        setError(wz.errorServer)
        return
      }
      goTo(5, 4)
    } catch {
      setError(wz.errorServer)
    } finally {
      setLoading(false)
    }
  }

  function restart() {
    setState(EMPTY)
    setError('')
    goTo(1, 5)
  }

  const barWidth = step === 5 ? 100 : (step / 4) * 100

  // Display counter numbers — Arabic-Indic in AR locale
  const AR_NUMS = ['', '١', '٢', '٣', '٤']
  const displayStep = locale === 'ar' && step <= 4 ? AR_NUMS[step] : String(step)

  function paneClass(s: number) {
    if (step === s) return 'wz__pane is-current'
    if (prevStep === s) return 'wz__pane is-out'
    return 'wz__pane'
  }

  const stageStyle = { '--wz-dir': dir } as React.CSSProperties

  return (
    <form className="wz" noValidate onSubmit={handleSubmit}>
      {/* honeypot */}
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off"
        value={honeypot} onChange={e => setHoneypot(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
        aria-hidden="true" />

      {/* Progress header */}
      <header className="wz__head">
        <div className="wz__steps" aria-hidden="true">
          {STEP_KEYS.map((key, i) => {
            const s = i + 1
            return (
              <span key={key}
                className={`wz__pill${step === s ? ' is-active' : step > s ? ' is-done' : ''}`}>
                <span className="wz__pill-num">0{s}</span>
                <span className="wz__pill-label">{wz.steps[key]}</span>
              </span>
            )
          })}
        </div>
        <div className="wz__bar" aria-hidden="true">
          <span className="wz__bar-fill" style={{ '--w': `${barWidth}%` } as React.CSSProperties} />
        </div>
      </header>

      {/* Panes */}
      <div className="wz__stage" style={stageStyle}>

        {/* Step 1: Reason */}
        <section className={paneClass(1)} data-step="1" aria-labelledby="wz-1-h" aria-hidden={step !== 1}>
          <div className="wz__pane-head">
            <span className="wz__kicker">{wz.step1.kicker}</span>
            <h3 className="wz__q" id="wz-1-h">{wz.step1.q}</h3>
            <p className="wz__hint">{wz.step1.hint}</p>
          </div>
          <div className="wz__tiles" role="radiogroup" aria-label={wz.steps.reason}>
            {REASON_KEYS.map(key => (
              <label key={key} className="tile">
                <input type="radio" name="reason" value={key}
                  checked={state.reason === key}
                  onChange={() => onReasonSelect(key)} />
                <span className="tile__glyph">{ReasonIcons[key]}</span>
                <span className="tile__title">{wz.reasons[key].title}</span>
                <span className="tile__desc">{wz.reasons[key].desc}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Step 2: Product */}
        <section className={paneClass(2)} data-step="2" aria-labelledby="wz-2-h" aria-hidden={step !== 2}>
          <div className="wz__pane-head">
            <span className="wz__kicker">{wz.step2.kicker}</span>
            <h3 className="wz__q" id="wz-2-h">{wz.step2.q}</h3>
            <p className="wz__hint">{wz.step2.hint}</p>
          </div>
          <div className="wz__grid" role="group" aria-label={wz.steps.product}>
            {PRODUCT_KEYS.map(key => (
              <label key={key} className="tile tile--sm">
                <input type="checkbox" name="product" value={key}
                  checked={state.products.includes(key)}
                  onChange={() => toggleProduct(key)} />
                <span className="tile__glyph">{ProductIcons[key]}</span>
                <span className="tile__title">{wz.products[key]}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Step 3: Budget */}
        <section className={paneClass(3)} data-step="3" aria-labelledby="wz-3-h" aria-hidden={step !== 3}>
          <div className="wz__pane-head">
            <span className="wz__kicker">{wz.step3.kicker}</span>
            <h3 className="wz__q" id="wz-3-h">{wz.step3.q}</h3>
            <p className="wz__hint">{wz.step3.hint}</p>
          </div>
          <div className="wz__budget" role="radiogroup" aria-label={wz.steps.budget}>
            {BUDGET_KEYS.map((key, i) => (
              <label key={key} className={`bband${key === 'unsure' ? ' bband--ghost' : ''}`}>
                <input type="radio" name="budget" value={BUDGET_VALUES[i]}
                  checked={state.budget === BUDGET_VALUES[i]}
                  onChange={() => onBudgetSelect(BUDGET_VALUES[i])} />
                {key !== 'unsure' && <span className="bband__bar" />}
                <span className="bband__range">{wz.budgets[key]}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Step 4: Contact fields */}
        <section className={paneClass(4)} data-step="4" aria-labelledby="wz-4-h" aria-hidden={step !== 4}>
          <div className="wz__pane-head">
            <span className="wz__kicker">{wz.step4.kicker}</span>
            <h3 className="wz__q" id="wz-4-h">{wz.step4.q}</h3>
            <p className="wz__hint">{wz.step4.hint}</p>
          </div>
          <div className="wz__fields">
            <label className="field">
              <span className="field__label">{wz.fields.name}</span>
              <input type="text" name="name" required autoComplete="name" dir="auto"
                placeholder="—"
                value={state.name}
                onChange={e => { setState(s => ({ ...s, name: e.target.value })); setError('') }} />
            </label>
            <label className="field">
              <span className="field__label">{wz.fields.email}</span>
              <input type="email" name="email" required autoComplete="email"
                placeholder="you@company.com" dir="ltr" spellCheck={false}
                value={state.email}
                onChange={e => { setState(s => ({ ...s, email: e.target.value })); setError('') }} />
            </label>
            <label className="field">
              <span className="field__label">{wz.fields.company}</span>
              <input type="text" name="company" autoComplete="organization" dir="auto"
                placeholder="—"
                value={state.company}
                onChange={e => setState(s => ({ ...s, company: e.target.value }))} />
            </label>
            <label className="field">
              <span className="field__label">{wz.fields.phone}</span>
              <input type="tel" name="phone" required autoComplete="tel" dir="ltr"
                placeholder="+966"
                value={state.phone}
                onChange={e => { setState(s => ({ ...s, phone: e.target.value })); setError('') }} />
            </label>
            <label className="field field--full">
              <span className="field__label">{wz.fields.brief}</span>
              <textarea name="brief" rows={4} required dir="auto"
                placeholder="—"
                value={state.brief}
                onChange={e => { setState(s => ({ ...s, brief: e.target.value })); setError('') }} />
            </label>
          </div>
        </section>

        {/* Step 5: Done */}
        <section className={`${paneClass(5)} wz__done`} data-step="5" aria-labelledby="wz-5-h" aria-hidden={step !== 5}>
          <div className="wz__done-glyph" aria-hidden="true">
            <svg viewBox="0 0 56 56" fill="none" width="56" height="56">
              <rect x="4" y="4" width="48" height="48" rx="3" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M28 4v48M4 28h48" stroke="currentColor" strokeWidth="1.6"/>
              <circle className="wz__done-ping" cx="28" cy="28" r="10" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </div>
          <h3 className="wz__q wz__q--center" id="wz-5-h">{wz.doneTitle}</h3>
          <p className="wz__hint wz__hint--center">{wz.doneHint}</p>
          <button type="button" className="btn btn--ghost wz__restart" onClick={restart}>
            {wz.restart}
          </button>
        </section>
      </div>

      {/* Footer nav */}
      {step < 5 && (
        <footer className="wz__foot">
          <button type="button" className="btn btn--ghost wz__back"
            onClick={back} disabled={step === 1}>
            {wz.back}
          </button>
          <span className="wz__counter">
            <span className="wz__counter-now">{displayStep}</span>
            {' / '}
            {wz.counterTotal}
          </span>
          {step < 4 ? (
            <button type="button" className="btn btn--primary wz__next" onClick={next}>
              {wz.next}
              <ArrowIcon />
            </button>
          ) : (
            <button type="submit" className="btn btn--primary wz__submit" disabled={loading}>
              {loading && <SpinnerIcon />}
              {wz.submit}
              <ArrowIcon />
            </button>
          )}
        </footer>
      )}

      {error && <p className="wz__err" role="alert" aria-live="polite">{error}</p>}
    </form>
  )
}
