'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { WindowFrame } from '@/components/ui/WindowFrame'
import { useLocale } from '@/lib/i18n/context'
import { transitionMacro } from '@/lib/physics'
import { revealEase } from '@/lib/motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { locale, setLocale, dict } = useLocale()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )

      if (!focusableElements.length) {
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null

      if (event.shiftKey) {
        if (!activeElement || activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
        return
      }

      if (activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      restoreFocusRef.current?.focus()
    }
  }, [open, onClose])

  const links = [
    { href: '/#services', label: dict.nav.services },
    { href: '/#process', label: dict.nav.about },
    { href: '/contact', label: dict.footer.contactLink },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-[#0a0a0f]/70 px-4 py-6 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="mx-auto flex h-full max-w-xl items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={transitionMacro}
            onClick={(event) => event.stopPropagation()}
          >
            <WindowFrame variant="glass" className="relative w-full p-8 pb-10 pt-14">
              <h2 id="mobile-menu-title" className="sr-only">
                {dict.nav.openMenu}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={dict.nav.closeMenu}
                className="absolute top-4 text-white/60 transition-colors hover:text-white"
                style={{ insetInlineEnd: '1rem' }}
              >
                <span className="text-xl leading-none">x</span>
              </button>

              <div className="flex min-h-[70vh] flex-col justify-between">
                <div className="flex flex-col items-center gap-5 text-center">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, ease: revealEase, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-[clamp(28px,9vw,40px)] tracking-tight text-white transition-colors hover:text-white/70"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col items-center gap-5">
                  <button
                    type="button"
                    onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
                  >
                    {locale === 'ar' ? 'EN' : 'AR'}
                  </button>

                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.14] px-7 text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-white/[0.26] hover:bg-white hover:text-black"
                  >
                    {dict.nav.startProject}
                  </Link>
                </div>
              </div>
            </WindowFrame>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
