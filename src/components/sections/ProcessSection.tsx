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
    let rafId = 0

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

      let lastActive: HTMLElement | null = null
      steps.forEach((s) => {
        const sr = s.getBoundingClientRect()
        const dotY = sr.top + 44
        const activate = dotY < vh * 0.72
        s.classList.toggle('is-in', activate)
        if (activate) lastActive = s
      })

      if (lastActive) {
        // dot is at top:44px within step, height:17px — center at 44+8.5=52.5px
        // pulse is 8px tall — top = step.offsetTop + 52.5 - 4 ≈ step.offsetTop + 48
        const pulsePx = (lastActive as HTMLElement).offsetTop + 48
        tl.style.setProperty('--pulse-top', `${pulsePx}px`)
      }
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
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

        <div className="tl__overview" aria-hidden="true">
          {steps.map((step, i) => (
            <div key={i} className="tl__overview-item">
              <span className="tl__overview-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="tl__overview-name">{step.name}</span>
            </div>
          ))}
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
