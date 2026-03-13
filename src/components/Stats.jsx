const stats = [
  { value: '< 2 Weeks', label: 'To First Automation' },
  { value: '24/7', label: 'AI Working For You' },
  { value: '3-10x', label: 'Typical ROI' },
  { value: '0', label: 'AI Hires Needed' },
]

export default function Stats() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative text-center py-6 px-4 bg-gray-50 border border-gray-100 rounded-2xl"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
