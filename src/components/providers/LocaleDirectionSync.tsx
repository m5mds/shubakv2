'use client'

import { useEffect } from 'react'
import { useLocale } from '@/lib/i18n/context'

export function LocaleDirectionSync() {
  const { locale } = useLocale()

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', locale)
    document.body.setAttribute('dir', dir)
    document.body.style.direction = dir
  }, [locale])

  return null
}
