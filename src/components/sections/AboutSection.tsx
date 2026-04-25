'use client'

import { motion } from 'framer-motion'
import { useLocale } from '@/lib/i18n/context'
import { SectionReveal } from '@/components/motion/SectionReveal'
import { SurfaceReveal } from '@/components/motion/SurfaceReveal'
import { revealEase } from '@/lib/motion'

export default function AboutSection() {
  const { dict } = useLocale()
  const points = dict.about.points.slice(0, 4)

  return (
    <section
      id="about"
      className="homepage-section homepage-section--about relative overflow-hidden bg-[#0a0a0f]"
      style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 lg:px-12">
        <SectionReveal>
          <span className="mb-4 block font-mono text-sm uppercase tracking-[0.25em] text-white/50">
            {dict.about.sectionTag}
          </span>
          <h2 className="mb-12 text-[clamp(34px,4.6vw,56px)] font-medium tracking-tight text-white">
            {dict.about.sectionHeading}
          </h2>
        </SectionReveal>

        {/*
          2×2 window grid — mirrors the Shubak logo (rounded rect divided by two perpendicular
          hairlines into 4 equal panes). The container border is the outer stroke; the 2px gap
          background is the dividing lines. overflow-hidden clips pane content to the corners.
        */}
        <SurfaceReveal delay={0.1}>
          <div
            className="spotlight-grid grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-[12px]"
            style={{
              gap: '2px',
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.08)',
            }}
          >
            {points.map((point, i) => (
              <div
                key={i}
                className="spotlight-pane"
                style={{
                  background: '#0c0c12',
                  padding: 'clamp(28px, 3.5vw, 44px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: revealEase }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <p
                    aria-hidden="true"
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: '20px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#ededed', marginBottom: '12px', lineHeight: 1.35 }}>
                    {point.title}
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(237, 237, 237, 0.60)' }}>
                    {point.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </SurfaceReveal>
      </div>
    </section>
  )
}
