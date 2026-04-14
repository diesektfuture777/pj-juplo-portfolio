// app/layout.js
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-body',
})

export const metadata = {
  title: 'PJ Juplo — Photographer & Filmmaker',
  description: 'Portfolio of PJ Juplo, photographer and filmmaker based in Manila.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-ink antialiased">{children}</body>
    </html>
  )
}
