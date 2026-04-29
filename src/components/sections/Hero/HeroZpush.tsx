'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { TextReveal } from '@/components/motion/TextReveal'

const STARS = [
  { x: '18%', y: '22%', d: '0s' },
  { x: '72%', y: '14%', d: '1.2s' },
  { x: '40%', y: '36%', d: '2.4s' },
  { x: '86%', y: '40%', d: '0.7s' },
  { x: '12%', y: '48%', d: '1.9s' },
]

const VERT_LINES = [
  { x1: -200, y1: 300, x2: 170, y2: 150 },
  { x1: -80,  y1: 300, x2: 185, y2: 150 },
  { x1: 40,   y1: 300, x2: 195, y2: 150 },
  { x1: 160,  y1: 300, x2: 200, y2: 150 },
  { x1: 240,  y1: 300, x2: 205, y2: 150 },
  { x1: 360,  y1: 300, x2: 215, y2: 150 },
  { x1: 480,  y1: 300, x2: 230, y2: 150 },
  { x1: 600,  y1: 300, x2: 250, y2: 150 },
]

function buildWavePath(rowIndex: number, totalRows: number): string {
  const W = 400
  const H = 150
  const segments = 40
  const i = rowIndex
  const t = (i + 1) / totalRows
  const y = Math.pow(t, 1.6) * H
  const amp = 4 + t * 22
  const freq = 2.2 + i * 0.3
  const phase = i * 0.7
  const pts: string[] = []
  for (let s = 0; s <= segments; s++) {
    const x = (s / segments) * W
    const wave =
      Math.sin((s / segments) * Math.PI * freq + phase) * amp * (0.4 + t * 0.7)
    pts.push(`${x.toFixed(1)},${(y + wave).toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

export function HeroZpush() {
  const { dict } = useLocale()
  const rowRefs = useRef<(SVGPathElement | null)[]>([])
  const heroRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    rowRefs.current.forEach((el, i) => {
      if (el) el.setAttribute('d', buildWavePath(i, 8))
    })
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const copyY  = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-8%'])
  const sceneY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.9, 0])

  return (
    <motion.section
      className="hero"
      ref={heroRef}
      style={reduce ? undefined : { opacity: heroOpacity }}
    >
      <div className="hero__grid"></div>
      <div className="hero__glow"></div>

      <div className="wrap hero__inner">
        {/* Left column: copy */}
        <motion.div className="hero__copy" style={{ y: copyY }}>
          <span className="label hero__label">{dict.hero.eyebrow}</span>
          <h1 className="hero__title">
            <TextReveal as="span" delay={0.1} stagger={0.07}>
              {dict.hero.headingLine1}
            </TextReveal>
            {' '}
            <TextReveal as="span" className="accent" delay={0.35} stagger={0.07}>
              {dict.hero.headingLine2}
            </TextReveal>
          </h1>
          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          >
            {dict.hero.description}
          </motion.p>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          >
            <Link className="btn btn--primary" href="#contact">
              <span>{dict.hero.ctaPrimary}</span>
              <svg
                className="btn__arrow"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 1L2 5l6 4M2 5h11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link className="btn btn--ghost" href="#work">
              {dict.hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right column: 3D scene */}
        <motion.div className="scene" id="scene" style={{ y: sceneY }}>
          <div className="scene__stack" id="scene-stack">
            <div className="scene__pane scene__pane--4"></div>
            <div className="scene__pane scene__pane--3"></div>
            <div className="scene__pane scene__pane--2"></div>
            <div className="scene__pane scene__pane--1">
              <div className="view">
                <div className="view__sky">
                  <span className="view__sun"></span>
                  {STARS.map((star, idx) => (
                    <span
                      key={idx}
                      className="view__star"
                      style={
                        {
                          '--x': star.x,
                          '--y': star.y,
                          '--d': star.d,
                        } as React.CSSProperties
                      }
                    ></span>
                  ))}
                </div>

                <svg
                  className="view__terrain"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="gridSide" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  <g
                    className="view__rows"
                    stroke="url(#gridFade)"
                    fill="none"
                    strokeWidth="1"
                  >
                    {Array.from({ length: 8 }, (_, i) => (
                      <path
                        key={i}
                        className={`view__row view__row--${i + 1}`}
                        d=""
                        ref={(el) => {
                          rowRefs.current[i] = el
                        }}
                      />
                    ))}
                  </g>

                  <g
                    className="view__verts"
                    stroke="url(#gridSide)"
                    fill="none"
                    strokeWidth="1"
                  >
                    {VERT_LINES.map((line, idx) => (
                      <line
                        key={idx}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                      />
                    ))}
                  </g>

                  <line
                    x1="0"
                    y1="150"
                    x2="400"
                    y2="150"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                </svg>

                <span className="view__pulse view__pulse--1"></span>
                <span className="view__pulse view__pulse--2"></span>
                <span className="view__pulse view__pulse--3"></span>

                <div className="view__hud" aria-hidden="true">
                  <span className="view__hud-dot"></span>
                  <span className="view__hud-text">24.7136° N · 46.6753° E</span>
                </div>
                <div className="view__hud view__hud--br" aria-hidden="true">
                  <span className="view__hud-text">LIVE</span>
                  <span className="view__hud-dot view__hud-dot--live"></span>
                </div>
              </div>
            </div>
          </div>

          <span className="scene__badge scene__badge--1">
            <span>{dict.hero.badge1}</span>
          </span>
          <span className="scene__badge scene__badge--2">
            <span>{dict.hero.badge2}</span>
          </span>
          <span className="scene__badge scene__badge--3">
            <span>{dict.hero.badge3}</span>
          </span>
        </motion.div>
      </div>
    </motion.section>
  )
}
