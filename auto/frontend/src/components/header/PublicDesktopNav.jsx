import React from "react";
import { NavLink } from "react-router-dom";
import { publicNavLinks } from "./publicnav.config";

export default function DesktopNav() {
  return (
    <div className="flex items-center gap-8">
      {publicNavLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `text-base font-semibold tracking-wide transition-all duration-300 ${
              isActive
                ? "text-cyan-300"
                : "text-white/90 hover:text-cyan-300"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
