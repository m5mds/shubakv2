'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { contentRevealTransition, revealViewport, sectionRevealStates } from '@/lib/motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={sectionRevealStates.hidden}
      whileInView={sectionRevealStates.visible}
      viewport={revealViewport}
      transition={{ ...contentRevealTransition, delay }}
    >
      {children}
    </motion.div>
  )
}
