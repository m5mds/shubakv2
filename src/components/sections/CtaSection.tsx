'use client'

import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import ContactWizard from './contact/ContactWizard'

export default function CtaSection() {
  const { dict } = useLocale()

  return (
    <section id="contact" className="section cta">
      <div className="wrap">
        <SectionReveal className="cta__inner">
          <div className="cta__head">
            <span className="label">{dict.cta.eyebrow}</span>
            <h2 className="cta__title">
              {dict.cta.headingMain}
              <span className="accent">{dict.cta.headingAccent}</span>
            </h2>
            <p className="cta__sub">{dict.cta.subtitle}</p>
            <div className="cta__meta">
              <a href="mailto:hello@shubak.ai">hello@shubak.ai</a>
              <span>{dict.footer.location}</span>
              <span>Sun–Thu · 9–18 AST</span>
            </div>
          </div>
          <ContactWizard />
        </SectionReveal>
      </div>
    </section>
  )
}
