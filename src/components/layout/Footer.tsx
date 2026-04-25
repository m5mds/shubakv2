'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { services, localise } from '@/lib/services-data'
import { WindowIcon } from './window-icon'
import { SectionReveal } from '@/components/motion/SectionReveal'

export default function Footer() {
  const { dict, locale } = useLocale()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#0a0a0f]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
        style={{
          background: 'radial-gradient(ellipse 54% 38% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 72%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-24 lg:px-12 lg:pt-32">
        <SectionReveal>
        <div className="mb-20 grid grid-cols-1 gap-12 text-white/50 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-3 text-white transition-colors hover:text-white/80">
              <WindowIcon />
              <span className="text-[14px] font-medium uppercase tracking-[0.2em]">{dict.nav.brand}</span>
            </Link>
            <p className="mb-6 max-w-xs text-[12px] leading-relaxed text-white/40">{dict.footer.tagline}</p>
            <div className="space-y-1 text-[11px] uppercase tracking-widest text-white/30">
              <p>{dict.footer.location}</p>
              <p>{dict.footer.global}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-6 border-b border-white/5 pb-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {dict.footer.servicesCol}
            </h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="relative text-[12px] text-white/40 transition-colors hover:text-white after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/30 after:transition-transform after:duration-300 hover:after:scale-x-100">
                    {localise(service.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 border-b border-white/5 pb-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {dict.footer.companyCol}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/#about" className="relative text-[12px] text-white/40 transition-colors hover:text-white after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/30 after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {dict.footer.aboutLink}
                </Link>
              </li>
              <li>
                <Link href="/#process" className="relative text-[12px] text-white/40 transition-colors hover:text-white after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/30 after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {dict.process.sectionTag}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="relative text-[12px] text-white/40 transition-colors hover:text-white after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/30 after:transition-transform after:duration-300 hover:after:scale-x-100">
                  {dict.footer.contactLink}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 border-b border-white/5 pb-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
              {dict.footer.connectCol}
            </h4>
            <ul className="space-y-4">
              {dict.footer.connectItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="relative text-[12px] text-white/40 transition-colors hover:text-white after:absolute after:bottom-0 after:start-0 after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/30 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </SectionReveal>

        <div className="border-t border-white/[0.04] pt-8">
          <p className="text-[10px] uppercase tracking-widest text-white/45">{dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
