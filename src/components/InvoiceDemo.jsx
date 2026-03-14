import { useState, useEffect } from 'react'

const EXTRACTED_FIELDS = [
  { label: 'Vendor', value: 'Nexcore Technologies' },
  { label: 'Invoice #', value: 'INV-2026-0847' },
  { label: 'Invoice Date', value: 'Mar 1, 2026' },
  { label: 'Due Date', value: 'Mar 31, 2026' },
  { label: 'Subtotal', value: '$3,800.00' },
  { label: 'Tax (6%)', value: '$228.00' },
  { label: 'Total', value: '$4,028.00' },
]

// Phases: 0=upload, 1=processing, 2=extracting, 3=done
const PHASE_DURATIONS = [2200, 1800, 3200, 3000]

export default function InvoiceDemo() {
  const [phase, setPhase] = useState(0)
  const [visibleFields, setVisibleFields] = useState(0)

  useEffect(() => {
    let timeout
    const advance = (current) => {
      timeout = setTimeout(() => {
        const next = (current + 1) % 4
        setPhase(next)
        if (next === 0) setVisibleFields(0)
        advance(next)
      }, PHASE_DURATIONS[current])
    }
    advance(phase)
    return () => clearTimeout(timeout)
  }, [])

  // Reveal fields one-by-one during phase 2
  useEffect(() => {
    if (phase !== 2) return
    setVisibleFields(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleFields(i)
      if (i >= EXTRACTED_FIELDS.length) clearInterval(interval)
    }, 360)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <section className="py-16 sm:py-24 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Live Demo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
            Invoice Processing, Automated
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Drop in any invoice — PDF, scan, or image. Our AI extracts every field and posts directly to QuickBooks. No templates. No manual entry.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Features + badges */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: '⚡', text: 'Invoices processed in seconds, not minutes' },
                { icon: '✓', text: 'Every invoice verified before posting' },
                { icon: '🔄', text: 'Posts directly to your accounting software' },
                { icon: '📄', text: 'Works with any vendor — no templates needed' },
              ].map((f) => (
                <div key={f.text} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-lg shrink-0 shadow-sm">{f.icon}</span>
                  <span className="text-[15px] leading-snug text-gray-800 font-medium pt-1.5">{f.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['QuickBooks Online', 'Xero', 'PDF', 'DOCX', 'Scanned', 'Multi-page'].map((tag) => (
                <span key={tag} className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Animated mockup */}
          <div className="relative">
            {/* Browser chrome */}
            <div className="rounded-2xl border border-gray-200 shadow-2xl shadow-black/10 bg-white overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <span className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="ml-3 flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400">
                  portal.auxo.ai/upload
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 min-h-[340px] flex flex-col">
                {/* Phase 0: Upload */}
                {phase === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full max-w-xs border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 relative overflow-hidden">
                      {/* Animated file dropping */}
                      <div className="animate-bounce mb-3">
                        <div className="w-12 h-14 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center gap-1">
                          <div className="w-6 h-1 bg-red-400 rounded-full" />
                          <div className="w-6 h-1 bg-gray-200 rounded-full" />
                          <div className="w-6 h-1 bg-gray-200 rounded-full" />
                          <div className="w-4 h-1 bg-gray-200 rounded-full" />
                        </div>
                      </div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Nexcore_Invoice_March.pdf</p>
                      <p className="text-xs text-gray-400">Drop to process</p>
                    </div>
                  </div>
                )}

                {/* Phase 1: Processing */}
                {phase === 1 && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">Extracting fields with AI...</p>
                    <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ animation: 'progress 1.8s ease-in-out forwards' }} />
                    </div>
                  </div>
                )}

                {/* Phase 2: Extracting */}
                {(phase === 2 || phase === 3) && (
                  <div className="flex-1 flex flex-col gap-3">
                    {/* File label */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-7 bg-gray-100 border border-gray-200 rounded flex items-center justify-center shrink-0">
                        <div className="space-y-0.5">
                          <div className="w-3 h-0.5 bg-gray-400 rounded" />
                          <div className="w-3 h-0.5 bg-gray-300 rounded" />
                          <div className="w-2 h-0.5 bg-gray-300 rounded" />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">Nexcore_Invoice_March.pdf</span>
                      {phase === 3 && (
                        <span className="ml-auto text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Auto-verified ✓
                        </span>
                      )}
                    </div>

                    {/* Fields */}
                    <div className="space-y-1.5">
                      {EXTRACTED_FIELDS.map((field, i) => (
                        <div
                          key={field.label}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all duration-300 ${
                            i < visibleFields || phase === 3
                              ? 'bg-gray-50 border border-gray-100 opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-1'
                          }`}
                        >
                          <span className="text-gray-400 w-24">{field.label}</span>
                          <span className="font-medium text-gray-800">{field.value}</span>
                          {(i < visibleFields || phase === 3) && (
                            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Confidence */}
                    {phase === 3 && (
                      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Verification status</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Auto-verified ✓
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -right-4 top-8 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg shadow-black/5 hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-gray-700">247 processed this month</span>
            </div>
            <div className="absolute -left-4 bottom-10 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-lg shadow-black/5 hidden sm:flex items-center gap-2">
              <span className="text-xs font-medium text-gray-700">18.5 hrs saved</span>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
