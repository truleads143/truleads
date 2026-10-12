import React from 'react';
import { Link } from 'react-router-dom';
// Optional: If you use Lucide icons, you can import ArrowLeft
// import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Navigation */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            
            {/* Header */}
            <header className="border-b border-gray-100 pb-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Privacy Policy for Insurify Healthcare
              </h1>
              <p className="text-gray-600 leading-relaxed">
                At <span className="font-semibold text-blue-600">TruHealthInsurance</span>, accessible from www.truhealthinsurance.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by insurifyhealthcare.com and how we use it.
              </p>
            </header>

            <div className="space-y-10 text-gray-700 leading-7">
              {/* Consent Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Consent</h2>
                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
              </section>

              {/* Information Collection */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Information we collect</h2>
                <p className="mb-4">
                  The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Direct Contact:</strong> We may receive your name, email address, phone number, and message contents.</li>
                  <li><strong>Account Registration:</strong> We may ask for items such as name, company name, address, email, and telephone number.</li>
                </ul>
              </section>

              {/* How we use information */}
              <section className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-3">How we use your information</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-800 text-sm">
                  <li>• Provide and maintain our website</li>
                  <li>• Improve and personalize experience</li>
                  <li>• Understand and analyze usage</li>
                  <li>• Develop new products and features</li>
                  <li>• Fraud prevention and security</li>
                  <li>• Direct email correspondence</li>
                </ul>
              </section>

              {/* Technical Details */}
              <section className="grid grid-cols-1 md:gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Log Files</h2>
                  <p className="text-sm">
                    We follow a standard procedure of using log files to analyze trends and administer the site. This includes IP addresses, browser types, and date/time stamps.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
                  <p className="text-sm">
                    We use ‘cookies’ to store information including visitors’ preferences and pages accessed to optimize the user experience.
                  </p>
                </div>
              </section>

              {/* Legal Rights */}
              <section className="space-y-6 pt-6 border-t border-gray-100">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">CCPA Privacy Rights</h2>
                  <p className="text-sm">California consumers have the right to request disclosure, deletion, and to opt-out of the sale of personal data.</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">GDPR Protection Rights</h2>
                  <p className="text-sm">Every user is entitled to the right to access, rectification, erasure, and data portability.</p>
                </div>
              </section>

              {/* Children's Info */}
              <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
                <h2 className="text-xl font-semibold text-yellow-900 mb-3">Children’s Information</h2>
                <p className="text-yellow-800 text-sm">
                  We do not knowingly collect information from children under 13. Please contact us immediately if you believe such information exists in our records.
                </p>
              </section>
            </div>

            {/* Bottom Navigation & Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-blue-600 font-medium flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Homepage
              </Link>
              <p className="text-gray-400 text-xs text-center">
                © {new Date().getFullYear()} TruHealthInsurance. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;