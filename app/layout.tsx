import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'atlantics.dev | Digital Agency · Buenos Aires',
  description: 'Construimos el software que mueve negocios digitales. E-commerce, fintech, CRM, integraciones y automatización.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/atlantics.png',
        type: 'image/png',
      },
    ],
    apple: '/atlantics.png',
    shortcut: '/atlantics.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-[#07070A]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
