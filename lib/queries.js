// lib/queries.js
// All GROQ projections mirror the mock data shape so pages need no changes.

export const getAllWorksQuery = `
  *[_type == "work"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    type,
    category,
    "coverImage": coverImage.asset->url,
    "videoFile": videoFile.asset->url,
    description,
    featured,
    publishedAt
  }
`

export const getWorkBySlugQuery = `
  *[_type == "work" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    type,
    category,
    "coverImage": coverImage.asset->url,
    "videoFile": videoFile.asset->url,
    description,
    featured,
    publishedAt
  }
`

export const getAllWorkSlugsQuery = `
  *[_type == "work"] { "slug": slug.current }
`

// bio is stored as array of text items — each item becomes a paragraph
export const getAboutQuery = `
  *[_type == "about"][0] {
    headline,
    bio,
    "portrait": portrait.asset->url
  }
`

export const getSettingsQuery = `
  *[_type == "siteSettings"][0] {
    seoTitle,
    seoDesc,
    email,
    instagram,
    facebook
  }
`
