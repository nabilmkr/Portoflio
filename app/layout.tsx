import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Barlow } from 'next/font/google'
import './globals.css'
import WebVitals from './web-vitals'
import SectionTracker from '@/components/section-tracker'
import CookieConsent from '@/components/cookie-consent'

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const barlow = Barlow({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nabil | Portfolio',
    template: '%s | Nabil Portfolio',
  },
  description: 'Portfolio website showcasing projects, skills, and experience in modern web development.',
  keywords: ['portfolio', 'developer', 'frontend', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Nabil' }],
  creator: 'Nabil',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Forced dark mode: bg-black text-white
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${instrumentSerif.variable} ${barlow.variable} font-body bg-black text-white antialiased`}>
        <WebVitals />
        <SectionTracker />
        <CookieConsent />
        {children}
      </body>
    </html>
  )
}
