const tiers = [
  {
    name: 'Starter',
    price: '$1,500',
    implementation: '$5,000',
    description: '1 AI tool to get you started',
    features: [
      '1 AI automation tool',
      'Full implementation & integration',
      'Team training & onboarding',
      'Email support',
      'Monthly performance report',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$2,500',
    implementation: '$10,000',
    description: 'For businesses ready to scale',
    features: [
      '2 AI automation tools',
      'Custom integrations & workflows',
      'Dedicated implementation lead',
      'Monthly strategy check-in',
      'Priority support',
      'Workflow optimization',
    ],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$5,000',
    implementation: '$20,000',
    description: 'Full AI transformation',
    features: [
      'All AI tools included',
      'End-to-end custom builds',
      'Dedicated account manager',
      'Priority support & SLA',
      'Quarterly business reviews',
      'Early access to new tools',
    ],
    cta: 'Get Started',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gray-50/80" />
      <div className="container relative">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            One-time implementation + ongoing service. No hidden fees.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5 ${
                tier.featured
                  ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 ring-1 ring-gray-800 md:scale-[1.02]'
                  : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-black/5'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-white text-gray-900 px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-1 ${tier.featured ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${tier.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                  {tier.description}
                </p>
                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-semibold tracking-tight ${tier.featured ? 'text-white' : 'text-gray-900'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-sm ${tier.featured ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                  </div>
                  <p className={`text-xs mt-1 ${tier.featured ? 'text-gray-500' : 'text-gray-400'}`}>
                    {tier.implementation} one-time implementation
                  </p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.featured ? 'text-green-400' : 'text-gray-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className={`text-sm ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center text-sm font-medium py-2.5 rounded-full transition-all duration-200 ${
                  tier.featured
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
