// jest.setup.js
import '@testing-library/jest-dom'

// Polyfill Web APIs used by Next.js App Router route handlers
// Node 18+ has these natively but jsdom test environment may not expose them
if (typeof globalThis.Response === 'undefined') {
  // Use the undici Response that ships with Node 18+
  try {
    const { Response } = require('undici')
    globalThis.Response = Response
  } catch {
    // fallback: minimal stub so API tests can run
    globalThis.Response = class Response {
      constructor(body, init = {}) {
        this._body = body
        this.status = init.status || 200
        this.headers = new Map(Object.entries(init.headers || {}))
      }
      async json() { return JSON.parse(this._body) }
      static json(data, init = {}) {
        return new globalThis.Response(JSON.stringify(data), {
          ...init,
          headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
        })
      }
    }
  }
}
