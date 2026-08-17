import { ImageResponse } from 'next/og'
import { SITE_TITLE, SITE_TAGLINE, LOCALITY } from '@/lib/site'

// Dynamic default share card, rendered by Next at request/build time. Code-only,
// so there is no binary asset to keep in sync. Per-work portfolio pages override
// this with their own Sanity coverImage; every other route shares this card.
export const alt = SITE_TITLE
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FONT_FAMILY = 'Cormorant Garamond'

// Satori only uses fonts handed to it - it cannot see system or CSS fonts, and
// silently falls back to sans-serif otherwise. The legacy user agent matters:
// without it Google serves woff2, which Satori cannot parse.
async function loadDisplayFont(weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    FONT_FAMILY
  )}:wght@${weight}`

  try {
    const css = await fetch(cssUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
      },
    }).then((res) => (res.ok ? res.text() : ''))

    const fontUrl = css.match(/src: url\((\S+?)\) format\('(?:woff|truetype|opentype)'\)/)?.[1]
    if (!fontUrl) return null

    const res = await fetch(fontUrl)
    if (!res.ok) return null

    return { name: FONT_FAMILY, data: await res.arrayBuffer(), weight, style: 'normal' }
  } catch {
    // A share card in the wrong face beats a 500 on the image route.
    return null
  }
}

export default async function OpengraphImage() {
  const font = await loadDisplayFont(400)
  const fonts = font ? [font] : []

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0e0e0d',
          color: '#f2efe9',
          padding: '80px',
          fontFamily: `"${FONT_FAMILY}", Georgia, serif`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#9a9590',
          }}
        >
          {SITE_TAGLINE}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 150, lineHeight: 1, letterSpacing: -4 }}>PJ Juplo</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 32 }}>
            <div style={{ width: 48, height: 2, background: '#9a9590' }} />
            <div style={{ fontSize: 26, letterSpacing: 2, color: '#9a9590', marginLeft: 20 }}>
              {LOCALITY}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) }
  )
}
