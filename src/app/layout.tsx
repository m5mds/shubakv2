import type { Metadata } from 'next'
import { Alexandria, DM_Sans, Instrument_Serif } from 'next/font/google'
import { LocaleProvider } from '@/lib/i18n/context'
import { ar } from '@/lib/i18n/ar'
import { en } from '@/lib/i18n/en'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import Footer from '@/components/layout/Footer'
import './globals.css'

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-readex',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${ar.site.brand} — ${ar.footer.tagline} | ${en.site.brand} — ${en.footer.tagline}`,
    template: `%s — ${ar.site.brand} ${en.site.brand}`,
  },
  description: `${ar.hero.description} | ${en.hero.description}`,
  metadataBase: new URL('https://shubak.ai'),
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    siteName: en.site.brand,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${en.site.brand} — ${en.footer.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${alexandria.variable} ${dmSans.variable} ${instrumentSerif.variable} lang-ar relative min-h-screen bg-[#0a0a0f] text-[#ededed] antialiased`}
    >
      <body suppressHydrationWarning className="relative">
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[202] -translate-y-16 rounded-full border border-white/15 bg-[#111118] px-4 py-2 text-xs uppercase tracking-[0.14em] text-white transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Skip to Content
        </a>
        <CustomCursor />
        <SmoothScrollProvider>
          <LocaleProvider>
            <Navbar />
            <main id="main-content" className="relative min-h-screen">{children}</main>
            <Footer />
          </LocaleProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
