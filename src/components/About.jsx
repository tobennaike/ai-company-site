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
    <section id="about" className="py-24 sm:py-32">
      <div className="container">
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-medium text-[hsl(var(--primary))] mb-3">Team</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built by{' '}
            <span className="bg-gradient-to-b from-[hsl(var(--primary))]/60 to-[hsl(var(--primary))] text-transparent bg-clip-text">
              Operators
            </span>
          </h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            We believe every business deserves access to AI.
            We partner with SMBs as their fractional AI department, delivering enterprise-grade
            automation at a fraction of the cost.
          </p>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-sm pt-12 pb-6 px-6 text-center relative mt-10"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-2xl font-bold flex items-center justify-center border-4 border-[hsl(var(--background))]">
                {founder.initials}
              </div>
              <h3 className="text-lg font-semibold mt-2">{founder.name}</h3>
              <p className="text-sm text-[hsl(var(--primary))] font-medium mb-3">{founder.role}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">{founder.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
