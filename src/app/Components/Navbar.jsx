// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Add Room", href: "/add-room" },
  { name: "My Listings", href: "/my-listings" },
  { name: "My Bookings", href: "/my-bookings" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-50 px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FiBookOpen className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">Study <span className="text-blue-600">Nook</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}

        <div className="hidden md:flex items-center gap-5">
          <Link href={'/profile'} 
           className="text-gray-700 hover:text-blue-600 font-medium transition-colors" 
          >Profile</Link>
          <Link
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            SignUp
          </Link>
           
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-200" />
          <Link href={'/profile'}>Profile</Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Login
          </Link>

           <Link
            href="/signup"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            SignUp
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;