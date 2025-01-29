"use client";

import Chatbot from "./components/common/Chatbot";
import { useState, useEffect } from "react";
import Loader from "./components/common/Loader";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Sidebar = ({ isOpen, toggleMenu }) => (
  <div
    className={`fixed h-full w-16 bg-black flex flex-col items-center pt-4 transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? "translate-x-0" : "-translate-x-16"
    }`}
  >
    {/* Logo Section */}
    <Link href="/" className="mb-8">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <img src="../../favicon.ico" alt="logo" className="w-8 h-8" />
      </div>
    </Link>

    {/* Navigation Icons */}
    <ul className="space-y-6">
      <li className="group relative">
        <Link href="/" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">🐾</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Home
        </span>
      </li>
      <li className="group relative">
        <Link href="/report" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">📊</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Report
        </span>
      </li>
      <li className="group relative">
        <Link href="/community" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">🌍</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Community
        </span>
      </li>
      <li className="group relative">
        <Link href="/resources" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">📚</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Resources
        </span>
      </li>
      <li className="group relative">
        <Link href="/contact" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">📞</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Contact
        </span>
      </li>
      <li className="group relative">
        <Link href="/login" className="flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full">
          <span className="w-6 h-6 group-hover:text-black text-white">🔑</span>
        </Link>
        <span className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-1 rounded-md shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Login/Sign Up
        </span>
      </li>
    </ul>

    {/* Toggle Button */}
    <div
      className="absolute bottom-4 text-white cursor-pointer flex items-center justify-center w-12 h-12 bg-black hover:bg-white rounded-full"
      onClick={toggleMenu}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = [
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=1080&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1604417389023-3018ace0afbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdpbGRsaWZlfGVufDB8MHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1588878497864-24269ed778ba?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1606795614647-ac52e8ea4565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYxfHx3aWxkbGlmZXxlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1518443855757-dfadac7101ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="relative h-screen z-0">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />

        {/* Sidebar Toggle Button */}
        <div className="absolute top-4 left-4 text-white cursor-pointer z-50" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* Main Section */}
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          {/* Foreground Content */}
          <motion.div
            className="relative z-20 flex flex-col justify-center items-center h-full px-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold mb-6 tracking-wide">WildShield</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              interdum suscipit dolor, non facilisis nisi varius in.
            </p>
            <button
              className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition duration-300"
            >
              See the Photo Gallery
            </button>
          </motion.div>
        </div>

        {/* Additional Content Section */}
        <div className="relative h-screen flex items-center justify-center bg-black text-white">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-4xl font-semibold mb-4">Discover Nature</h2>
            <p className="text-lg leading-relaxed">
              Explore the beauty of wildlife and immerse yourself in the wonders
              of nature through stunning imagery and captivating stories.
            </p>
          </motion.div>
        </div>
      </div>

      <Chatbot />
    </>
  );
}
