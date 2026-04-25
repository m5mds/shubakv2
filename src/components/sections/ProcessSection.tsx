'use client'

import { useEffect, useRef } from 'react'
import { useLocale } from '@/lib/i18n/context'

export default function ProcessSection() {
  const { dict } = useLocale()
  const tlRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return

    const steps = Array.from(tl.querySelectorAll<HTMLElement>('.tl__step'))

    const update = () => {
      const r = tl.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const start = vh * 0.8
      const end = vh * 0.3
      const total = r.height + (start - end)
      const traveled = start - r.top
      let p = traveled / total
      p = Math.max(0, Math.min(1, p))
      tl.style.setProperty('--p', p.toFixed(3))

      steps.forEach((s) => {
        const sr = s.getBoundingClientRect()
        const dotY = sr.top + 38
        const activate = dotY < vh * 0.72
        s.classList.toggle('is-in', activate)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const steps = dict.process.steps

  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">{dict.process.sectionTag}</span>
          <h2 className="sec-head__title">
            <span>{dict.process.heading}</span>
            <span className="accent">{dict.process.headingAccent}</span>
          </h2>
        </div>

        <ol className="tl" ref={tlRef} aria-label="Process timeline">
          <span className="tl__spine" aria-hidden="true"></span>
          <span className="tl__spine-fill" aria-hidden="true"></span>
          <span className="tl__pulse" aria-hidden="true"></span>

          {steps.map((step, i) => (
            <li key={i} className="tl__step">
              <span className="tl__dot" aria-hidden="true">
                <span className="tl__dot-core"></span>
              </span>
              <span className="tl__conn" aria-hidden="true"></span>
              <div className="tl__card">
                <span className="tl__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="tl__name">{step.name}</h3>
                <p className="tl__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
