import React from "react";
import { NavLink } from "react-router-dom";
import { Phone, X } from "lucide-react";
import { publicNavLinks } from "./publicnav.config";

export default function SideBar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-linear-to-b from-[#0d3768] via-[#124D95] to-[#0d3768] shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="text-white">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6">
          {publicNavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `text-lg font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-cyan-300"
                    : "text-white/90 hover:text-cyan-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a
            href="tel:+12102456181"
            className="flex items-center gap-3 mt-6 text-white font-semibold hover:text-cyan-300 transition-colors duration-300"
          >
            <Phone size={18} />
            <span>+1 2102456181</span>
          </a>
        </div>
      </div>
    </>
  );
}
