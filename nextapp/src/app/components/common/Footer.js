"use client";

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#081707] text-[#F5F7F2] py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <img
            src="/images/logo-white.png" // Replace with your logo image
            alt="Logo"
            className="w-16 h-16 mx-auto md:mx-0 mb-4 shadow-md"
          />
          <h3 className="text-xl font-bold">WildShield</h3>
          <p className="text-sm text-[#B2CDA0] mt-2 max-w-sm mx-auto md:mx-0">
            Protecting nature and wildlife through innovation, transparency, and community-driven solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/aboutus", label: "About Us" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[#B2CDA0] hover:text-[#6DBE47] transition duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-6">
            {[
              { href: "https://facebook.com", icon: <FaFacebook size={24} /> },
              { href: "https://twitter.com", icon: <FaTwitter size={24} /> },
              { href: "https://instagram.com", icon: <FaInstagram size={24} /> },
              { href: "https://linkedin.com", icon: <FaLinkedin size={24} /> },
            ].map(({ href, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B2CDA0] hover:text-[#6DBE47] transition duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-[#6DBE47] pt-6 text-center">
        <p className="text-sm text-[#B2CDA0]">
          &copy; {new Date().getFullYear()} WildShield. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
