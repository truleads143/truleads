import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo_header.png";

const linkClass = "text-[#B9C3D2] hover:text-[#DCC59A] transition-colors";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F38] text-white">
      <div className="h-[3px] bg-[#A67C37]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="md:col-span-1">
            <img src={logo} alt="TruLeads Logo" className="h-16 w-auto mb-5 object-contain" />
            <p className="text-[#B9C3D2] text-sm leading-relaxed">
              Delivering world-class customer support and business solutions. Our team is committed to
              excellence and efficiency for every client.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link to="/query" className={linkClass}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl mb-5 text-white">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className={linkClass}>Customer Support</Link></li>
              <li><Link to="/" className={linkClass}>Technical Support</Link></li>
              <li><Link to="/" className={linkClass}>Back Office Solutions</Link></li>
              <li><Link to="/" className={linkClass}>Telemarketing</Link></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="font-serif text-xl mb-5 text-white">Connect with Us</h3>
            <p className="text-[#B9C3D2] text-sm leading-relaxed mb-5">
              212 N. 2nd St. STE 100<br />
              Richmond, KY 40475<br />
              Email: connect@truleads.agency
            </p>
            <div className="flex gap-3">
              {[
                [FaFacebookF, "#", "Facebook"],
                [FaTwitter, "#", "Twitter"],
                [
                  FaLinkedinIn,
                  "https://www.linkedin.com/company/truleads-llc/",
                  "LinkedIn",
                ],
                [FaInstagram, "https://www.instagram.com/truleadsllc/", "Instagram"],
              ].map(([Icon, href, label]) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-[#3A506E] text-[#B9C3D2] hover:border-[#A67C37] hover:text-[#DCC59A] transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-[#24395A] pt-6 text-center text-[#8796AB] text-xs tracking-wider">
          &copy; {new Date().getFullYear()} TruLeads LLC Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
