"use client";

import Chatbot from "./components/common/Chatbot";
import { useState, useEffect } from "react";
import Loader from "./components/common/Loader";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const imageUrls = [
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=1080&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1604417389023-3018ace0afbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1588878497864-24269ed778ba?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1606795614647-ac52e8ea4565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1518443855757-dfadac7101ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-60 backdrop-blur-md"
            : "bg-transparent"
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

      {/* Main Content */}
      <main className="flex-grow">
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative z-20 flex flex-col justify-center items-center h-full px-8 text-center text-white">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">WildShield</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Explore the beauty of wildlife and immerse yourself in the wonders of nature.
            </p>
            <button className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300">
              See the Photo Gallery
            </button>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="relative h-screen flex items-center justify-center bg-[#D8E3A6] text-[#081707]">
          <div className="max-w-3xl text-center">
            <h2 className="text-4xl font-semibold mb-4">Discover Nature</h2>
            <p className="text-lg leading-relaxed">
              Explore the wonders of wildlife through stunning imagery and captivating stories.
            </p>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
