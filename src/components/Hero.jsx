export default function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto px-2">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
            Your Fractional AI Team
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.02em] leading-[1.1] mb-6 text-gray-900">
            AI Built For{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-transparent bg-clip-text">
                How You Work
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-gray-900 via-gray-500 to-transparent rounded-full" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            We plug proven AI tools into your existing workflows. No hiring, no R&D,
            no six-month rollouts. Just results.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center bg-gray-900 text-white text-sm font-medium h-12 px-8 rounded-full hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Your Free AI Audit
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
