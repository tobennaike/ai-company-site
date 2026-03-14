import { Link } from 'react-router-dom'
import { COMPANY_NAME } from '../constants'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-[20px] font-bold tracking-[-0.03em] text-gray-900">Auxo</span>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">Solutions</span>
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <div className="container max-w-3xl py-16 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 13, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              {COMPANY_NAME} ("we," "our," or "us") respects your privacy and is committed to protecting
              the personal information you share with us. This Privacy Policy explains how we collect, use,
              and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and company name submitted through our contact form.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and IP address collected automatically through cookies and similar technologies.</li>
              <li><strong>Business Information:</strong> Details about your business operations shared during consultations to deliver our AI automation services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to inquiries and provide our AI automation, CRM, marketing, operations, and custom software services.</li>
              <li>To communicate with you about projects, updates, and service-related matters.</li>
              <li>To improve our website and services.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with trusted
              third-party service providers who assist us in operating our website and delivering our
              services (e.g., hosting providers, analytics tools, CRM platforms). These providers are
              contractually obligated to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information,
              including encryption, access controls, and secure data storage. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes
              outlined in this policy, or as required by law. You may request deletion of your data at
              any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request a copy of your data in a portable format.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your experience.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@auxosolutions.ai" className="text-gray-900 underline hover:no-underline">hello@auxosolutions.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
