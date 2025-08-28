import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
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
              <li><a href="#introduction" className="text-violet-600 hover:text-violet-700">Introduction</a></li>
              <li><a href="#information-we-collect" className="text-violet-600 hover:text-violet-700">Information We Collect</a></li>
              <li><a href="#how-we-use-information" className="text-violet-600 hover:text-violet-700">How We Use Your Information</a></li>
              <li><a href="#google-analytics" className="text-violet-600 hover:text-violet-700">Google Analytics & Google Signals</a></li>
              <li><a href="#cookies" className="text-violet-600 hover:text-violet-700">Cookies and Tracking Technologies</a></li>
              <li><a href="#information-sharing" className="text-violet-600 hover:text-violet-700">Information Sharing and Disclosure</a></li>
              <li><a href="#data-retention" className="text-violet-600 hover:text-violet-700">Data Retention</a></li>
              <li><a href="#your-rights" className="text-violet-600 hover:text-violet-700">Your Rights and Choices</a></li>
              <li><a href="#security" className="text-violet-600 hover:text-violet-700">Data Security</a></li>
              <li><a href="#international-transfers" className="text-violet-600 hover:text-violet-700">International Data Transfers</a></li>
              <li><a href="#children" className="text-violet-600 hover:text-violet-700">Children's Privacy</a></li>
              <li><a href="#changes" className="text-violet-600 hover:text-violet-700">Changes to This Policy</a></li>
              <li><a href="#contact" className="text-violet-600 hover:text-violet-700">Contact Us</a></li>
            </ol>
          </div>

          <section id="introduction" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PsycAi ("we," "our," or "us") operates the website <a href="https://psycai.site" className="text-violet-600 hover:text-violet-700">psycai.site</a> (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you disagree with any part of this policy, then you may not access the Service.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Important:</strong> This Privacy Policy complies with the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable privacy laws.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="information-we-collect" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Create an account or register for our services</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Contact us through our contact forms or customer support</li>
              <li>Participate in surveys, contests, or promotions</li>
              <li>Use our AI product recommendation features</li>
              <li>Leave reviews or comments</li>
            </ul>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Types of Personal Information:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information and preferences</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Communications and correspondence with us</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our Service, we automatically collect certain information about your device and usage patterns:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, time spent, click patterns)</li>
              <li>Referral information (how you found our website)</li>
              <li>Location data (general geographic location based on IP address)</li>
              <li>Technical data (screen resolution, device identifiers)</li>
            </ul>
          </section>

          <section id="how-we-use-information" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your personal information for the following purposes:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Service Provision</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Provide and maintain our services</li>
                  <li>Process your requests and transactions</li>
                  <li>Provide customer support</li>
                  <li>Send service-related communications</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Improvement & Analytics</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Analyze usage patterns and trends</li>
                  <li>Improve our services and user experience</li>
                  <li>Develop new features and functionality</li>
                  <li>Conduct research and analytics</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Marketing & Communications</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Send promotional materials and updates</li>
                  <li>Personalize content and recommendations</li>
                  <li>Conduct marketing campaigns</li>
                  <li>Measure marketing effectiveness</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Legal & Security</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Comply with legal obligations</li>
                  <li>Protect against fraud and abuse</li>
                  <li>Enforce our terms of service</li>
                  <li>Maintain security and integrity</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="google-analytics" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Google Analytics & Google Signals</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Important Notice:</strong> Our website uses Google Analytics with Google Signals enabled to collect additional data about user behavior and demographics.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Analytics</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Google Analytics, a web analytics service provided by Google LLC ("Google"). Google Analytics uses cookies and similar technologies to analyze how users interact with our website. The information generated by cookies about your use of our website is transmitted to and stored by Google on servers in the United States.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Google Signals Data Collection</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By activating Google Signals, we allow Google Analytics to collect additional data about both your traffic and standard analytics data to provide enhanced features. When Google Signals is enabled:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Data Collection and Association</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Google Analytics collects visitation information and associates it with Google's information from accounts of signed-in users who have consented to this association for ads personalization purposes. This may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm mb-4">
                <li>End-user location data</li>
                <li>Search history from Google services</li>
                <li>YouTube viewing history</li>
                <li>Data from websites that partner with Google</li>
                <li>Demographic information (age, gender, interests)</li>
              </ul>
              
              <h4 className="font-semibold text-gray-900 mb-2">User Rights and Controls</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                You can control and delete this data through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                <li><a href="https://myactivity.google.com/myactivity" className="text-violet-600 hover:text-violet-700" target="_blank" rel="noopener noreferrer">My Activity</a> - View and delete your Google activity</li>
                <li><a href="https://adssettings.google.com" className="text-violet-600 hover:text-violet-700" target="_blank" rel="noopener noreferrer">Ad Settings</a> - Control ads personalization</li>
                <li>Browser settings - Disable cookies and tracking</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance and Policies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              By enabling Google Signals, we acknowledge that we:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Adhere to the <a href="https://support.google.com/analytics/answer/2700409" className="text-violet-600 hover:text-violet-700" target="_blank" rel="noopener noreferrer">Google Advertising Features Policy</a></li>
              <li>Follow rules around sensitive categories and data collection</li>
              <li>Provide necessary privacy disclosures to users</li>
              <li>Obtain appropriate consent for data association and processing</li>
            </ul>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700">
                <strong>Global Coverage:</strong> Google Signals data collection is enabled in 307 of 307 regions worldwide.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Opt-Out Options</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you prefer not to have your data collected by Google Analytics or Google Signals:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" className="text-violet-600 hover:text-violet-700" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
              <li>Disable cookies in your browser settings</li>
              <li>Use private/incognito browsing mode</li>
              <li>Adjust your <a href="https://adssettings.google.com" className="text-violet-600 hover:text-violet-700" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
            </ul>
          </section>

          <section id="cookies" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and provide personalized content.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Essential</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Required for basic website functionality</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Analytics</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Help us understand website usage and performance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Functional</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Remember your preferences and settings</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Marketing</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Deliver relevant advertisements and content</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="information-sharing" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
            </p>
            
            <div className="grid gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🔧 Service Providers</h4>
                <p className="text-gray-700 text-sm">
                  We share information with trusted third-party service providers who help us operate our business, including hosting, analytics, customer support, and payment processing.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">⚖️ Legal Requirements</h4>
                <p className="text-gray-700 text-sm">
                  We may disclose information when required by law, court order, or to protect our rights, property, or safety, or that of others.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">🤝 Business Transfers</h4>
                <p className="text-gray-700 text-sm">
                  In connection with any merger, sale, or acquisition of all or part of our business, personal information may be transferred to the acquiring entity.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">✅ With Your Consent</h4>
                <p className="text-gray-700 text-sm">
                  We may share information with your explicit consent or at your direction.
                </p>
              </div>
            </div>
          </section>

          <section id="data-retention" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Retention Periods:</h4>
              <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                <li><strong>Account data:</strong> Until account deletion + 30 days</li>
                <li><strong>Analytics data:</strong> 26 months (Google Analytics default)</li>
                <li><strong>Marketing data:</strong> Until unsubscribe + 1 year</li>
                <li><strong>Legal compliance:</strong> As required by applicable law</li>
              </ul>
            </div>
          </section>

          <section id="your-rights" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location and applicable laws, you may have the following rights regarding your personal information:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">GDPR Rights (EU/UK)</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-1 text-sm">
                  <li>Right to access your data</li>
                  <li>Right to rectification</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Rights related to automated decision-making</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">CCPA Rights (California)</h4>
                <ul className="list-disc pl-6 text-green-700 space-y-1 text-sm">
                  <li>Right to know about data collection</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of sale</li>
                  <li>Right to non-discrimination</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to limit use of sensitive data</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-violet-50 border-l-4 border-violet-400 p-4">
              <p className="text-sm text-violet-700">
                <strong>Exercise Your Rights:</strong> To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>
          </section>

          <section id="security" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-600 font-bold">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
                <p className="text-gray-700 text-sm">SSL/TLS encryption for data transmission</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">🛡️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Access Controls</h4>
                <p className="text-gray-700 text-sm">Restricted access to authorized personnel</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">📊</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Monitoring</h4>
                <p className="text-gray-700 text-sm">Regular security assessments and monitoring</p>
              </div>
            </div>
          </section>

          <section id="international-transfers" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. We ensure adequate protection through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Standard contractual clauses approved by the European Commission</li>
              <li>Adequacy decisions for countries with adequate protection</li>
              <li>Your explicit consent where required</li>
            </ul>
          </section>

          <section id="children" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700 text-sm">
                <strong>Age Restriction:</strong> Our services are not intended for individuals under 13 years of age.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children without parental consent, we will take steps to remove that information.
            </p>
          </section>

          <section id="changes" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending email notifications for material changes (if you've provided consent)</li>
              <li>Displaying prominent notices on our website</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section id="contact" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">General Inquiries</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:privacy@psycai.site" className="text-violet-600 hover:text-violet-700">privacy@psycai.site</a></p>
                  <p><strong>Website:</strong> <Link href="/contact" className="text-violet-600 hover:text-violet-700">Contact Form</Link></p>
                  <p><strong>Response Time:</strong> Within 30 days</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:dpo@psycai.site" className="text-violet-600 hover:text-violet-700">dpo@psycai.site</a></p>
                  <p><strong>For:</strong> GDPR/Privacy Rights Requests</p>
                  <p><strong>Languages:</strong> English</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Supervisory Authority:</strong> If you're located in the EU/UK and have concerns about our data practices, you have the right to lodge a complaint with your local data protection authority.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-8 mt-12">
            <div className="text-center text-gray-500 text-sm">
              <p>© 2024 PsycAi. All rights reserved.</p>
              <p className="mt-2">
                <Link href="/terms" className="text-violet-600 hover:text-violet-700 mr-4">Terms of Service</Link>
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
