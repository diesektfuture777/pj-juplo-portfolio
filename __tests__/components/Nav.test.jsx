import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '@/components/Nav'

jest.mock('next/navigation', () => ({ usePathname: jest.fn(() => '/') }))
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>,
}))
// AnimatePresence doesn't unmount synchronously in jsdom; mock framer-motion
// so conditional renders work as plain React state toggles in tests.
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Strip framer-specific props that would cause React DOM warnings
      const { initial, animate, exit, transition, ...rest } = props
      return <div {...rest}>{children}</div>
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe('Nav', () => {
  it('renders logo and desktop nav links', () => {
    render(<Nav />)
    expect(screen.getByText('PJ Juplo')).toBeInTheDocument()
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('opens mobile menu on hamburger click', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
  })

  it('closes mobile menu on close button click', () => {
    render(<Nav />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Close menu'))
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
  })
})
