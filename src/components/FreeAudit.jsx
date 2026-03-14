export default function FreeAudit() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-12 sm:px-12 sm:py-16 text-center">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-transparent to-gray-800/30" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 bg-white/10 border border-white/10 px-3 py-1 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Limited Spots Available
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-white">
              Get Your Free AI Audit
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-8">
              We'll analyze your workflows, identify automation opportunities, and show you exactly
              how AI can save your team 10-15 hours per week. No strings attached.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center bg-white text-gray-900 text-sm font-medium h-12 px-8 rounded-full hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Claim Your Free Audit
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
