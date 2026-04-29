'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { services, localise } from '@/lib/services-data'
import { WindowIcon } from './window-icon'
import { SectionReveal } from '@/components/motion/SectionReveal'

function IconMail() {
  return (
    <svg className="site-footer__link-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5.5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg className="site-footer__link-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 6.5v5M5 4.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 11.5v-3c0-1 .6-1.5 1.5-1.5S11 7.5 11 8.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const ICON_MAP: Record<string, React.ReactNode> = {
  mail: <IconMail />,
  linkedin: <IconLinkedIn />,
}

export default function Footer() {
  const { dict, locale } = useLocale()
  const word = dict.footer.marquee

  return (
    <footer className="site-footer">
      <div aria-hidden="true" className="site-footer__glow" />

      {/* Marquee wordmark */}
      <div className="site-footer__marquee" aria-hidden="true">
        <div className="site-footer__marquee-track">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span key={i} className={i % 2 === 0 ? 'site-footer__marquee-word' : 'site-footer__marquee-dot'}>
              {i % 2 === 0 ? word : '·'}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap site-footer__wrap">
        <SectionReveal>
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <Link href="/" className="site-footer__brand-link">
                <WindowIcon />
                <span className="site-footer__brand-name">{dict.nav.brand}</span>
              </Link>
              <p className="site-footer__tagline">{dict.footer.tagline}</p>
              <div className="site-footer__loc">
                <p>{dict.footer.location}</p>
                <p>{dict.footer.global}</p>
              </div>
            </div>

            <div className="site-footer__col">
              <span className="label">{dict.footer.servicesCol}</span>
              <ul className="site-footer__list">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="site-footer__link">
                      {localise(service.title, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-footer__col">
              <span className="label">{dict.footer.companyCol}</span>
              <ul className="site-footer__list">
                <li><Link href="/#services" className="site-footer__link">{dict.nav.services}</Link></li>
                <li><Link href="/#process" className="site-footer__link">{dict.nav.about}</Link></li>
                <li><Link href="/#work" className="site-footer__link">{dict.projects.sectionTag}</Link></li>
                <li><Link href="/contact" className="site-footer__link">{dict.footer.contactLink}</Link></li>
              </ul>
            </div>

            <div className="site-footer__col">
              <span className="label">{dict.footer.connectCol}</span>
              <ul className="site-footer__list">
                {dict.footer.connectItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="site-footer__link"
                    >
                      {ICON_MAP[item.icon] ?? null}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>

        <div className="site-footer__base">
          <p className="site-footer__copy">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
