// __tests__/api/contact.test.js
import { POST } from '@/app/api/contact/route'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
    },
  })),
}), { virtual: true })

describe('POST /api/contact', () => {
  const validBody = { name: 'Test', email: 'test@example.com', message: 'Hello' }

  beforeEach(() => {
    delete process.env.RESEND_API_KEY
  })

  it('returns 400 when fields are missing', async () => {
    const req = { json: async () => ({ name: '', email: '', message: '' }) }
    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBe('Missing fields')
  })

  it('returns 200 and logs to console when RESEND_API_KEY is not set', async () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const req = { json: async () => validBody }
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(spy).toHaveBeenCalledWith('[Contact Form — no RESEND_API_KEY]', validBody)
    spy.mockRestore()
  })
})
