'use client'

import { useRef, useCallback } from 'react'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'

const SLUGS = ['01 / 04', '02 / 04', '03 / 04', '04 / 04']
const GLITCHED = 'shubak.sa/work/[redacted]'

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
          {items.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <PlaceholderCard
                item={item}
                index={i}
                num={SLUGS[i] ?? `0${i + 1} / 0${items.length}`}
                placeholder={dict.projects.placeholder}
                glitched={GLITCHED}
              />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

interface CardItem {
  category: string
  year: string
  title: string
  description: string
}

function PlaceholderCard({
  item,
  index,
  num,
  placeholder,
  glitched,
}: {
  item: CardItem
  index: number
  num: string
  placeholder: string
  glitched: string
}) {
  const addrRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef(0)

  const ADDR_DEFAULT = 'shubak.sa/work/coming-soon'
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'

  const startGlitch = useCallback(() => {
    if (!addrRef.current) return
    const target = glitched
    const len = target.length
    let frame = 0
    const totalFrames = 18

    const step = () => {
      if (!addrRef.current) return
      frame++
      const progress = frame / totalFrames
      const revealedChars = Math.floor(progress * len)
      let text = ''
      for (let c = 0; c < len; c++) {
        if (c < revealedChars) {
          text += target[c]
        } else {
          text += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      addrRef.current.textContent = text
      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)
  }, [glitched])

  const resetAddr = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (addrRef.current) addrRef.current.textContent = ADDR_DEFAULT
  }, [])

  return (
    <article
      className="work-card"
      aria-label={`${item.title} — ${placeholder}`}
      onMouseEnter={startGlitch}
      onMouseLeave={resetAddr}
    >
      {/* Window chrome */}
      <div className="work-card__media" style={{ flexDirection: 'column', padding: 0 }}>
        <div className="work-card__chrome">
          <span className="work-card__chrome-dot" />
          <span className="work-card__chrome-dot" />
          <span className="work-card__chrome-dot" />
          <span ref={addrRef} className="work-card__chrome-addr">{ADDR_DEFAULT}</span>
        </div>

        {/* Placeholder body */}
        <div className="work-card__placeholder">
          <span className="work-card__placeholder-label">{placeholder}</span>
          <span className="work-card__placeholder-num" aria-hidden="true">{num}</span>
          <span className="work-card__placeholder-horizon" aria-hidden="true" />
          <span className="work-card__placeholder-pulse" aria-hidden="true" />
        </div>
      </div>

      {/* Info */}
      <div className="work-card__info">
        <div className="work-card__meta">
          <span className="work-card__cat">{item.category}</span>
          <span className="work-card__year">{item.year}</span>
        </div>
        <h3 className="work-card__title">{item.title}</h3>
        <p className="work-card__desc">{item.description}</p>
      </div>
    </article>
  )
}
