// app/(site)/portfolio/page.jsx
import PortfolioGrid from '@/components/PortfolioGrid'
import mockWorks from '@/data/mockWorks'

export const metadata = { title: 'Work — PJ Juplo' }

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-bg pt-16">
      <PortfolioGrid works={mockWorks} />
    </main>
  )
}
