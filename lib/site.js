// Single source of truth for the site's identity and its per-page metadata
// shape. Every route builds its tags from pageMeta() so no page can drift back
// to advertising itself as the homepage.
//
// Location is Singapore here on purpose. The Sanity `siteSettings.seoDesc` and
// the `about` bio still say "Manila" and should be updated in the CMS to match;
// this file is the code-level source of truth in the meantime.

export const SITE_URL = 'https://www.pjjuplo.art'
export const SITE_NAME = 'PJ Juplo'
export const SITE_TAGLINE = 'Photographer & Filmmaker'
export const LOCALITY = 'Singapore'
export const COUNTRY = 'SG'

// The one string every default title is built from: the layout default, the OG
// and Twitter titles, the home page title, and the OG image alt all read this so
// they cannot drift apart.
export const SITE_TITLE = `${SITE_NAME} - ${SITE_TAGLINE}`

export const SITE_DESCRIPTION =
  'Portfolio of PJ Juplo, a Singapore-based photographer and filmmaker working across portrait, commercial, and documentary formats.'

// The photographer and the developer are the same person. Linking the two sites
// via sameAs lets answer engines resolve one entity across both.
export const DEV_SITE = 'https://www.pjjuplo.dev'

// Emitted by the app/opengraph-image.js dynamic route. Named explicitly here
// because once a child route defines its own `openGraph` block, Next stops
// filling in the file-convention image for that route unless it is restated.
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
}

// Absolute form of the default card, for consumers that cannot resolve a
// metadataBase-relative path (JSON-LD, for one).
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE.url}`

const SANITY_CDN_HOST = 'cdn.sanity.io'

/**
 * Turns a Sanity asset URL into a share card.
 *
 * `coverImage.asset->url` is the untouched original upload - for a
 * photographer's files routinely several MB at whatever aspect the camera shot.
 * X rejects images over 5MB and both X and Facebook crop an off-ratio image
 * unpredictably, so every Sanity URL goes through the CDN's transform params to
 * come back as a 1200x630 crop. Anything not served by the Sanity CDN cannot be
 * resized this way, so it falls back to the site's own card.
 */
export function ogImageFrom(url, alt) {
  if (!url) return OG_IMAGE
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return OG_IMAGE
  }
  if (parsed.hostname !== SANITY_CDN_HOST) return OG_IMAGE
  parsed.searchParams.set('w', String(OG_IMAGE.width))
  parsed.searchParams.set('h', String(OG_IMAGE.height))
  parsed.searchParams.set('fit', 'crop')
  parsed.searchParams.set('auto', 'format')
  return {
    url: parsed.toString(),
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: alt || OG_IMAGE.alt,
  }
}

// Shared by both 404 boundaries. Without it a 404 inherits the root layout's
// `index, follow`, contradicting the `noindex` Next already sets. The root
// layout sets no canonical of its own, so the null one below changes nothing
// today; it is kept as a guard in case a site-wide canonical is ever
// reintroduced there. The title is absolute so the root layout's
// "%s - PJ Juplo" template does not append a second site name to a title that
// already carries one.
export const NOT_FOUND_METADATA = {
  title: { absolute: `Page not found - ${SITE_NAME}` },
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

/**
 * Builds a complete metadata object for one route.
 *
 * Next.js shallow-merges metadata: a child that sets only title/description
 * still inherits the root `openGraph` block wholesale. Setting openGraph and
 * twitter here per route is what keeps each page's card its own, and OG_IMAGE
 * has to be restated for the reason noted above it.
 */
// `title` is the full page title string (e.g. "About - PJ Juplo"). It is set
// absolute so the root layout's title template never double-appends the site
// name, and the same string feeds the OG and Twitter titles so all three agree.
export function pageMeta({ title, description, path, type = 'website', openGraph = {}, images }) {
  const ogImages = images || [OG_IMAGE]
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
      images: ogImages,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages,
    },
  }
}
