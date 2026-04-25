'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6)
      mouseY.set(e.clientY - 6)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY, reduce])

  if (reduce) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 rounded-full bg-white/50 mix-blend-difference md:block"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    />
  )
}
