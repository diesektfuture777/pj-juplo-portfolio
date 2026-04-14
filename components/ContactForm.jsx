// components/ContactForm.jsx
'use client'
import { useState } from 'react'

const initialForm = { name: '', email: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = 'w-full bg-transparent border-b border-black/15 py-3 font-body text-sm text-ink placeholder-muted focus:outline-none focus:border-ink transition-colors duration-200'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className={fieldClass}
        />
        {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className={fieldClass}
        />
        {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <textarea
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className={`${fieldClass} resize-none`}
        />
        {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="font-body text-[10px] tracking-[3px] text-ink uppercase border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors duration-200 disabled:opacity-40"
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && (
        <p className="font-body text-xs text-green-700 tracking-wide">
          Message sent — I&apos;ll be in touch.
        </p>
      )}
      {status === 'error' && (
        <p className="font-body text-xs text-red-500 tracking-wide">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
