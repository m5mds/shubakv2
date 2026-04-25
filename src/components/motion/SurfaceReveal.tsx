'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { revealEase } from '@/lib/motion'

interface SurfaceRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function SurfaceReveal({ children, className, delay = 0 }: SurfaceRevealProps) {
  const reduce = useReducedMotion()

  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: revealEase }}
    >
      {children}
    </motion.div>
  )
}
