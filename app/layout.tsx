import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import WebVitals from './web-vitals'
import SectionTracker from '@/components/section-tracker'
import CookieConsent from '@/components/cookie-consent'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap', // font-display: swap for better perceived performance
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false, // mono font is non-critical, don't preload
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
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    title: 'Nabil | Portfolio',
    description: 'Portfolio website showcasing projects, skills, and experience.',
    siteName: 'Nabil Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WebVitals />
          <SectionTracker />
          <CookieConsent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}