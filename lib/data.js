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

export async function getAllWorks() {
  if (!sanityEnabled) return mockWorks
  return client.fetch(getAllWorksQuery, {}, { next: { revalidate: 60 } })
}

export async function getWorkBySlug(slug) {
  if (!sanityEnabled) {
    return mockWorks.find(w => w.slug === slug) || null
  }
  return client.fetch(getWorkBySlugQuery, { slug }, { next: { revalidate: 60 } })
}

export async function getAllWorkSlugs() {
  if (!sanityEnabled) return mockWorks.map(w => ({ slug: w.slug }))
  return client.fetch(getAllWorkSlugsQuery, {}, { cache: 'no-store' })
}

export async function getAbout() {
  if (!sanityEnabled) return mockAbout
  return client.fetch(getAboutQuery, {}, { next: { revalidate: 3600 } })
}

export async function getSettings() {
  if (!sanityEnabled) return mockSettings
  return client.fetch(getSettingsQuery, {}, { next: { revalidate: 3600 } })
}
