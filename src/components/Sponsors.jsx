const capabilities = [
  'Workflow Automation',
  'Document Processing',
  'Data Entry & Migration',
  'Customer Support AI',
  'Reporting & Analytics',
  'Custom Integrations',
]

export default function Sponsors() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm font-medium text-gray-400 mb-6 uppercase tracking-[0.2em]">
            Built for Small & Mid-Size Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {capabilities.map((item) => (
              <span
                key={item}
                className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
