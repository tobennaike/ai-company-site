const stats = [
  { value: '100+', label: 'Workflows Automated' },
  { value: '50+', label: 'Businesses Served' },
  { value: '10x', label: 'Average ROI' },
  { value: '24/7', label: 'AI Working For You' },
]

export default function Stats() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-b from-[hsl(var(--foreground))] to-[hsl(var(--foreground))]/70 text-transparent bg-clip-text">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
