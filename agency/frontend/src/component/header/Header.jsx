import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom"; // Import NavLink
import logo from "../../assets/logo_header.png"

// Define color palette matching the application theme
const colors = {
    'primary-blue': '#124D95',
    'cyan-200': '#A5F3FC',
    'cyan-300': '#67E8F9',
    'cyan-500': '#06B6D4',
    'gray-100': '#F3F4F6',
};

// Function to determine the NavLink class based on active status (for non-dropdown links)
const navLinkClass = ({ isActive }) =>
    `block py-2 px-1 border-b-2 transition-colors duration-300 text-center text-[13px] font-bold tracking-[0.14em] uppercase
    ${isActive
        ? 'border-[#A67C37] text-[#DCC59A]'
        : 'border-transparent text-white/90 hover:text-[#DCC59A]'
    }`;

// Function for dropdown item class (white background) - IMPROVED SIZE AND HOVER
const dropdownItemClass = (baseClass = "") =>
    `${baseClass} block px-5 py-3 text-sm font-medium transition-colors duration-200
     text-[#0F2A4A] border-l-2 border-transparent hover:border-[#A67C37] hover:bg-[#F6F2EA]`; // Increased padding/text size and nice cyan hover effect

// --- NEW HELPER FUNCTION FOR DROPDOWN BUTTON APPEARANCE ---
const parentDropdownButtonClass = (isClicked, isVisible, colors) => {
    // Base classes
    let classes = `flex items-center gap-1 py-2 px-1 border-b-2 transition-colors duration-300 text-center text-[13px] font-bold tracking-[0.14em] uppercase cursor-pointer`;

    if (isClicked) {
        // Persistent Click State: Bright Cyan BG (cyan-300) to signal "locked"
        classes += ` border-[#A67C37] text-[#DCC59A]`;
    } else if (isVisible) {
        // Hover/Open State (Temporary): Matches standard active NavLink BG (cyan-200)
        classes += ` border-transparent text-[#DCC59A]`;
    } else {
        // Inactive State: Uses the NavLink inactive/hover styles
        classes += ` border-transparent text-white/90 hover:text-[#DCC59A]`;
    }

    return classes;
};


export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Used for mobile only now
    
    // State for desktop hover dropdowns
    const [isVerticalsHovered, setIsVerticalsHovered] = useState(false);
    const [isCompanyHovered, setIsCompanyHovered] = useState(false);
    const [isPlanHovered, setIsPlanHovered] = useState(false); // NEW: Plan Dropdown Hover State
    
    // New state for desktop click persistence
    const [isVerticalsClicked, setIsVerticalsClicked] = useState(false);
    const [isCompanyClicked, setIsCompanyClicked] = useState(false);
    const [isPlanClicked, setIsPlanClicked] = useState(false); // NEW: Plan Dropdown Click State
    
    
    // New states for managing hover delay timeouts
    const [verticalsTimeoutId, setVerticalsTimeoutId] = useState(null);
    const [companyTimeoutId, setCompanyTimeoutId] = useState(null);
    const [planTimeoutId, setPlanTimeoutId] = useState(null); // NEW: Plan Timeout ID
    const HOVER_DELAY = 200; // 200 milliseconds grace period
    
    // for making the scroll stop when sidebar is open
    useEffect(() => {
      if (isSidebarOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    
      // Cleanup (important)
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isSidebarOpen]);
    
    // Mobile click handler
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    // Combined visibility state (open if hovered OR clicked)
    const verticalsVisible = isVerticalsHovered || isVerticalsClicked;
    const companyVisible = isCompanyHovered || isCompanyClicked;
    const planVisible = isPlanHovered || isPlanClicked; // NEW: Plan Visibility

    // --- Desktop Hover/Click Logic ---

    const showDropdown = (setter, timeoutSetter, timeoutId) => {
        // If there's an existing hide timeout, clear it immediately
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutSetter(null);
        }
        // Show the dropdown
        setter(true);
    };

    const hideDropdownWithDelay = (setter, timeoutSetter) => {
        // Set a timeout to hide the dropdown
        const id = setTimeout(() => {
            // Only hide if the user hasn't persistently clicked it open
            if (setter === setIsVerticalsHovered && !isVerticalsClicked) {
                setter(false);
            } else if (setter === setIsCompanyHovered && !isCompanyClicked) {
                setter(false);
            } else if (setter === setIsPlanHovered && !isPlanClicked) { // NEW: Plan Hide Logic
                setter(false);
            }
            timeoutSetter(null);
        }, HOVER_DELAY);
        timeoutSetter(id);
    };

    const handleParentClick = (menu) => {
        let willBeOpen = false;

        // Reset all click states
        setIsVerticalsClicked(false);
        setIsCompanyClicked(false);
        setIsPlanClicked(false);

        // Determine which one to open/close
        if (menu === 'verticals') {
            willBeOpen = !isVerticalsClicked;
            setIsVerticalsClicked(willBeOpen);
        } else if (menu === 'company') {
            willBeOpen = !isCompanyClicked;
            setIsCompanyClicked(willBeOpen);
        } else if (menu === 'plan') { // NEW: Plan Click Logic
            willBeOpen = !isPlanClicked;
            setIsPlanClicked(willBeOpen);
        }

        // Set hovered state to match the click state to force visibility
        setIsVerticalsHovered(menu === 'verticals' && willBeOpen);
        setIsCompanyHovered(menu === 'company' && willBeOpen);
        setIsPlanHovered(menu === 'plan' && willBeOpen);
    };

    // --- Dropdown Data ---
    const verticals = [
        { name: "Affordable Care Act (ACA)", to: "/verticals/aca" },
        { name: "Final Expense", to: "/verticals/fe" },
        { name: "Social Security Disability Insurance", to: "/verticals/ssdi" },
        { name: "Medicare", to: "/verticals/medicare" },
        { name: "Auto Insurance", to: "/verticals/auto-insurance" },
    ];

    const company = [
        { name: "LinkedIn", href: "https://www.linkedin.com/company/truleads-llc/", external: true },
    ];

    // NEW Dropdown Data
    // Used by the mobile "Find your plan" menu (it crashed when this list was commented out)
    const findYourPlan = [
        { name: "Affordable Care Act (ACA)", to: "/subsidizedhealthplan/aca" },
    ];


    // Helper function for smooth desktop dropdown container classes
    const getDropdownContainerClasses = (isHovered) => `
        absolute left-0 mt-3 w-max bg-white py-2 shadow-xl border-t-2 border-[#A67C37] 
        transition-all duration-300 ease-in-out transform origin-top
        ${isHovered
            ? 'visible opacity-100 translate-y-0 max-h-screen'
            : 'invisible opacity-0 -translate-y-2 max-h-0 pointer-events-none'}
    `;


    return (
        <header className="sticky top-0 z-50 shadow-md">
            <nav className="bg-[#0F2A4A] border-b border-[#A67C37]/40 px-4 lg:px-6 py-2.5">
                <div className="flex items-center justify-between max-w-screen-xl mx-auto">

                    {/* LEFT: Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="TruLeads Logo"
                            className="h-16 w-auto object-contain"
                        />
                    </Link>


                    {/* HAMBURGER (Mobile) */}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden text-white text-3xl p-2"
                    >
                        ☰
                    </button>

                    {/* CENTER: Desktop Nav */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex gap-9 items-center">

                            {/* Home NavLink */}
                            <li>
                                <NavLink to="/" className={navLinkClass}>
                                    Home
                                </NavLink>
                            </li>

                            {/* About Us NavLink */}
                            <li>
                                <NavLink to="/about" className={navLinkClass}>
                                    About Us
                                </NavLink>
                            </li>

                            {/* Verticals Dropdown (Hover/Click Logic) */}
                            <li
                                className="relative"
                                // Hover handlers remain for temporary open/close
                                onMouseEnter={() => showDropdown(setIsVerticalsHovered, setVerticalsTimeoutId, verticalsTimeoutId)}
                                onMouseLeave={() => hideDropdownWithDelay(setIsVerticalsHovered, setVerticalsTimeoutId)}
                            >
                                {/* Button uses new class logic */}
                                <button
                                    onClick={() => handleParentClick('verticals')}
                                    className={parentDropdownButtonClass(isVerticalsClicked, verticalsVisible, colors)}
                                >
                                    Verticals ▾
                                </button>
                                <ul
                                    className={getDropdownContainerClasses(verticalsVisible)}
                                    // Dropdown area must also handle hover to cancel hiding
                                    onMouseEnter={() => showDropdown(setIsVerticalsHovered, setVerticalsTimeoutId, verticalsTimeoutId)}
                                    onMouseLeave={() => hideDropdownWithDelay(setIsVerticalsHovered, setVerticalsTimeoutId)}
                                >
                                    {verticals.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.to}
                                                className={dropdownItemClass("whitespace-nowrap rounded-lg")}
                                                // Reset persistent state when a child link is clicked
                                                onClick={() => setIsVerticalsClicked(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Company Dropdown (Hover/Click Logic) */}
                            <li
                                className="relative"
                                // Hover handlers remain for temporary open/close
                                onMouseEnter={() => showDropdown(setIsCompanyHovered, setCompanyTimeoutId, companyTimeoutId)}
                                onMouseLeave={() => hideDropdownWithDelay(setIsCompanyHovered, setCompanyTimeoutId)}
                            >
                                {/* Button uses new class logic */}
                                <button
                                    onClick={() => handleParentClick('company')}
                                    className={parentDropdownButtonClass(isCompanyClicked, companyVisible, colors)}
                                >
                                    Company ▾
                                </button>
                                <ul
                                    className={getDropdownContainerClasses(companyVisible)}
                                    // Dropdown area must also handle hover to cancel hiding
                                    onMouseEnter={() => showDropdown(setIsCompanyHovered, setCompanyTimeoutId, companyTimeoutId)}
                                    onMouseLeave={() => hideDropdownWithDelay(setIsCompanyHovered, setCompanyTimeoutId)}
                                >
                                    {company.map((item) => (
                                        <li key={item.name}>
                                            {item.external ? (
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={dropdownItemClass("rounded-lg")}
                                                    onClick={() => setIsCompanyClicked(false)}
                                                >
                                                    {item.name}
                                                </a>
                                            ) : (
                                                <Link
                                                    to={item.to}
                                                    className={dropdownItemClass("rounded-lg")}
                                                    // Reset persistent state when a child link is clicked
                                                    onClick={() => setIsCompanyClicked(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Query NavLink */}
                            <li>
                                <NavLink to="/query" className={navLinkClass}>
                                    Query
                                </NavLink>
                            </li>

                            {/* NEW: Find your plan Dropdown (Desktop) */}
                            {/* <li
                                className="relative"
                                onMouseEnter={() => showDropdown(setIsPlanHovered, setPlanTimeoutId, planTimeoutId)}
                                onMouseLeave={() => hideDropdownWithDelay(setIsPlanHovered, setPlanTimeoutId)}
                            >
                                <button
                                    onClick={() => handleParentClick('plan')}
                                    className={parentDropdownButtonClass(isPlanClicked, planVisible, colors)}
                                >
                                    Find your plan ▾
                                </button>
                                <ul
                                    className={getDropdownContainerClasses(planVisible)}
                                    onMouseEnter={() => showDropdown(setIsPlanHovered, setPlanTimeoutId, planTimeoutId)}
                                    onMouseLeave={() => hideDropdownWithDelay(setIsPlanHovered, setPlanTimeoutId)}
                                >
                                    {findYourPlan.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.to}
                                                target="_blank"
                                                className={dropdownItemClass("whitespace-nowrap rounded-lg")}
                                                onClick={() => setIsPlanClicked(false)}
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li> */}
                        </ul>
                    </div>

                    {/* RIGHT: Contact Button (Desktop) */}
                    <div className="hidden lg:flex items-center">
                        <Link
                            to="/query"
                            className="btn-gold"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </nav>

            {/* SIDEBAR (Mobile) */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-[#0F2A4A] border-r border-[#A67C37]/40 text-white shadow-lg transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-4 right-4 text-2xl"
                >
                    &times;
                </button>

                {/* Sidebar Links - Improved Spacing */}
                <ul className="flex flex-col mt-16 gap-4 px-6 font-medium">
                    <li><NavLink to="/" onClick={() => setIsSidebarOpen(false)} className="flex justify-between">Home</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setIsSidebarOpen(false)} className="flex justify-between">About Us</NavLink></li>

                    {/* Verticals (Mobile - Click-based) - IMPROVED SEPARATION AND NESTED STYLING */}
                    <li className="">
                        <button
                            onClick={() => toggleDropdown("verticals")}
                            className="w-full text-left flex justify-between  items-center py-2 hover:text-[#DCC59A]"
                        >
                            Verticals {openDropdown === "verticals" ? "▴" : "▾"}
                        </button>
                        {openDropdown === "verticals" && (
                            <div className="mt-2 p-3 rounded-lg bg-[#0B1F38] text-white/90 border-l-2 border-[#A67C37]">
                                <ul className="flex flex-col gap-2 text-sm">
                                    {verticals.map(item => (
                                        <li key={item.name}>
                                            <NavLink
                                                to={item.to}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={({ isActive }) =>
                                                    `block py-1 px-2 rounded-md transition-colors duration-200 ${isActive ? 'text-[#DCC59A] font-semibold' : 'hover:bg-white/10'
                                                    }`
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    {/* Company (Mobile - Click-based) - IMPROVED SEPARATION AND NESTED STYLING */}
                    <li className="">
                        <button
                            onClick={() => toggleDropdown("company")}
                            className="w-full text-left flex justify-between items-center py-2 hover:text-[#DCC59A]"
                        >
                            Company {openDropdown === "company" ? "▴" : "▾"}
                        </button>
                        {openDropdown === "company" && (
                            <div className="mt-2 p-3 rounded-lg bg-[#0B1F38] text-white/90 border-l-2 border-[#A67C37]">
                                <ul className="flex flex-col gap-2 text-sm">
                                    {company.map(item => (
                                        <li key={item.name}>
                                            {item.external ? (
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className="block py-1 px-2 rounded-md transition-colors duration-200 hover:bg-white/10"
                                                >
                                                    {item.name}
                                                </a>
                                            ) : (
                                                <NavLink
                                                    to={item.to}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className={({ isActive }) =>
                                                        `block py-1 px-2 rounded-md transition-colors duration-200 ${isActive ? 'text-[#DCC59A] font-semibold' : 'hover:bg-white/10'
                                                        }`
                                                    }
                                                >
                                                    {item.name}
                                                </NavLink>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    {/* Query NavLink */}
                    <li><NavLink to="/query" onClick={() => setIsSidebarOpen(false)} className="flex justify-between">Query</NavLink></li>

                    {/* NEW: Find your plan (Mobile - Click-based) */}
                    <li className="">
                        <button
                            onClick={() => toggleDropdown("plan")}
                            className="w-full text-left flex justify-between items-center py-2 hover:text-[#DCC59A]"
                        >
                            Find your plan {openDropdown === "plan" ? "▴" : "▾"}
                        </button>
                        {openDropdown === "plan" && (
                            <div className="mt-2 p-3 rounded-lg bg-[#0B1F38] text-white/90 border-l-2 border-[#A67C37]">
                                <ul className="flex flex-col gap-2 text-sm">
                                    {findYourPlan.map(item => (
                                        <li key={item.name}>
                                            <a
                                                href={item.to}
                                                target="_blank"
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={({ isActive }) =>
                                                    `block py-1 px-2 rounded-md transition-colors duration-200 ${isActive ? 'text-[#DCC59A] font-semibold' : 'hover:bg-white/10'
                                                    }`
                                                }
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    <li className="mt-4">
                        <Link
                            to="/query"
                            onClick={() => setIsSidebarOpen(false)}
                            className="btn-gold w-full justify-center"
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Overlay */}
            {
                isSidebarOpen && (
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black opacity-50 z-40"
                    ></div>
                )
            }
        </header >
    );
}