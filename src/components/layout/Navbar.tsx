'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ShubakLogo } from '@/components/ui/ShubakLogo'
import { useLocale } from '@/lib/i18n/context'
import { MobileMenu } from '@/components/MobileMenu'
import { cn } from '@/lib/utils'

function NavSeparator() {
  return (
    <span
      aria-hidden="true"
      className="h-5 w-px shrink-0 bg-white/10"
    />
  )
}

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

export function Navbar() {
  const { locale, setLocale, dict } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header
        className="fixed top-6 left-1/2 z-[100] -translate-x-1/2"
        style={{ width: 'max-content', maxWidth: 'calc(100vw - 32px)' }}
      >
        <nav
          className="flex items-center gap-4 rounded-full border px-4 py-2 transition-[background-color,border-color,backdrop-filter] duration-300"
          style={{
            background: scrolled ? 'rgba(15, 17, 21, 0.85)' : 'transparent',
            borderColor: scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
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

          {/* Desktop nav links */}
          <NavSeparator />

          <Link
            href="/#services"
            className="relative hidden min-h-[44px] items-center text-[14px] font-medium text-white/70 transition-colors hover:text-white md:flex after:absolute after:bottom-0 after:start-0 after:block after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {dict.nav.services}
          </Link>

          <Link
            href="/#process"
            className="relative hidden min-h-[44px] items-center text-[14px] font-medium text-white/70 transition-colors hover:text-white md:flex after:absolute after:bottom-0 after:start-0 after:block after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {dict.nav.about}
          </Link>

          <Link
            href="/contact"
            className="relative hidden min-h-[44px] items-center text-[14px] font-medium text-white/70 transition-colors hover:text-white md:flex after:absolute after:bottom-0 after:start-0 after:block after:h-px after:w-full after:origin-start after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            {dict.nav.contact}
          </Link>

          <NavSeparator />

          {/* Language toggle */}
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
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {locale === 'ar' ? 'EN' : 'AR'}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Start a Project — desktop only */}
          <motion.div
            className="hidden md:block"
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.14] px-6 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:scale-[1.03] hover:border-white/25 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]"
            >
              {dict.nav.startProject}
            </Link>
          </motion.div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={menuOpen}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center text-white/70 transition-colors hover:text-white md:hidden"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
