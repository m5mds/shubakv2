'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ar } from './ar'
import { en } from './en'

export type Locale = 'ar' | 'en'
export type Dict = typeof ar

interface Ctx {
  locale: Locale
  setLocale: (l: Locale) => void
  dict: Dict
}

const LocaleContext = createContext<Ctx | null>(null)
const STORAGE_KEY = 'shubak-locale'

function applyLocale(l: Locale) {
  document.documentElement.lang = l
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (saved === 'ar' || saved === 'en') {
      setLocaleState(saved)
      applyLocale(saved)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem(STORAGE_KEY, l)
    applyLocale(l)
    document.title =
      l === 'ar' ? 'شُبّاك — استوديو منتجات' : 'Shubak — Product Studio'
  }

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, dict: locale === 'ar' ? ar : en }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
