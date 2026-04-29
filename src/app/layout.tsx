import type { Metadata } from 'next'
import { Alexandria } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/lib/i18n/context'
import { ar } from '@/lib/i18n/ar'
import { en } from '@/lib/i18n/en'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider'
import { SiteReveal } from '@/components/providers/SiteReveal'
import { Navbar } from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { LocaleDirectionSync } from '@/components/providers/LocaleDirectionSync'
import Footer from '@/components/layout/Footer'
import './globals.css'

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-readex',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'shubak — Product Studio · Saudi Arabia',
    template: '%s — shubak',
  },
  description: en.hero.description,
  metadataBase: new URL('https://shubak.ai'),
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    siteName: 'shubak',
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
      className={`${alexandria.variable} lang-ar relative min-h-screen bg-[#0a0a0f] text-[#ededed] antialiased`}
    >
      <body suppressHydrationWarning data-accent="amber" className="relative">
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[202] -translate-y-16 rounded-full border border-white/15 bg-[#111118] px-4 py-2 text-xs uppercase tracking-[0.14em] text-white transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          تخطّى للمحتوى / Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'shubak',
              alternateName: 'شُبّاك',
              url: 'https://shubak.ai',
              email: 'hello@shubak.ai',
              description: en.hero.description,
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tabuk',
                addressCountry: 'SA',
              },
              areaServed: 'Worldwide',
              serviceType: [
                'Web Platform Development',
                'Mobile Application Development',
                'Applied AI',
                'UX / UI Design',
                'Automation',
                'Technical Consulting',
              ],
              sameAs: ['https://linkedin.com/company/shubak'],
            }),
          }}
        />
        <CustomCursor />
        <SiteReveal />
        <SmoothScrollProvider>
          <LocaleProvider>
            <LocaleDirectionSync />
            <Navbar />
            <PageTransitionProvider>
              <main id="main-content" className="relative min-h-screen">{children}</main>
            </PageTransitionProvider>
            <Footer />
          </LocaleProvider>
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  )
}
