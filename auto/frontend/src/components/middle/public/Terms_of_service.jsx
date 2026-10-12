import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FileText, AlertCircle } from 'lucide-react';

export default function TermsOfService() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Terms of Service</h1>
              <p className="text-indigo-100 text-sm">Affordable Health Options</p>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-800 font-semibold">Please Read Carefully</p>
              <p className="text-sm text-yellow-700">Reading and accepting these terms is required for access to our services.</p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="p-6 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">PLEASE READ!</h2>
            <p className="mb-3">
              Affordable Health Options REQUIRES CONSIDERATION FOR AND AS A CONDITION OF ALLOWING YOU ACCESS. 
              READING AND ACCEPTING THE TERMS OF USE AND READING AND ACCEPTING THE PROVISIONS OF THE PRIVACY 
              POLICY OF Affordable Health Options ARE REQUIRED CONSIDERATIONS FOR Affordable Health Options 
              GRANTING YOU THE RIGHT TO VISIT, READ OR INTERACT WITH IT.
            </p>
            <p className="mb-3">
              ALL PERSONS ARE DENIED ACCESS TO THIS SITE UNLESS THEY READ AND ACCEPT THE TERMS OF USE AND THE 
              PRIVACY POLICY. BY VIEWING, VISITING, USING, OR INTERACTING WITH Affordable Health Options OR 
              WITH ANY BANNER, POP-UP, OR ADVERTISING THAT APPEARS ON IT, YOU ARE AGREEING TO ALL THE PROVISIONS 
              OF THIS TERMS OF USE POLICY AND THE PRIVACY POLICY OF Affordable Health Options.
            </p>
            <p className="font-semibold text-red-600">
              ALL PERSONS UNDER THE AGE OF 18 ARE DENIED ACCESS TO Affordable Health Options. IF YOU ARE UNDER 
              18 YEARS OF AGE, IT IS UNLAWFUL FOR YOU TO VISIT, READ, OR INTERACT WITH Affordable Health Options 
              OR ITS CONTENTS IN ANY MANNER.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">PARTIES TO THE TERMS OF USE AGREEMENT</h2>
            <p>
              Visitors, viewers, users, subscribers, members, affiliates, or customers, collectively referred 
              to herein as "Visitors," are parties to this agreement. The website and its owners and/or operators 
              are parties to this agreement, herein referred to as "Website."
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">USE OF INFORMATION FROM THIS WEBSITE</h2>
            <p className="mb-3">
              Unless you have entered into an express written contract with this website to the contrary, visitors, 
              viewers, subscribers, members, affiliates, or customers have no right to use this information in a 
              commercial or public setting; they have no right to broadcast it, copy it, save it, print it, sell it, 
              or publish any portions of the content of this website.
            </p>
            <p>
              Visitor agrees to liquidated damages in the amount of U.S.$100,000 in addition to costs and actual 
              damages for breach of this provision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">OWNERSHIP OF WEBSITE</h2>
            <p>
              The website and its contents are owned or licensed by the website. Material contained on the website 
              must be presumed to be proprietary and copyrighted. Visitors have no rights whatsoever in the site 
              content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">HYPERLINKING PROHIBITED</h2>
            <p className="mb-3">
              Unless expressly authorized by website, no one may hyperlink this site, or portions thereof, to 
              theirs for any reason. You specifically agree to cooperate with the Website to remove or de-activate 
              any such activities and be liable for all damages.
            </p>
            <p>
              You hereby agree to liquidated damages of US $100,000.00 plus costs and actual damages for violating 
              this provision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">DISCLAIMER FOR CONTENTS OF SITE</h2>
            <p>
              The website disclaims any responsibility for the accuracy of the content of this website. Visitors 
              assume the all risk of viewing, reading, using, or relying upon this information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">DISCLAIMER FOR HARM TO COMPUTER</h2>
            <p>
              The website assumes no responsibility for damage to computers or software of the visitor or any 
              person the visitor subsequently communicates with from corrupting code or data that is inadvertently 
              passed to the visitor's computer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">LIMITATION OF LIABILITY</h2>
            <p>
              By viewing, using, or interacting in any manner with this site, Visitor forever waives all right 
              to claims of damage of any and all description based on any causal factor resulting in any possible 
              harm, whether physical or emotional, foreseeable or unforeseeable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">SUBMISSIONS</h2>
            <p>
              Visitor agrees that any communication between Visitor and Website is deemed a submission. All 
              submissions shall become the exclusive property of the Website and may be used, without further 
              permission, for commercial use without additional consideration of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">DISPUTES</h2>
            <p className="mb-3">
              Visitor agrees to use binding arbitration for any claim, dispute, or controversy of any kind arising 
              out of or relating to this purchase, this product, including solicitation issues, privacy issues, 
              and terms of use issues.
            </p>
            <p className="mb-3">
              Arbitration shall be conducted pursuant to the rules of the American Arbitration Association. 
              Hearing will take place in the city or county of the Seller.
            </p>
            <p>
              In no case shall the viewer have the right to go to court or have a jury trial. The arbitrator's 
              decision will be final and binding with limited rights of appeal.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">JURISDICTION AND VENUE</h2>
            <p>
              Viewer agrees that the sole and proper jurisdiction to be the state and city declared in the 
              contact information of the web owner. In the event that litigation is in a federal court, the 
              proper court shall be the closest federal court to the Seller's address.
            </p>
          </section>
        </div>

        {/* Acceptance Section */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="accept"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="accept" className="text-sm text-gray-700">
              I have read and agree to the Terms of Service. I understand that by accessing this website, 
              I am bound by these terms and conditions.
            </label>
          </div>
          
          <Link
            disabled={!accepted}
            className={`flex justify-center w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              accepted
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            to='/'
          >
            {accepted ? 'Continue to Website' : 'Accept Terms to Continue'}
          </Link>
        </div>
      </div>
    </div>
  );
}