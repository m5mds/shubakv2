'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ShubakLogo } from '@/components/ui/ShubakLogo'
import { useLocale } from '@/lib/i18n/context'
import { MobileMenu } from '@/components/MobileMenu'
import { cn } from '@/lib/utils'

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex w-[18px] flex-col gap-[5px]" aria-hidden="true">
      <span className={cn(
        'block h-[1.5px] w-full origin-center bg-current transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)]',
        open && 'translate-y-[6.5px] rotate-45'
      )} />
      <span className={cn(
        'block h-[1.5px] w-full bg-current transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)]',
        open && 'opacity-0'
      )} />
      <span className={cn(
        'block h-[1.5px] w-full origin-center bg-current transition-[transform,opacity] duration-300 ease-[var(--ease-out-expo)]',
        open && '-translate-y-[6.5px] -rotate-45'
      )} />
    </div>
  )
}

const NAV_LINK_CLASS =
  'relative hidden min-h-[44px] items-center text-[14px] font-medium text-white/70 transition-colors hover:text-white md:flex after:absolute after:bottom-0 after:start-0 after:block after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100'

const EASE = [0.16, 1, 0.3, 1] as const

export function Navbar() {
  const { locale, setLocale, dict } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [viewportW, setViewportW] = useState(0)

  useEffect(() => {
    const updateVW = () => setViewportW(window.innerWidth)
    updateVW()
    window.addEventListener('resize', updateVW, { passive: true })
    return () => window.removeEventListener('resize', updateVW)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Compute the wide pixel width client-side to avoid CSS min() animation artifacts
  const wideW = viewportW > 0 ? Math.min(1280, viewportW - 32) : null

  return (
    <>
      <motion.header
        className="fixed top-6 left-1/2 z-[100] -translate-x-1/2"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
        initial={false}
        animate={wideW !== null ? { width: scrolled ? 'auto' : wideW } : undefined}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
      >
        <nav
          className="flex w-full items-center rounded-full border transition-[background-color,border-color,backdrop-filter,padding,gap] duration-500"
          style={{
            padding: scrolled ? '0.5rem 1rem' : '0.625rem 1.5rem',
            gap: scrolled ? '0.75rem' : '1.5rem',
            background: scrolled ? 'rgba(15, 17, 21, 0.85)' : 'transparent',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={dict.site.brand}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:text-white"
          >
            <ShubakLogo className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Center: flex-1 fills the header width; collapses to nothing when header is auto-width */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 md:flex">
            <Link href="/#services" className={NAV_LINK_CLASS}>
              {dict.nav.services}
            </Link>
            <Link href="/#process" className={NAV_LINK_CLASS}>
              {dict.nav.about}
            </Link>
            <Link href="/contact" className={NAV_LINK_CLASS}>
              {dict.nav.contact}
            </Link>
          </div>

          {/* Right: lang toggle + CTA + hamburger */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
              className="relative min-h-[44px] min-w-[44px] overflow-hidden text-[14px] font-medium text-[#a0a0a0] transition-colors hover:text-white"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={locale}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="block"
                >
                  {locale === 'ar' ? 'EN' : 'AR'}
                </motion.span>
              </AnimatePresence>
            </button>

            <motion.div
              className="hidden md:block"
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-9 py-3 text-[15px] font-semibold text-[#0a0a0f] transition-all duration-300 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_0_20px_rgba(233,139,42,0.4)]"
              >
                {dict.nav.startProject}
              </Link>
            </motion.div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
              aria-expanded={menuOpen}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white/70 transition-colors hover:text-white md:hidden"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
