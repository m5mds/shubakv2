'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { services, localise } from '@/lib/services-data'
import { WindowIcon } from './window-icon'
import { SectionReveal } from '@/components/motion/SectionReveal'

export default function Footer() {
  const { dict, locale } = useLocale()

  return (
    <footer className="site-footer">
      <div
        aria-hidden="true"
        className="site-footer__glow"
      />
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
                <li>
                  <Link href="/#services" className="site-footer__link">{dict.nav.services}</Link>
                </li>
                <li>
                  <Link href="/#process" className="site-footer__link">{dict.nav.about}</Link>
                </li>
                <li>
                  <Link href="/#work" className="site-footer__link">{dict.projects.sectionTag}</Link>
                </li>
                <li>
                  <Link href="/contact" className="site-footer__link">{dict.footer.contactLink}</Link>
                </li>
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
