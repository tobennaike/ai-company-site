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
    <section id="how-it-works" className="py-24 sm:py-32 bg-[hsl(var(--muted))]/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] mb-3">Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It{' '}
            <span className="bg-gradient-to-b from-[hsl(var(--primary))]/60 to-[hsl(var(--primary))] text-transparent bg-clip-text">
              Works
            </span>
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            A simple, proven process to bring AI into your business.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-8 text-center relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-xs font-bold px-3 py-1 rounded-full">
                Step {step.number}
              </div>
              <div className="w-12 h-12 rounded-lg bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex items-center justify-center mx-auto mb-5 mt-2">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
