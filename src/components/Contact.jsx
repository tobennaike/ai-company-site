import { useState } from 'react'
import { supabase } from '../lib/supabase'

async function sendSlackNotification(lead) {
  const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        text: `New lead from AI company site!\n*Name:* ${lead.name}\n*Email:* ${lead.email}\n*Company:* ${lead.company || 'N/A'}\n*Message:* ${lead.message}`,
      }),
    })
  } catch {
    // Fire and forget - don't block on Slack failures
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      if (supabase) {
        const { error } = await supabase.from('leads').insert([
          {
            name: form.name,
            email: form.email,
            company: form.company || null,
            message: form.message,
          },
        ])
        if (error) throw error
      }

      // Fire Slack notification (non-blocking)
      sendSlackNotification(form)

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-gray-50">
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-gray-400 text-sm font-medium mb-3">Contact</span>
            <h2 className="text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
              Let's Talk
            </h2>
            <p className="text-gray-500">
              Tell us about your business and we'll schedule a discovery call.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent</h3>
              <p className="text-sm text-gray-500">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 space-y-5">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                  {errorMsg}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-gray-700 text-sm font-medium mb-1.5">Company</label>
                <input
                  type="text"
                  id="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 transition-all"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1.5">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-300 resize-none transition-all"
                  placeholder="Tell us about your business..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gray-900 text-white text-sm font-medium h-11 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
