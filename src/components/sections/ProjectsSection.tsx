'use client'

import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'

// Per-card mock layout: first two cards have side-then-main, second two have main-then-side
const MOCK_LAYOUTS: Array<'side-main' | 'main-side'> = [
  'side-main',
  'main-side',
  'side-main',
  'main-side',
]

export default function ProjectsSection() {
  const { dict } = useLocale()
  const items = dict.projects.items

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head">
          <span className="label">{dict.projects.sectionTag}</span>
          <h2 className="sec-head__title">
            <span>{dict.projects.heading}</span>
            <span className="accent">{dict.projects.headingAccent}</span>
          </h2>
        </div>

        <div className="work__grid">
          {items.map((item, i) => {
            const layout = MOCK_LAYOUTS[i] ?? 'side-main'
            return (
              <SectionReveal key={i} delay={i * 0.06}>
                <div className="work-card">
                  <div className="work-card__media">
                    <div className="work-card__mock">
                      <div className="work-card__mock-bar">
                        <span></span><span></span><span></span>
                      </div>
                      <div className="work-card__mock-body">
                        {layout === 'side-main' ? (
                          <>
                            <div className="work-card__mock-side">
                              <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="work-card__mock-main">
                              <div></div><div></div><div></div><div></div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="work-card__mock-main">
                              <div></div><div></div><div></div><div></div>
                            </div>
                            <div className="work-card__mock-side">
                              <div></div><div></div><div></div><div></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="work-card__info">
                    <div className="work-card__meta">
                      <span className="work-card__cat">{item.category}</span>
                      <span className="work-card__year">{item.year}</span>
                    </div>
                    <h3 className="work-card__title">{item.title}</h3>
                    <p className="work-card__desc">{item.description}</p>
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
