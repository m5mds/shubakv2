'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
  stagger?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = 'span',
  stagger = 0.06,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()

  const words = children.split(' ').filter(Boolean)

  if (reduce) {
    return (
      <Tag ref={ref as React.Ref<never>} className={className}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as React.Ref<never>} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginInlineEnd: i < words.length - 1 ? '0.28em' : undefined,
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
