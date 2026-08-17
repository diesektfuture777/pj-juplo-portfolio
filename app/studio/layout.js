// The Studio page itself is a client component and so cannot export metadata.
// Without this server layout it inherits the root layout's `index, follow`.
// robots.txt keeps crawlers off the path but does not stop a linked URL being
// indexed, so the noindex has to be in the page. The root layout sets no
// canonical of its own, so the null one below changes nothing today; it is kept
// as a guard in case a site-wide canonical is ever reintroduced there.
export const metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function StudioLayout({ children }) {
  return children
}
