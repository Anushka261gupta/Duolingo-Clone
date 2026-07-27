import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'

import { siteConfig } from '@/config/site'
import { AuthProvider } from '@/providers/auth-provider'
import { HeartsProvider } from '@/providers/hearts-provider'
import { XPProvider } from '@/providers/xp-provider'
import { GemsProvider } from '@/providers/gems-provider'
import { StreakProvider } from '@/providers/streak-provider'
import { FloatingXPOverlay, AchievementToastOverlay } from "@/components/shared"

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
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
    <html lang="en" className={`${nunito.variable} bg-background`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <GemsProvider>
            <StreakProvider>
              <HeartsProvider>
                <XPProvider>
                  {children}
                  <FloatingXPOverlay />
                  <AchievementToastOverlay />
                  {process.env.NODE_ENV === 'production' && <Analytics />}
                </XPProvider>
              </HeartsProvider>
            </StreakProvider>
          </GemsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
