const founders = [
  {
    name: 'Tobenna Ikejiani',
    role: 'Co-Founder',
    initials: 'TI',
    bio: 'Finance and operations background. Focused on strategy, client relationships, and scaling the business.',
  },
  {
    name: 'Melchzedeck Kimario',
    role: 'Co-Founder',
    initials: 'MK',
    bio: 'Engineering and AI background. Leads technical architecture, model development, and product delivery.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Team</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
            Built by Operators
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            We believe every business deserves access to AI.
            We partner with SMBs as their fractional AI department, delivering enterprise-grade
            automation at a fraction of the cost.
          </p>
        </div>
        <div className="max-w-md sm:max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="group relative bg-white border border-gray-100 rounded-2xl p-8 text-center hover:border-gray-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="relative">
                {/* Avatar */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-600 text-white text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto mb-5"
                  style={{ width: '4.5rem', height: '4.5rem' }}
                >
                  {founder.initials}
                </div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900">{founder.name}</h3>
                <p className="text-sm text-gray-500 font-medium mb-3">{founder.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
