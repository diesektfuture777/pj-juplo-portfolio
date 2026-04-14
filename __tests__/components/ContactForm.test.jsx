// __tests__/components/ContactForm.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '@/components/ContactForm'

global.fetch = jest.fn()
beforeEach(() => fetch.mockClear())

describe('ContactForm', () => {
  it('shows validation errors when submitted empty', async () => {
    render(<ContactForm />)
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
  })

  it('shows invalid email error', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'notvalid' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
  })

  it('shows success message on valid submit', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) })
    render(<ContactForm />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/message sent/i)).toBeInTheDocument()
  })

  it('shows error message on failed submit', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    render(<ContactForm />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })
})
