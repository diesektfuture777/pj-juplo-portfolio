import NotFoundContent from '@/components/NotFoundContent'
import { NOT_FOUND_METADATA } from '@/lib/site'

// The root 404, reached by URLs that match no route at all. It renders inside
// the root layout only, without the site chrome - see app/(site)/not-found.jsx
// for the boundary that keeps Nav and Footer.
export const metadata = NOT_FOUND_METADATA

export default function NotFound() {
  return <NotFoundContent />
}
