import React, { useState } from 'react';
import { Shield, Phone, Lock, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TCPA() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* TCPA Disclaimer Section */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="bg-red-600 text-white p-4 flex items-center gap-3">
            <Phone className="w-6 h-6" />
            <h2 className="text-xl font-bold">TCPA Disclaimer</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800 mb-2">IMPORTANT CONSENT NOTICE</p>
                  <p className="text-sm text-red-700">
                    By calling or using our website, you are providing express written consent to be contacted.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700">
              <p className="leading-relaxed mb-4">
                BY CALLING OR USING OUR WEBSITE, I GIVE AFFORDABLE HEALTH OPTIONS, AFFILIATES, AGENTS, ASSIGNS AND SERVICE PROVIDERS EXPRESS WRITTEN PERMISSION TO CONTACT ME AT THE NUMBER AND EMAIL PROVIDED ABOVE, VIA EMAIL, PHONE, TEXT MESSAGE (SMS/MMS) AND/OR CELL PHONE INCLUDING USAGE OF AUTOMATED DIALING EQUIPMENT, ARTIFICIAL INTELLIGENCE AND PRE-RECORDED CALLS AND/OR MESSAGES.
              </p>
              
              <p className="leading-relaxed mb-4">
                YOU FURTHER AGREE THAT "Affordable Health Options" MAY SEND E-MAILS TO YOU AT ANY EMAIL ADDRESS YOU PROVIDE US OR USE OTHER ELECTRONIC MEANS OF COMMUNICATIONS TO THE EXTENT PERMITTED BY LAW.
              </p>
              
              <p className="leading-relaxed font-semibold text-gray-900">
                CONSENT MAY BE REVOKED AT ANY TIME AND BY ANY REASONABLE MEANS.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="bg-indigo-600 text-white p-4 flex items-center gap-3">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-bold">Privacy Policy</h2>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Affordable Health Options (the "Site"). We understand that privacy online is important to users of our Site, especially when conducting business. This statement governs our privacy policies with respect to those users of the Site ("Visitors") who visit without transacting business and Visitors who register to transact business on the Site and make use of the various services offered by Affordable Health Options (collectively, "Services") ("Authorized Customers").
              </p>
            </section>

            {/* Personally Identifiable Information Definition */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                "Personally Identifiable Information"
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Refers to any information that identifies or can be used to identify, contact, or locate the person to whom such information pertains, including, but not limited to, name, address, phone number, fax number, email address, financial profiles, social security number, and credit card information. Personally Identifiable Information does not include information that is collected anonymously (that is, without identification of the individual user) or demographic information not connected to an identified individual.
              </p>
            </section>

            {/* What Information is Collected */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What Personally Identifiable Information is collected?</h3>
              <p className="text-gray-700 leading-relaxed">
                We may collect basic user profile information from all of our Visitors. We collect the following additional information from our Authorized Customers: the names, addresses, phone numbers and email addresses of Authorized Customers, the nature and size of the business, and the nature and size of the advertising inventory that the Authorized Customer intends to purchase or sell.
              </p>
            </section>

            {/* Who Collects Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What organizations are collecting the information?</h3>
              <p className="text-gray-700 leading-relaxed">
                In addition to our direct collection of information, our third party service vendors (such as credit card companies, clearinghouses and banks) who may provide such services as credit, insurance, and escrow services may collect this information from our Visitors and Authorized Customers. We do not control how these third parties use such information, but we do ask them to disclose how they use personal information provided to them from Visitors and Authorized Customers. Some of these third parties may be intermediaries that act solely as links in the distribution chain, and do not store, retain, or use the information given to them.
              </p>
            </section>

            {/* How Information is Used */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How does the Site use Personally Identifiable Information?</h3>
              <p className="text-gray-700 leading-relaxed">
                We use Personally Identifiable Information to customize the Site, to make appropriate service offerings, and to fulfill buying and selling requests on the Site. We may email Visitors and Authorized Customers about research or purchase and selling opportunities on the Site or information related to the subject matter of the Site. We may also use Personally Identifiable Information to contact Visitors and Authorized Customers in response to specific inquiries, or to provide requested information.
              </p>
            </section>

            {/* Information Sharing */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">With whom may the information may be shared?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Personally Identifiable Information about Authorized Customers may be shared with other Authorized Customers who wish to evaluate potential transactions with other Authorized Customers. We may share aggregated information about our Visitors, including the demographics of our Visitors and Authorized Customers, with our affiliated agencies and third party vendors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We also offer the opportunity to "opt out" of receiving information or being contacted by us or by any agency acting on our behalf.
              </p>
            </section>

            {/* Consent to Contact */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How is Personally Identifiable Information used?</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
                <p className="text-sm text-yellow-800">
                  By submitting your information, you consent to receive text messages, emails, and/or calls (may be recorded; and may be direct, autodialed or use prerecorded/artificial voices even if on the Do Not Call list) from Affordable Health Options or our partner real estate professionals and their network of service providers, about your inquiry or the home purchase/rental process.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                Messaging and/or data rates may apply. Consent is not a requirement or condition to receive real estate services.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                You hereby further confirm that submitting your information creates an electronic signature with the same effect as a handwritten signature.
              </p>
            </section>

            {/* Information Storage */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How is Personally Identifiable Information stored?</h3>
              <p className="text-gray-700 leading-relaxed">
                Personally Identifiable Information collected by Affordable Health Options is securely stored and is not accessible to third parties or employees of Affordable Health Options except for use as indicated above.
              </p>
            </section>

            {/* Visitor Choices */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What choices are available to Visitors regarding collection, use and distribution of the information?</h3>
              <p className="text-gray-700 leading-relaxed">
                Visitors and Authorized Customers may opt out of receiving unsolicited information from or being contacted by us and/or our vendors and affiliated agencies by responding to emails as instructed, or by contacting us directly.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Are Cookies Used on the Site?</h3>
              <p className="text-gray-700 leading-relaxed">
                Cookies are used for a variety of reasons. We use Cookies to obtain information about the preferences of our Visitors and the services they select. We also use Cookies for security purposes to protect our Authorized Customers. For example, if an Authorized Customer is logged on and the site is unused for more than 10 minutes, we will automatically log the Authorized Customer off.
              </p>
            </section>

            {/* Login Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How does Affordable Health Options use login information?</h3>
              <p className="text-gray-700 leading-relaxed">
                Affordable Health Options uses login information, including, but not limited to, IP addresses, ISPs, and browser types, to analyze trends, administer the Site, track a user's movement and use, and gather broad demographic information.
              </p>
            </section>

            {/* Partners and Service Providers */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What partners or service providers have access to Personally Identifiable Information from Visitors and/or Authorized Customers on the Site?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Affordable Health Options has entered into and will continue to enter into partnerships and other affiliations with a number of vendors. Such vendors may have access to certain Personally Identifiable Information on a need to know basis for evaluating Authorized Customers for service eligibility. Our privacy policy does not cover their collection or use of this information.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We will disclose Personally Identifiable Information in order to comply with a court order or subpoena or a request from a law enforcement agency to release information. We will also disclose Personally Identifiable Information when reasonably necessary to protect the safety of our Visitors and Authorized Customers.
              </p>
            </section>

            {/* Security */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How does the Site keep Personally Identifiable Information secure?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                All of our employees are familiar with our security policy and practices. The Personally Identifiable Information of our Visitors and Authorized Customers is only accessible to a limited number of qualified employees who are given a password in order to gain access to the information. We audit our security systems and processes on a regular basis.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Sensitive information, such as credit card numbers or social security numbers, is protected by encryption protocols, in place to protect information sent over the Internet.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm italic">
                While we take commercially reasonable measures to maintain a secure site, electronic communications and databases are subject to errors, tampering and break-ins, and we cannot guarantee or warrant that such events will not take place and we will not be liable to Visitors or Authorized Customers for any such occurrences.
              </p>
            </section>

            {/* Correcting Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">How can Visitors correct any inaccuracies in Personally Identifiable Information?</h3>
              <p className="text-gray-700 leading-relaxed">
                Visitors and Authorized Customers may contact us to update Personally Identifiable Information about them or to correct any inaccuracies by emailing us.
              </p>
            </section>

            {/* Deleting Information */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Can a Visitor delete or deactivate Personally Identifiable Information collected by the Site?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We provide Visitors and Authorized Customers with a mechanism to delete/deactivate Personally Identifiable Information from the Site's database by contacting us. However, because of backups and records of deletions, it may be impossible to delete a Visitor's entry without retaining some residual information.
              </p>
              <p className="text-gray-700 leading-relaxed">
                An individual who requests to have Personally Identifiable Information deactivated will have this information functionally deleted, and we will not sell, transfer, or use Personally Identifiable Information relating to that individual in any way moving forward.
              </p>
            </section>

            {/* Policy Changes */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">What happens if the Privacy Policy Changes?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We will let our Visitors and Authorized Customers know about changes to our privacy policy by posting such changes on the Site.
              </p>
              <p className="text-gray-700 leading-relaxed">
                However, if we are changing our privacy policy in a manner that might cause disclosure of Personally Identifiable Information that a Visitor or Authorized Customer has previously requested not be disclosed, we will contact such Visitor or Authorized Customer to allow such Visitor or Authorized Customer to prevent such disclosure.
              </p>
            </section>

            {/* Links */}
            <section>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Links</h3>
              <p className="text-gray-700 leading-relaxed">
                Affordable Health Options contains links to other web sites. Please note that when you click on one of these links, you are moving to another web site. We encourage you to read the privacy statements of these linked sites as their privacy policies may differ from ours.
              </p>
            </section>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 bottom-4">
          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="accept"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              I have read and agree to the Privacy Policy and TCPA Disclaimer. I understand that by providing my contact information, I consent to be contacted via phone, text, and email, including through automated dialing systems.
            </label>
          </div>
          
          <Link
            disabled={!accepted}
            className={`flex justify-center w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              accepted
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            to='/'
          >
            {accepted ? 'Continue to Website' : 'Accept to Continue'}
          </Link>
        </div>
      </div>
    </div>
  );
}