import Link from 'next/link'

// Shared by both 404 boundaries - app/not-found.js for unmatched URLs and
// app/(site)/not-found.jsx for a notFound() raised inside the site group - so
// the two can never drift into showing different copy.
export default function NotFoundContent() {
  return (
    <main className="min-h-screen bg-bg flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <p className="font-body text-[10px] tracking-[4px] text-muted uppercase mb-8">404</p>
        <h1 className="font-display text-4xl md:text-5xl text-ink tracking-[-1px] leading-tight mb-8">
          This page does not exist.
        </h1>
        <div className="w-8 h-px bg-muted mb-8" />
        <Link
          href="/"
          className="font-body text-xs text-muted hover:text-ink transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
