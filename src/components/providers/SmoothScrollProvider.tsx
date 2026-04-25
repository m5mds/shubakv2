'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId = 0
    const tick = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [pathname])

  return <>{children}</>
}
