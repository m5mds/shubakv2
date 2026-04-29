'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { services, localise } from '@/lib/services-data'

export default function ServicesSection() {
  const { dict, locale } = useLocale()
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [openingSlug, setOpeningSlug] = useState<string | null>(null)
  const tileRectRef = useRef<DOMRect | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const openService = useCallback((slug: string, rect: DOMRect) => {
    tileRectRef.current = rect
    setOpeningSlug(slug)
    setOpenSlug(slug)
  }, [])

  const openIndex = openSlug ? services.findIndex((s) => s.slug === openSlug) : -1
  const openService_ = openSlug ? services.find((s) => s.slug === openSlug) ?? null : null

  const closeModal = useCallback(() => {
    setOpenSlug(null)
  }, [])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (openIndex === -1) return
      const next = (openIndex + dir + services.length) % services.length
      setOpenSlug(services[next].slug)
    },
    [openIndex]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (openSlug === null) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') navigate(locale === 'ar' ? 1 : -1)
      if (e.key === 'ArrowRight') navigate(locale === 'ar' ? -1 : 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openSlug, closeModal, navigate, locale])

  useEffect(() => {
    document.body.classList.toggle('wdetail-open', openSlug !== null)
    return () => document.body.classList.remove('wdetail-open')
  }, [openSlug])

  const tickerItems = dict.ticker.items.concat(dict.ticker.items)

  function handleTileMouseMove(e: React.MouseEvent<HTMLElement>) {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%')
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%')
  }

  function handleClose(e: React.MouseEvent) {
    const target = e.target as HTMLElement
    if (target.closest('[data-wclose]')) closeModal()
  }

  const isOpen = openSlug !== null

  // Compute centered modal target in viewport
  const modalW = typeof window !== 'undefined' ? Math.min(980, window.innerWidth * 0.92) : 980
  const modalH = typeof window !== 'undefined' ? Math.min(720, window.innerHeight * 0.88) : 720
  const targetX = typeof window !== 'undefined' ? (window.innerWidth - modalW) / 2 : 0
  const targetY = typeof window !== 'undefined' ? (window.innerHeight - modalH) / 2 : 0

  const tileRect = tileRectRef.current

  return (
    <>
      {/* Ticker band */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {tickerItems.map((item, i) => (
            <span key={i} className="ticker__item">◆ {item}</span>
          ))}
        </div>
      </div>

      {/* Services section */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="sec-head">
            <span className="label">{dict.services.sectionTag}</span>
            <h2 className="sec-head__title">
              <span>{dict.services.heading}</span>
              <span className="accent">{dict.services.headingAccent}</span>
            </h2>
          </div>

          <div className="wgrid" id="wgrid" role="list">
            {services.map((svc) => (
              <article
                key={svc.slug}
                data-cursor="open"
                className={`wtile${openingSlug === svc.slug ? ' is-opening' : ''}`}
                role="listitem"
                data-svc={svc.slug}
                tabIndex={0}
                aria-label={localise(svc.title, locale)}
                onClick={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  openService(svc.slug, rect)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                    openService(svc.slug, rect)
                  }
                }}
                onMouseMove={handleTileMouseMove}
              >
                <div className="wtile__glass" aria-hidden="true">
                  <span className="wtile__cross"></span>
                </div>
                <div className="wtile__body">
                  <div className="wtile__top">
                    <span className="wtile__num">{svc.num}</span>
                    <span className="wtile__glyph" aria-hidden="true">
                      {svc.slug === 'web' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <rect x="4" y="6" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M4 10h20M8 15h6M8 18h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      )}
                      {svc.slug === 'mobile' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <rect x="9" y="3" width="10" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M13 22h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      )}
                      {svc.slug === 'ai' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M14 4v4M14 20v4M4 14h4M20 14h4M7 7l2.8 2.8M18.2 18.2L21 21M7 21l2.8-2.8M18.2 9.8L21 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      )}
                      {svc.slug === 'ux' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <path d="M6 23L22 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          <path d="M17 5h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="6" cy="23" r="1.6" stroke="currentColor" strokeWidth="1.4"/>
                        </svg>
                      )}
                      {svc.slug === 'auto' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <path d="M5 14h6l3-6 4 12 3-6h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {svc.slug === 'consult' && (
                        <svg viewBox="0 0 28 28" fill="none">
                          <path d="M5 14h4l2-7 2 14 2-7h4M21 14h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  </div>
                  <h3 className="wtile__title">{localise(svc.title, locale)}</h3>
                  <p className="wtile__desc">{localise(svc.description, locale)}</p>
                  <span className="wtile__peek">
                    {locale === 'ar' ? 'افتح الشبّاك' : 'Open window'}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M8 1L2 5l6 4M2 5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Window Detail overlay */}
        <div
          className={`wdetail${isOpen ? ' is-open' : ''}`}
          id="wdetail"
          aria-hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wdetail-title"
          onClick={handleClose}
        >
          <div className="wdetail__backdrop" data-wclose></div>

          <AnimatePresence onExitComplete={() => setOpeningSlug(null)}>
            {isOpen && (
              <motion.div
                key="frame"
                className="wdetail__frame"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: modalW,
                  height: modalH,
                  // override CSS centering; framer drives x/y
                  transform: 'none',
                }}
                initial={prefersReducedMotion ? { opacity: 0 } : {
                  x: tileRect?.left ?? targetX,
                  y: tileRect?.top ?? targetY,
                  width: tileRect?.width ?? modalW,
                  height: tileRect?.height ?? modalH,
                  opacity: 0,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  width: modalW,
                  height: modalH,
                  opacity: 1,
                }}
                exit={prefersReducedMotion ? { opacity: 0 } : {
                  x: tileRect?.left ?? targetX,
                  y: tileRect?.top ?? targetY,
                  width: tileRect?.width ?? modalW,
                  height: tileRect?.height ?? modalH,
                  opacity: 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Chrome — fades in after frame lands */}
                <motion.div
                  className="wdetail__chrome"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.38, duration: 0.2 }}
                >
                  <div className="wdetail__dots" aria-hidden="true">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="wdetail__addr">
                    <span className="wdetail__addr-cross" aria-hidden="true"></span>
                    <span id="wdetail-addr">
                      shubak.sa/services/{openService_?.slug ?? ''}
                    </span>
                  </div>
                  <button
                    className="wdetail__close"
                    type="button"
                    data-wclose
                    aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
                    onClick={closeModal}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </button>
                </motion.div>

                {/* Scrollable content — fades in after chrome */}
                <motion.div
                  className="wdetail__scroll"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.44, duration: 0.22 }}
                >
                  {openService_ && (
                    <>
                      <div className="wdetail__hero">
                        <span className="wdetail__num" id="wdetail-num">{openService_.num}</span>
                        <h3 className="wdetail__title" id="wdetail-title">
                          {localise(openService_.title, locale)}
                        </h3>
                        <p className="wdetail__tag" id="wdetail-tag">
                          {localise(openService_.tag, locale)}
                        </p>
                      </div>

                      <div className="wdetail__grid">
                        <section className="wdetail__block wdetail__block--wide">
                          <span className="wdetail__klabel">
                            {locale === 'ar' ? 'نظرة عامّة' : 'Overview'}
                          </span>
                          <p className="wdetail__over" id="wdetail-over">
                            {localise(openService_.overview, locale)}
                          </p>
                        </section>

                        <section className="wdetail__block">
                          <span className="wdetail__klabel">
                            {locale === 'ar' ? 'ما نُسلّمه' : 'What we deliver'}
                          </span>
                          <ul className="wdetail__list" id="wdetail-deliver">
                            {openService_.deliver[locale].map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </section>

                        <section className="wdetail__block">
                          <span className="wdetail__klabel">
                            {locale === 'ar' ? 'التقنيات' : 'Stack'}
                          </span>
                          <ul className="wdetail__chips" id="wdetail-stack">
                            {openService_.stack.map((chip, i) => (
                              <li key={i}>{chip}</li>
                            ))}
                          </ul>
                        </section>

                        <section className="wdetail__block wdetail__block--wide">
                          <span className="wdetail__klabel">
                            {locale === 'ar' ? 'مثال حقيقي' : 'Sample'}
                          </span>
                          <p className="wdetail__sample" id="wdetail-sample">
                            {localise(openService_.sample, locale)}
                          </p>
                        </section>
                      </div>

                      <div className="wdetail__cta">
                        <a href="#contact" className="btn btn--primary" data-wclose onClick={closeModal}>
                          <span>{locale === 'ar' ? 'نبني لك واحد زي كذا' : 'Build one like this'}</span>
                          <span className="btn__arr" aria-hidden="true">→</span>
                        </a>
                        <span className="wdetail__hint">
                          {locale === 'ar' ? 'ESC للإغلاق • ← → للتنقّل' : 'ESC to close • ← → to navigate'}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
