"use client";

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing from react-icons

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-teal-100 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <img
            src="/images/logo-white.png" // Add your logo image here
            alt="Logo"
            className="w-12 h-12 rounded-full mx-auto md:mx-0 mb-4"
          />
          <h3 className="text-2xl font-semibold text-teal-200">Our Social Cause</h3>
          <p className="text-sm text-teal-200 mt-2 max-w-lg mx-auto md:mx-0">
            We are dedicated to creating sustainable change, empowering communities, and addressing social issues with impactful solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h4 className="text-lg font-semibold text-teal-200">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="text-teal-100 hover:text-teal-200 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" className="text-teal-100 hover:text-teal-200 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="text-teal-100 hover:text-teal-200 transition duration-200">
                Services
              </a>
            </li>
            <li>
              <a href="/predict" className="text-teal-100 hover:text-teal-200 transition duration-200">
                Predict
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="text-teal-100 hover:text-teal-200 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            className="text-teal-100 hover:text-teal-200 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            className="text-teal-100 hover:text-teal-200 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            className="text-teal-100 hover:text-teal-200 transition duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-8 border-t border-teal-600 pt-6 text-center">
        <p className="text-sm text-teal-200">
          &copy; {new Date().getFullYear()} Our Social Cause. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
