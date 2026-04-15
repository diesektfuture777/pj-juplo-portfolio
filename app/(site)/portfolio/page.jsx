// app/(site)/portfolio/page.jsx
import PortfolioGrid from '@/components/PortfolioGrid'
import { getAllWorks } from '@/lib/data'

export const metadata = { title: 'Work — PJ Juplo' }

export default async function PortfolioPage() {
  const works = await getAllWorks()
  return (
    <main className="min-h-screen bg-bg pt-16">
      <PortfolioGrid works={works} />
    </main>
  )
}
