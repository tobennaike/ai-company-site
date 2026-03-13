import { useState, useEffect } from 'react'
import { LogoFull } from './Logo'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 backdrop-blur-xl border-b border-black/5'
        : 'bg-transparent'
    }`}>
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="group">
          <LogoFull />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 px-3.5 py-2 rounded-lg hover:bg-gray-100/50 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-gray-900 text-white text-sm font-medium h-9 px-5 rounded-full hover:bg-gray-800 hover:shadow-lg hover:-translate-y-px transition-all duration-200"
          >
            Get Started
          </a>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100/50 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-500 hover:text-gray-900 py-2.5 px-3 rounded-lg hover:bg-gray-100/50 transition-all"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-gray-900 text-white text-sm font-medium py-2.5 rounded-full mt-3 hover:bg-gray-800 transition-colors"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}
