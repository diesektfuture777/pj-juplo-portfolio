// lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()

// Client is only created when a projectId is present — safe to import in all pages
export const client = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

// Build an optimised image URL from a Sanity image reference
export function urlFor(source) {
  if (!builder) return null
  return builder.image(source)
}
