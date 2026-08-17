// lib/data.js
// Data layer: fetches from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set,
// otherwise falls back to local mock data so the site works without credentials.
import { client } from './sanity'
import mockWorks from '@/data/mockWorks'
import { mockAbout, mockSettings } from '@/data/mockSite'
import {
  getAllWorksQuery,
  getWorkBySlugQuery,
  getAllWorkSlugsQuery,
  getAboutQuery,
  getSettingsQuery,
} from './queries'

const sanityEnabled = !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim())

// The content fetches below deliberately let a failed fetch throw. Swallowing
// it would serve the placeholder works under a 200: the build would bake mock
// slugs into the sitemap as canonical URLs, and a real portfolio URL would come
// back a hard 404. A throw surfaces as a 500 that crawlers retry and that fails
// the build loudly, which is the correct behaviour for missing content.

export async function getAllWorks() {
  if (!sanityEnabled) return mockWorks
  const data = await client.fetch(getAllWorksQuery, {}, { next: { revalidate: 60 } })
  return data?.length ? data : mockWorks
}

export async function getWorkBySlug(slug) {
  if (!sanityEnabled) return mockWorks.find(w => w.slug === slug) || null
  const data = await client.fetch(getWorkBySlugQuery, { slug }, { next: { revalidate: 60 } })
  return data || mockWorks.find(w => w.slug === slug) || null
}

export async function getAllWorkSlugs() {
  if (!sanityEnabled) return mockWorks.map(w => ({ slug: w.slug }))
  const data = await client.fetch(getAllWorkSlugsQuery, {}, { cache: 'no-store' })
  return data?.length ? data : mockWorks.map(w => ({ slug: w.slug }))
}

export async function getAbout() {
  if (!sanityEnabled) return mockAbout
  const data = await client.fetch(getAboutQuery, {}, { next: { revalidate: 3600 } })
  return data || mockAbout
}

// Settings throws for the same reason as the fetches above: it carries the
// contact email, and serving the placeholder address under a 200 would silently
// send real enquiries nowhere. The root layout, whose use of this is decorative,
// catches on its own behalf so an outage there does not take down every route.
export async function getSettings() {
  if (!sanityEnabled) return mockSettings
  const data = await client.fetch(getSettingsQuery, {}, { next: { revalidate: 3600 } })
  return data || mockSettings
}
