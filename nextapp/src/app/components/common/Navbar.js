import React, { useState } from "react";
import { Menu, X, Home, User, Code, Briefcase } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full bg-[#014d4e17] backdrop-blur-md shadow-lg shadow-teal-600/50 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="../../favicon.ico"
            alt="logo"
            className="w-10 h-10 rounded-full hover:scale-110 transition-transform duration-300"
          />
          <span className="text-lg md:text-xl font-bold text-teal-100 hidden md:block">
            Artemis
          </span>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div
          className="md:hidden text-teal-100 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* Menu Links */}
        <ul
          className={`flex flex-col md:flex-row md:items-center absolute md:static top-14 md:top-0 left-0 w-full md:w-auto bg-teal-950 md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0 md:opacity-100"
          } md:opacity-100 md:flex hidden md:space-x-8 px-4 py-4 md:py-0`}
        >
          <li className="text-teal-100 hover:text-teal-300 transition-colors duration-200">
            <Link href="/" className="flex items-center space-x-2">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li className="text-teal-100 hover:text-teal-300 transition-colors duration-200">
            <Link href="aboutus" className="flex items-center space-x-2">
              <User size={20} />
              <span>About</span>
            </Link>
          </li>
          <li className="text-teal-100 hover:text-teal-300 transition-colors duration-200">
            <Link href="skills" className="flex items-center space-x-2">
              <Code size={20} />
              <span>Services</span>
            </Link>
          </li>
          <li className="text-teal-100 hover:text-teal-300 transition-colors duration-200">
            <Link href="predict" className="flex items-center space-x-2">
              <Briefcase size={20} />
              <span>Predict</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
