import React, { useState } from "react";
import { Phone } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow top-0 z-50 sticky">
      <nav className="relative bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] py-4 transition-all duration-500">

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

        <div className="relative flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">

          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif tracking-wide flex flex-col lg:flex-row">
              <span className="italic font-light">TruHealth</span>
              <span className="font-bold">Insurance</span>
            </h1>
          </div>

          {/* DESKTOP: Call + Get Plan */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Call */}
            <a
              href="tel:+12102456181"
              className="group flex items-center gap-2 text-base font-semibold tracking-wide text-white/95 hover:text-cyan-300 transition-all duration-300"
            >
              <Phone
                size={18}
                className="opacity-90 group-hover:text-cyan-300 transition-colors duration-300"
              />
              <span className="leading-none">+1 2102456181</span>
            </a>

            {/* Get Plan */}
            <span className="text-base font-semibold tracking-wide text-white/90">
              Get Plan
            </span>
          </div>

          {/* MOBILE: Hamburger */}
          <button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="text-white lg:hidden p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer"
            aria-label="Menu"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0d3768] border-t border-white/10 px-4 py-4 flex justify-center">
          <a
            href="tel:+12102456181"
            className="flex items-center gap-3 text-white font-semibold text-base tracking-wide hover:text-cyan-300 transition-colors duration-300"
          >
            <Phone size={18} />
            <span>+1 2102456181</span>
          </a>
        </div>
      )}
    </header>
  );
}
