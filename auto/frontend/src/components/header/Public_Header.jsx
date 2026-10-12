import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import DesktopNav from "./PublicDesktopNav";
import SideBar from "./PublicSideBar";

export default function PublicHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="shadow top-0 z-50 sticky">
      <nav className="relative bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] py-4 transition-all duration-500">

        {/* Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

        <div className="relative flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center z-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif tracking-wide flex flex-col lg:flex-row">
              <span className="italic font-light">TruAuto</span>
              <span className="font-bold">Insurance</span>
            </h1>
          </Link>

          {/* Centered Desktop Nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <DesktopNav />
          </div>

          {/* Right Phone (Desktop Only) */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+12102456181 "
              className="group flex items-center gap-2 text-base font-semibold tracking-wide text-white/95 hover:text-cyan-300 transition-all duration-300"
            >
              <Phone size={18} />
              <span>+1 2102456181 </span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white lg:hidden p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            aria-label="Menu"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* Sidebar Component */}
      <SideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </header>
  );
}
