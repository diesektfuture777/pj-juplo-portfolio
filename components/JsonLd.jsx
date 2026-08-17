// Renders a JSON-LD block for search engines and AI answer engines.
//
// JSON.stringify alone is not safe inside a <script> tag: a literal
// "</script>" anywhere in the data would close the tag early and turn the rest
// of the payload into markup. Escaping "<" as < keeps the JSON byte-for-
// byte valid while making that impossible, whatever ends up in a work title or
// description pulled from the CMS. All structured data goes through here so the
// guarantee holds in one place.
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
