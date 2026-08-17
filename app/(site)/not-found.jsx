import NotFoundContent from '@/components/NotFoundContent'
import { NOT_FOUND_METADATA } from '@/lib/site'

// The site-group 404. A notFound() from a route inside (site) - a dead
// portfolio link, say - stops here rather than bubbling to app/not-found.js,
// so the visitor keeps the Nav and Footer and has somewhere to go.
export const metadata = NOT_FOUND_METADATA

export default function SiteNotFound() {
  return <NotFoundContent />
}
