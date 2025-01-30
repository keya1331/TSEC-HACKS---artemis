"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const pathname = usePathname();

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    const admin = localStorage.getItem("adminEmail");
    setIsLoggedIn(!!user);
    setIsAdminLoggedIn(!!admin);
  }, [pathname]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const handleAdminLogout = () => {
    localStorage.clear();
    setIsAdminLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 sm:px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-3">
      <img
            src="/images/logo.png" // Replace with your logo image
            alt="Logo"
            className="w-20 h-20 mx-auto md:mx-0 mb-4 shadow-md"
          />
        <span className="text-lg font-bold  tracking-wide text-white">
          WildShield
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Links - Desktop */}
      <ul className="hidden sm:flex space-x-8 text-sm sm:text-base text-white">
        {[
          { href: "/", label: "HOME" },
          { href: "/reports", label: "REPORT" },
          { href: "/community", label: "COMMUNITY" },
          { href: "/features", label: "FEATURES" },
          { href: "/aboutus", label: "ABOUT US" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:text-[#6DBE47] transition duration-300">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* User Login/Signup & Admin Login - Desktop */}
      <div className="hidden sm:flex space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 text-[#BAD799] bg-[#1A5F10] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="px-6 py-2 text-[#BAD799] bg-[#1A5F10] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
          >
            Login / Signup
          </Link>
        )}

        {isAdminLoggedIn ? (
          <button
            onClick={handleAdminLogout}
            className="px-5 py-2 text-white border border-[#BAD799] rounded-full hover:bg-[#BAD799] hover:text-black transition-all duration-300"
          >
            Admin Logout
          </button>
        ) : (
          <Link
            href="/admin/login"
            className="px-5 py-2 text-white border border-[#BAD799] rounded-full hover:bg-[#BAD799] hover:text-black transition-all duration-300"
          >
            Login as Admin
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-black bg-opacity-80 backdrop-blur-md p-6 flex flex-col space-y-4 sm:hidden">
          {[
            { href: "/", label: "HOME" },
            { href: "/reports", label: "REPORT" },
            { href: "/community", label: "COMMUNITY" },
            { href: "/features", label: "FEATURES" },
            { href: "/aboutus", label: "ABOUT US" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-white text-lg text-center hover:text-[#6DBE47] transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Mobile User/Login & Admin Login */}
          <div className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-[#BAD799] bg-[#1A5F10] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="px-6 py-2 text-[#BAD799] bg-[#1A5F10] font-semibold rounded-full shadow-md hover:bg-[#14470D] hover:text-white transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Signup
              </Link>
            )}

            {isAdminLoggedIn ? (
              <button
                onClick={handleAdminLogout}
                className="px-5 py-2 text-white border border-[#BAD799] rounded-full hover:bg-[#BAD799] hover:text-black transition-all duration-300"
              >
                Admin Logout
              </button>
            ) : (
              <Link
                href="/admin/login"
                className="px-5 py-2 text-white border border-[#BAD799] rounded-full hover:bg-[#BAD799] hover:text-black transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login as Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
