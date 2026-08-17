// app/layout.js
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import { getSettings } from '@/lib/data'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  LOCALITY,
  COUNTRY,
  DEV_SITE,
} from '@/lib/site'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  // max-snippet/max-image-preview specifically help AI search: the defaults let
  // Google truncate the snippet it grounds an overview on; -1 / large opt into
  // the full text and a full-size image.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default async function RootLayout({ children }) {
  // Socials come from the CMS (or mock fallback) so the entity graph stays in
  // sync with the contact page without duplicating the links in code.
  //
  // The catch lives here rather than in getSettings because the layout is the
  // one caller that can safely degrade: what it reads is decorative, while the
  // contact page reads `email` from the same fetch and has to fail loudly rather
  // than publish a placeholder address under a 200. An outage here would
  // otherwise take down every route at once, including /studio - the surface
  // used to fix bad content.
  let settings = null
  try {
    settings = await getSettings()
  } catch (err) {
    console.error('[sanity] settings fetch failed, dropping socials:', err?.message)
  }
  const sameAs = [settings?.instagram, settings?.facebook, DEV_SITE].filter(Boolean)

  // Site-wide entity graph. This is what lets an answer engine resolve
  // "PJ Juplo" to a specific photographer and attribute the work, and gives a
  // stable @id for the Article/CreativeWork nodes on each page to reference.
  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Photographer and Filmmaker',
        description: SITE_DESCRIPTION,
        address: {
          '@type': 'PostalAddress',
          addressLocality: LOCALITY,
          addressCountry: COUNTRY,
        },
        knowsAbout: [
          'Photography',
          'Filmmaking',
          'Portrait photography',
          'Commercial photography',
          'Documentary',
          'Cinematography',
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-ink antialiased">
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  )
}
