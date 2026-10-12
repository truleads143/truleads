import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const legalLinks = [
    { label: "Terms of Service", path: "/terms" },
    { label: "TCPA Compliance", path: "/tcpa" }
  ];

  return (
    <footer className="relative bg-linear-to-b from-gray-900 via-[#0a2647] to-[#050d1a] text-gray-300 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Brand */}
          <div className="group">
            <h3 className="text-white text-xl font-bold bg-linear-to-r from-white via-cyan-100 to-white bg-clip-text mb-2">
              TruAutoInsurance.com
            </h3>
            <p className="text-sm text-gray-400">
              Affordable auto insurance coverages across America.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Quick Links</h4>
            <a 
              href="https://www.truautoinsurify.com/"
              target="_blank" 
              rel="noopener noreferrer"
              className="group/link inline-flex items-center px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <span className="mr-2">🌐</span>
              <span className="text-cyan-400 group-hover/link:text-cyan-300 text-sm">Visit Website</span>
            </a>
          </div>

          {/* Legal */}
          <div className='hidden lg:block'>
            <h4 className="text-white text-lg font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map(({ label, path }, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a href="tel:+12102456181 " className="flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  <span className="mr-2">📞</span>
                  +1 2102456181
                </a>
              </li>
              <li>
                <a href="mailto:connect@truleads.agency" className="flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors break-all">
                  <span className="mr-2">✉️</span>
                  connect@truleads.agency
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Bottom Section */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2026 <span className="text-white">TruAutoInsurance.com</span>. All rights reserved.
          </p>
          
          <p className="text-xs text-gray-500 text-center md:text-left">
            This site is not affiliated with any government agency. Insurance plans are subject to eligibility requirements.
          </p>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"></div>
    </footer>
  );
}

export default Footer;