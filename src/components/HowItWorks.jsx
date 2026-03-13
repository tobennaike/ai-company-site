const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We learn your business, identify pain points, and map opportunities for AI.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Build & Integrate',
    description: 'Our team builds and deploys custom AI solutions tailored to your workflows.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743Z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Optimize & Scale',
    description: 'Ongoing support and optimization. We are your fractional AI department.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 md:py-32 relative">
      {/* Subtle background differentiation */}
      <div className="absolute inset-0 bg-gray-50/80" />
      <div className="container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Process</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            A simple, proven process to bring AI into your business.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative group ${i < steps.length - 1 ? 'step-connector' : ''}`}
            >
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 text-center hover:border-gray-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 h-full">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-bold mb-5">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center mx-auto mb-5">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 tracking-tight text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
