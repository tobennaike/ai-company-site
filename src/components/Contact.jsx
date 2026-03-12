import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[hsl(var(--muted))]/50">
      <div className="container">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] mb-3">Contact</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's{' '}
              <span className="bg-gradient-to-b from-[hsl(var(--primary))]/60 to-[hsl(var(--primary))] text-transparent bg-clip-text">
                Talk
              </span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))]">
              Tell us about your business and we'll schedule a discovery call.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Message Sent</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 sm:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/50 transition-all"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company</label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-2.5 text-sm border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/50 transition-all"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-[hsl(var(--border))] rounded-lg bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/50 resize-none transition-all"
                  placeholder="Tell us about your business..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium h-11 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
