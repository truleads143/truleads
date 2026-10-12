import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo_header.png"

export default function Footer() {
  return (
    <footer className="bg-[#124D95] text-white pt-6">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Company Info */}
          <div>
            <img
              src={logo}
              alt="TruLeads Logo"
              className="h-16 w-auto mb-4 object-contain"
            />
            <p className="text-gray-200 text-sm">
              Delivering world-class customer support and business solutions. Our team is committed to excellence and efficiency for all our clients.
            </p>
          </div>


          {/* Quick Links */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cyan-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-cyan-300">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-cyan-300">Privacy Policy</Link></li>
              <li><Link to="/query" className="hover:text-cyan-300">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="">
            <h3 className="text-lg font-semibold mb-2">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cyan-300">Customer Support</Link></li>
              <li><Link to="/" className="hover:text-cyan-300">Technical Support</Link></li>
              <li><Link to="/" className="hover:text-cyan-300">Back Office Solutions</Link></li>
              <li><Link to="/" className="hover:text-cyan-300">Telemarketing</Link></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            {/* <p className="text-gray-200 text-sm mb-4">
              212 N. 2nd St. STE 100, Richmond, KY 40475<br />
              Phone: +1 2102456181<br />
              Email:  connect@truleads.agency
            </p> */}
              <p className="text-gray-200 text-sm mb-4">
              HDFC BANK, Opp.DM Residence, Civil Lines, Bareilly - 243001<br />
              Phone: +91 8127758686<br />
              Email:  connect@truleads.agency
            </p>
            <div className="flex gap-4 mt-1">
              <a href="#" className="hover:text-cyan-300"><FaFacebookF /></a>
              <a href="#" className="hover:text-cyan-300"><FaTwitter /></a>
              <a href="https://www.linkedin.com/in/sameer-sharma-ba7421220?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-cyan-300"><FaInstagram /></a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-500 pt-4 text-center text-gray-300 text-sm pb-3">
          &copy; {new Date().getFullYear()} TruLeads LLC Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}