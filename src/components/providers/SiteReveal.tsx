'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ShubakLogo } from '@/components/ui/ShubakLogo'

const SESSION_KEY = 'shubak_revealed'

export function SiteReveal() {
  const [visible, setVisible] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // sessionStorage unavailable — always skip
      return
    }
    setVisible(true)
  }, [reduce])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A0A0F]"
          initial={{ y: '0%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          onAnimationComplete={(def) => {
            if ((def as { y: string }).y === '-100%' || def === 'exit') {
              setVisible(false)
            }
          }}
        >
          {/* Logo mark fades out just before curtain lifts */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <ShubakLogo className="h-8 w-8 text-white/60" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
