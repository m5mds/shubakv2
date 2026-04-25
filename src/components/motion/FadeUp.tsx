'use client'

import { SectionReveal } from '@/components/motion/SectionReveal'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <SectionReveal className={className} delay={delay}>
      {children}
    </SectionReveal>
  )
}
