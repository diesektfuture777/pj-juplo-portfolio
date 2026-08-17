import { getAllWorks } from '@/lib/data'
import { SITE_URL } from '@/lib/site'

// Generated to /sitemap.xml and pointed at from robots.txt. Work pages carry
// their real publishedAt date; static routes use the build date, the closest
// honest answer for pages whose content ships with the deploy.
const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/portfolio', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
]

export default async function sitemap() {
  const buildDate = new Date()

  const staticEntries = STATIC_ROUTES.map((route) => ({
    // Home is "/" here for readability, but emitted as the bare origin to match
    // what Next resolves the home canonical to (no trailing slash). Same page
    // either way; the point is that it never appears as two different strings.
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const works = await getAllWorks()
  const workEntries = works
    .filter((w) => w.slug)
    .map((w) => ({
      url: `${SITE_URL}/portfolio/${w.slug}`,
      lastModified: w.publishedAt ? new Date(w.publishedAt) : buildDate,
      changeFrequency: 'yearly',
      priority: 0.8,
    }))

  return [...staticEntries, ...workEntries]
}
