import React, { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut as authLogout } from "../../store/slices"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const URL=import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.get(
        `${URL}/api/employee/logout`,
        { withCredentials: true }
      );
      setShowLogoutModal(false);
      dispatch(authLogout());
      navigate("/employee/login");
    } catch (err) {
      console.alert("Logout failed", err);
    }
  };

  return (
    <>
      <header className="shadow top-0 z-50 sticky">
        <nav className="relative bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] py-4 transition-all duration-500">

          {/* top glow */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

          <div className="relative flex items-center justify-between max-w-7xl mx-auto px-4 lg:px-6">

            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif tracking-wide flex flex-col lg:flex-row">
                <span className="italic font-light">TruAuto</span>
                <span className="font-bold not-italic">Insurance</span>
              </h1>
            </div>

            {/* DESKTOP ICONS */}
            <div className="hidden lg:flex items-center gap-5">

              {/* Profile */}
              <button
                title="Profile"
                className="
                  w-11 h-11 rounded-full
                  bg-white/15
                  flex items-center justify-center
                  hover:bg-white/25
                  transition-all duration-200
                "
              >
                <User size={22} className="text-white" />
              </button>

              {/* Logout */}
              <button
                title="Logout"
                onClick={() => setShowLogoutModal(true)}
                className="
                  w-11 h-11 rounded-full
                  bg-red-500/20
                  flex items-center justify-center
                  hover:bg-red-500/30
                  transition-all duration-200
                "
              >
                <LogOut size={22} className="text-red-200" />
              </button>

            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="lg:hidden text-white p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              aria-label="Menu"
            >
              ☰
            </button>

            {/* MOBILE DROPDOWN */}
            {isMenuOpen && (
              <div className="absolute top-full right-4 mt-4 lg:hidden">
                <div className="bg-[#0f3f7a] rounded-2xl shadow-xl border border-white/10 px-6 py-5 space-y-4 text-white">

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10"
                  >
                    <User size={20} />
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500/20"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>

                </div>
              </div>
            )}

          </div>
        </nav>
      </header>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">

          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-xl px-8 py-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-2">
              You sure want to logout?
            </h2>

            <p className="text-gray-500 text-sm mb-6">
              You’ll be signed out from your account.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                No
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
