import { Link } from 'react-router-dom'
import { COMPANY_NAME } from '../constants'
import { LogoFullFooter } from './Logo'

const footerLinks = {
  Services: [
    { label: 'Sales & CRM', href: '#services' },
    { label: 'Marketing & Lead Gen', href: '#services' },
    { label: 'Operations', href: '#services' },
    { label: 'Customer Support AI', href: '#services' },
    { label: 'Custom AI Software', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy', isRoute: true },
    { label: 'Terms of Service', href: '/terms', isRoute: true },
  ],
}

export default function Footer() {
  return (
    <footer className="py-10 sm:py-12 relative">
      <div className="container">
        {/* Gradient divider instead of plain hr */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-10 sm:mb-12" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 sm:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-3">
              <LogoFullFooter />
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-gray-500 text-xs font-semibold mb-4 uppercase tracking-widest">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
