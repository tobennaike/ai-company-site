const founders = [
  {
    name: 'Melchzedeck Kimario',
    role: 'Co-Founder',
    initials: 'MK',
  },
  {
    name: 'Tobenna Ikejiani',
    role: 'Co-Founder',
    initials: 'TI',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Team</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-4 text-gray-900">
            Meet the Partners
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            With experience across industrials, services, real estate, and technology,
            we understand how businesses operate and scale. Now we're bringing that
            expertise to AI — helping SMBs automate, grow, and compete.
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
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gray-900 text-white text-xl sm:text-2xl font-bold flex items-center justify-center mx-auto mb-5"
                  style={{ width: '4.5rem', height: '4.5rem' }}
                >
                  {founder.initials}
                </div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900">{founder.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{founder.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
