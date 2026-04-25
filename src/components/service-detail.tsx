'use client'

import Link from 'next/link'
import { useLocale } from '@/lib/i18n/context'
import { getServiceBySlug, localise } from '@/lib/services-data'
import { WindowFrame } from '@/components/ui/WindowFrame'

export default function ServiceDetail({ slug }: { slug: string }) {
  const { locale, dict } = useLocale()
  const service = getServiceBySlug(slug)
  if (!service) return null

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-32">
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white"
      >
        ← {dict.notFound.backHome}
      </Link>

      <WindowFrame className="mt-8 p-10 md:p-14">
        <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/50">
          {service.num}
        </span>
        <h1 className="mt-3 text-[clamp(30px,4vw,52px)] font-semibold tracking-tight text-white">
          {localise(service.title, locale)}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">
          {localise(service.tag, locale)}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <section>
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {locale === 'ar' ? 'نظرة عامّة' : 'Overview'}
            </h2>
            <p className="text-[15px] leading-relaxed text-white/70">
              {localise(service.overview, locale)}
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {locale === 'ar' ? 'ما نُسلّمه' : 'What we deliver'}
            </h2>
            <ul className="space-y-2 text-[14px] text-white/80">
              {service.deliver[locale].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 bg-[#E98B2A]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {locale === 'ar' ? 'التقنيات' : 'Stack'}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className="border border-white/10 px-3 py-1 text-[12px] text-white/70"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {locale === 'ar' ? 'مثال حقيقي' : 'Sample'}
            </h2>
            <p className="border border-white/10 bg-white/[0.015] p-5 text-[15px] italic leading-relaxed text-white/70">
              {localise(service.sample, locale)}
            </p>
          </section>
        </div>
      </WindowFrame>
    </main>
  )
}
