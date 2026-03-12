export default function Hero() {
  return (
    <section className="py-20 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto px-2">
          <span className="inline-block text-xs sm:text-sm font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-4 py-1.5 rounded-full mb-6">
            Your Fractional AI Team
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            AI solutions that{' '}
            <span className="bg-gradient-to-b from-[hsl(var(--primary))]/60 to-[hsl(var(--primary))] text-transparent bg-clip-text">
              transform
            </span>{' '}
            your business
          </h1>

          <p className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] mb-10 max-w-xl mx-auto leading-relaxed">
            We automate workflows, integrate intelligent systems, and build custom AI solutions
            for small and mid-size businesses. No in-house AI team required.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium h-11 px-8 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(var(--primary))]/20"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border border-[hsl(var(--border))] text-sm font-medium h-11 px-8 rounded-lg hover:bg-[hsl(var(--accent))] transition-colors"
            >
              Our Services
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
