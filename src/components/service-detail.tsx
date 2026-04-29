'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { services, getServiceBySlug, localise } from '@/lib/services-data'

export default function ServiceDetail({ slug }: { slug: string }) {
  const { locale, dict } = useLocale()
  const service = getServiceBySlug(slug)
  if (!service) return null

  const idx = services.findIndex((s) => s.slug === slug)
  const prev = idx > 0 ? services[idx - 1] : null
  const next = idx < services.length - 1 ? services[idx + 1] : null

  return (
    <div className="service-page">
      <Link href="/" className="service-page__back">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
          <path d="M6 1L12 5l-6 4M12 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {dict.notFound.backHome}
      </Link>

      <div className="service-page__frame">
        {/* Chrome bar — identical to modal */}
        <div className="wdetail__chrome">
          <div className="wdetail__dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <div className="wdetail__addr">
            <span className="wdetail__addr-cross" aria-hidden="true"></span>
            <span>shubak.sa/services/{slug}</span>
          </div>
          <Link
            href="/"
            className="wdetail__close"
            aria-label={dict.notFound.backHome}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>

        {/* Content — matches modal grid exactly */}
        <div className="service-page__scroll wdetail__scroll">
          <div className="wdetail__hero">
            <span className="wdetail__num">{service.num}</span>
            <h1 className="wdetail__title">{localise(service.title, locale)}</h1>
            <p className="wdetail__tag">{localise(service.tag, locale)}</p>
          </div>

          <div className="wdetail__grid">
            <section className="wdetail__block wdetail__block--wide">
              <span className="wdetail__klabel">
                {locale === 'ar' ? 'نظرة عامّة' : 'Overview'}
              </span>
              <p className="wdetail__over">{localise(service.overview, locale)}</p>
            </section>

            <section className="wdetail__block">
              <span className="wdetail__klabel">
                {locale === 'ar' ? 'ما نُسلّمه' : 'What we deliver'}
              </span>
              <ul className="wdetail__list">
                {service.deliver[locale].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="wdetail__block">
              <span className="wdetail__klabel">
                {locale === 'ar' ? 'التقنيات' : 'Stack'}
              </span>
              <ul className="wdetail__chips">
                {service.stack.map((chip, i) => (
                  <li key={i}>{chip}</li>
                ))}
              </ul>
            </section>

            <section className="wdetail__block wdetail__block--wide">
              <span className="wdetail__klabel">
                {locale === 'ar' ? 'مثال حقيقي' : 'Sample'}
              </span>
              <p className="wdetail__sample">{localise(service.sample, locale)}</p>
            </section>
          </div>

          <div className="wdetail__cta">
            <Link href="/contact" className="btn btn--primary">
              <span>{locale === 'ar' ? 'نبني لك واحد زي كذا' : 'Build one like this'}</span>
              <span className="btn__arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Prev / next pagination */}
        <nav className="wdetail__pagination" aria-label={locale === 'ar' ? 'التنقل بين الخدمات' : 'Service navigation'}>
          {prev ? (
            <Link href={`/services/${prev.slug}`} className="wdetail__pagination-item">
              <span className="wdetail__pagination-dir">
                {locale === 'ar' ? 'السابق ←' : '← Previous'}
              </span>
              <span className="wdetail__pagination-title">{localise(prev.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/services/${next.slug}`} className="wdetail__pagination-item wdetail__pagination-item--next">
              <span className="wdetail__pagination-dir">
                {locale === 'ar' ? '→ التالي' : 'Next →'}
              </span>
              <span className="wdetail__pagination-title">{localise(next.title, locale)}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  )
}
