import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"],
  variable: '--font-arabic'
});

export const metadata: Metadata = {
  title: 'Safari Limo VIP | Luxury Airport Transfers',
  description: 'Experience premium luxury airport transfers and VIP transportation services with Safari Limo VIP. Book your ride in our fleet of Toyota Hiace, GMC Yukon, and Cadillac Escalade.',
  generator: 'v0.app',
  keywords: ['limousine', 'airport transfer', 'VIP transport', 'luxury car', 'Dubai', 'UAE'],
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
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-black text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
