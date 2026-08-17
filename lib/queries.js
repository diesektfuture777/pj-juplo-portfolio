// lib/queries.js
// All GROQ projections mirror the mock data shape so pages need no changes.
//
// Every filter excludes `drafts.**`. The client is created with a token and no
// perspective, so the API answers from `raw` and hands back the draft and the
// published copy of any edited document. Unfiltered, an unpublished work would
// be advertised in the sitemap and an edited one would appear there twice.

export const getAllWorksQuery = `
  *[_type == "work" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    type,
    category,
    "coverImage": coverImage.asset->url,
    "videoFile": videoFile.asset->url,
    description,
    featured,
    publishedAt,
    _createdAt
  }
`

export const getWorkBySlugQuery = `
  *[_type == "work" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    title,
    "slug": slug.current,
    type,
    category,
    "coverImage": coverImage.asset->url,
    "videoFile": videoFile.asset->url,
    description,
    featured,
    publishedAt,
    _createdAt
  }
`

export const getAllWorkSlugsQuery = `
  *[_type == "work" && !(_id in path("drafts.**"))] { "slug": slug.current }
`

// bio is stored as array of text items - each item becomes a paragraph
export const getAboutQuery = `
  *[_type == "about" && !(_id in path("drafts.**"))][0] {
    headline,
    bio,
    "portrait": portrait.asset->url
  }
`

export const getSettingsQuery = `
  *[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
    seoTitle,
    seoDesc,
    email,
    instagram,
    facebook
  }
`
