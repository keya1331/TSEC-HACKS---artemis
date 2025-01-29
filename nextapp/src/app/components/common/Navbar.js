"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-60 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="../../favicon.ico"
          alt="logo"
          className="w-10 h-10"
        />
        <span className="text-lg font-bold tracking-wide text-white">
          WildShield
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-sm sm:text-base text-white">
        {[
          { href: "/", label: "HOME" },
          { href: "/nature", label: "REPORT" },
          { href: "/animals", label: "COMMUNITY" },
          { href: "/fashion", label: "RESOURCES" },
          { href: "/travel", label: "ABOUT US" },
          { href: "/culture", label: "CONTACT US" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-[#6DBE47] transition duration-300"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
