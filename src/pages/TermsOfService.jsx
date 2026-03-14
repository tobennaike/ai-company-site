import { Link } from 'react-router-dom'
import { COMPANY_NAME } from '../constants'

export default function TermsOfService() {
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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 13, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the services provided by {COMPANY_NAME} ("we," "our," or "us"),
              you agree to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Services</h2>
            <p>
              {COMPANY_NAME} provides AI automation and consulting services for small and mid-size
              businesses, including but not limited to: custom AI software development, sales and CRM
              automation, marketing and lead generation automation, operations and workflow automation,
              and customer support AI solutions. The specific scope of services will be defined in
              individual service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Client Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate and complete information necessary for us to deliver services.</li>
              <li>Grant reasonable access to systems, data, and personnel as needed for project execution.</li>
              <li>Review and provide timely feedback on deliverables.</li>
              <li>Ensure compliance with applicable laws regarding data shared with us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>
              Unless otherwise specified in a service agreement, all custom AI solutions, software, and
              deliverables created for you become your property upon full payment. We retain the right
              to use general knowledge, techniques, and non-proprietary tools developed during the
              engagement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Confidentiality</h2>
            <p>
              Both parties agree to maintain the confidentiality of proprietary information shared during
              the engagement. This includes business data, trade secrets, technical specifications, and
              any information marked as confidential. This obligation survives termination of services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Payment Terms</h2>
            <p>
              Payment terms, including fees, schedules, and methods, will be outlined in individual
              service agreements or proposals. Unless otherwise agreed, invoices are due within 30 days
              of issuance. Late payments may incur additional fees.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from the use
              of our services. Our total liability shall not exceed the amount paid by you for the
              specific services giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Warranties</h2>
            <p>
              We warrant that our services will be performed in a professional and workmanlike manner.
              Except as expressly stated, our services are provided "as is" without warranties of any
              kind, whether express or implied, including implied warranties of merchantability or
              fitness for a particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Termination</h2>
            <p>
              Either party may terminate services with 30 days' written notice. Upon termination,
              you are responsible for payment of all services rendered up to the termination date.
              We will provide reasonable assistance in transitioning deliverables.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Georgia, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be
              posted on this page with an updated effective date. Continued use of our services
              after changes constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">12. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at{' '}
              <a href="mailto:hello@auxosolutions.ai" className="text-gray-900 underline hover:no-underline">hello@auxosolutions.ai</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
