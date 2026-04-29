'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

type CursorMode = 'default' | 'link' | 'open' | 'drag'

const RING: Record<CursorMode, { size: number; opacity: number; accent: boolean }> = {
  default: { size: 28, opacity: 0.15, accent: false },
  link:    { size: 36, opacity: 0.40, accent: false },
  open:    { size: 56, opacity: 1.00, accent: true  },
  drag:    { size: 72, opacity: 0.30, accent: false },
}

const DOT_SIZE: Record<CursorMode, number> = {
  default: 6,
  link:    4,
  open:    4,
  drag:    0,
}

export function CustomCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const dotX   = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const dotY   = useSpring(mouseY, { stiffness: 500, damping: 40 })
  const ringX  = useSpring(mouseX, { stiffness: 200, damping: 28 })
  const ringY  = useSpring(mouseY, { stiffness: 200, damping: 28 })

  const [mode, setMode] = useState<CursorMode>('default')
  const [mounted, setMounted] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    setMounted(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const tagged = target.closest('[data-cursor]') as HTMLElement | null
      if (tagged) {
        setMode((tagged.dataset.cursor as CursorMode) ?? 'default')
        return
      }
      if (target.closest('a, button, [role="button"]')) {
        setMode('link')
        return
      }
      setMode('default')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [mouseX, mouseY, reduce])

  if (!mounted || reduce) return null

  const ring = RING[mode]
  const dotSize = DOT_SIZE[mode]

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border md:block"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ring.size,
          height: ring.size,
          borderColor: ring.accent ? 'var(--accent)' : `rgba(255,255,255,${ring.opacity})`,
          opacity: 1,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {mode === 'open' && (
          <svg
            aria-hidden="true"
            className="absolute inset-0 m-auto"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <line x1="8" y1="2" x2="8" y2="6" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="8" y1="10" x2="8" y2="14" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="2" y1="8" x2="6" y2="8" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
            <line x1="10" y1="8" x2="14" y2="8" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )}
        {mode === 'drag' && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-widest text-white/50">
            drag
          </span>
        )}
      </motion.div>

      {/* Leading dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: ring.accent ? 'var(--accent)' : 'rgba(255,255,255,0.55)',
          opacity: mode === 'drag' ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
