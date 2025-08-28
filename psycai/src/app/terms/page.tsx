import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function TermsOfServicePage() {
  const lastUpdated = "December 15, 2024"
  const effectiveDate = "January 1, 2025"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-gray-900">PsycAi</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {lastUpdated}</p>
            <p className="text-gray-600">Effective date: {effectiveDate}</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-0">Table of Contents</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
              <li><a href="#acceptance" className="text-violet-600 hover:text-violet-700">Acceptance of Terms</a></li>
              <li><a href="#description" className="text-violet-600 hover:text-violet-700">Description of Services</a></li>
              <li><a href="#eligibility" className="text-violet-600 hover:text-violet-700">Eligibility</a></li>
              <li><a href="#accounts" className="text-violet-600 hover:text-violet-700">User Accounts</a></li>
              <li><a href="#acceptable-use" className="text-violet-600 hover:text-violet-700">Acceptable Use Policy</a></li>
              <li><a href="#prohibited-uses" className="text-violet-600 hover:text-violet-700">Prohibited Uses</a></li>
              <li><a href="#content" className="text-violet-600 hover:text-violet-700">User-Generated Content</a></li>
              <li><a href="#intellectual-property" className="text-violet-600 hover:text-violet-700">Intellectual Property Rights</a></li>
              <li><a href="#third-party" className="text-violet-600 hover:text-violet-700">Third-Party Services</a></li>
              <li><a href="#privacy" className="text-violet-600 hover:text-violet-700">Privacy Policy</a></li>
              <li><a href="#payments" className="text-violet-600 hover:text-violet-700">Payments and Billing</a></li>
              <li><a href="#disclaimers" className="text-violet-600 hover:text-violet-700">Disclaimers</a></li>
              <li><a href="#limitation" className="text-violet-600 hover:text-violet-700">Limitation of Liability</a></li>
              <li><a href="#indemnification" className="text-violet-600 hover:text-violet-700">Indemnification</a></li>
              <li><a href="#termination" className="text-violet-600 hover:text-violet-700">Termination</a></li>
              <li><a href="#governing-law" className="text-violet-600 hover:text-violet-700">Governing Law</a></li>
              <li><a href="#dispute-resolution" className="text-violet-600 hover:text-violet-700">Dispute Resolution</a></li>
              <li><a href="#changes" className="text-violet-600 hover:text-violet-700">Changes to Terms</a></li>
              <li><a href="#contact" className="text-violet-600 hover:text-violet-700">Contact Information</a></li>
            </ol>
          </div>

          <section id="acceptance" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to PsycAi ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website located at <a href="https://psycai.site" className="text-violet-600 hover:text-violet-700">psycai.site</a> (the "Service") operated by PsycAi.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </section>

          <section id="description" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PsycAi is a platform that provides:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Discovery and curation of AI-powered tools and applications</li>
              <li>Reviews, ratings, and recommendations for AI products</li>
              <li>Educational content, blogs, and resources about AI technology</li>
              <li>User accounts for personalized experiences</li>
              <li>Newsletter and communication services</li>
              <li>Contact and customer support services</li>
            </ul>
          </section>

          <section id="eligibility" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
            <p className="text-gray-700 leading-relaxed">
              To use our Service, you must be at least 13 years old and have legal capacity to enter into contracts. You confirm that you meet these requirements.
            </p>
          </section>

          <section id="accounts" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users may create accounts to access personalized features. You are responsible for maintaining the confidentiality of your credentials and all activities under your account.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You must notify us immediately of unauthorized use of your account. PsycAi is not responsible for any losses caused by unauthorized use.
            </p>
          </section>

          <section id="acceptable-use" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use PsycAi responsibly and lawfully. Prohibited activities include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Illegal activities</li>
              <li>Violations of intellectual property rights</li>
              <li>Harassment, abuse, or harm</li>
              <li>Distribution of malware or harmful code</li>
              <li>Attempts to breach security</li>
            </ul>
          </section>

          <section id="user-content" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By posting or sharing content, you grant PsycAi a license to use, modify, and distribute it. You are responsible for the legality and appropriateness of your content.
            </p>
          </section>

          <section id="intellectual-property" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, trademarks, and technology on PsycAi are owned or licensed by us. Unauthorized use is prohibited.
            </p>
          </section>

          <section id="third-party" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PsycAi may link to or integrate third-party services. We are not responsible for their content or privacy practices.
            </p>
          </section>

          <section id="privacy" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Privacy Policy explains how we collect and handle your personal information. Please review it carefully.
            </p>
            <Link href="/privacy" className="text-violet-600 hover:text-violet-700">Read our Privacy Policy</Link>
          </section>

          <section id="payments" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Payments and Billing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If applicable, payment terms will be described when you purchase services. All payments are non-refundable unless stated otherwise.
            </p>
          </section>

          <section id="disclaimers" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Service is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including fitness for a particular purpose.
            </p>
          </section>

          <section id="limitation" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PsycAi shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the Service.
            </p>
          </section>

          <section id="indemnification" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify and hold harmless PsycAi and its affiliates from any claims, damages, or expenses arising from your violation of these Terms or misuse of the Service.
            </p>
          </section>

          <section id="termination" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may terminate or suspend your account or access to the Service at our discretion for violation of these Terms or other reasons.
            </p>
          </section>

          <section id="governing-law" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where PsycAi is established, without regard to conflict of law principles.
            </p>
          </section>

          <section id="dispute-resolution" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any disputes arising under these Terms shall be resolved through binding arbitration or through the courts of competent jurisdiction as applicable.
            </p>
          </section>

          <section id="changes" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update or change these Terms at any time. Any changes will be posted here with an updated effective date. Your continued use of the Service indicates acceptance of those changes.
            </p>
          </section>

          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-sm">
                <strong>Email:</strong> <a href="mailto:support@psycai.site" className="text-violet-600 hover:text-violet-700">support@psycai.site</a><br />
                <strong>Address:</strong> PsycAi Support Team<br />
                <strong>Website:</strong> <Link href="/contact" className="text-violet-600 hover:text-violet-700">Contact Form</Link>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-8 mt-12">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 PsycAi. All rights reserved.</p>
              <p className="mt-2">
                <Link href="/privacy" className="text-violet-600 hover:text-violet-700 mr-4">Privacy Policy</Link>
                <Link href="/contact" className="text-violet-600 hover:text-violet-700">Contact Us</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}
