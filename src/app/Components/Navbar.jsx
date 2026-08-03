"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiBookOpen, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Add Room", href: "/add-room" },
  { name: "My Listings", href: "/my-listings" },
  { name: "My Bookings", href: "/my-bookings" },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 dark:bg-blue-500 p-2 rounded-xl shadow-md shadow-blue-600/20 dark:shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FiBookOpen className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Study <span className="text-blue-600 dark:text-blue-400">Nook</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1 bg-gray-100/70 dark:bg-gray-800/70 rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-700 font-medium text-sm px-4 py-1.5 rounded-full transition-all"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <ul className="hidden md:flex items-center gap-5">
          <li>
             <ThemeToggle />
          </li>
          <li>
            <Link
              href="/profile"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors"
            >
              Profile
            </Link>
          </li>

          {isPending ? (
            <li className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ) : user ? (
            <>
              <li>
                <Image
                  referrerPolicy="no-referrer"
                  src={user.image || "/assets/default-avatar.png"}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
                  height={40}
                  width={40}
                  priority
                />
              </li>
              <li>
                <Button
                  onPress={handleSignOut}
                  color="danger"
                  variant="bordered"
                  className="rounded-full border-red-500 dark:border-red-400 dark:text-red-400 font-medium"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 font-medium text-sm px-4 py-2 rounded-full transition-colors shadow-sm shadow-blue-600/30 dark:shadow-blue-500/30"
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-1 px-2 pb-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-200/60 dark:border-gray-800/60 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li className="px-2 py-1">
            <hr className="border-gray-200 dark:border-gray-700" />
          </li>

          <li>
             <ThemeToggle />
          </li>

          <li>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              Profile
            </Link>
          </li>

          {isPending ? (
            <li className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mx-4 my-2" />
          ) : user ? (
            <>
              <li className="flex items-center gap-2 px-4 py-2">
                <Image
                  referrerPolicy="no-referrer"
                  src={user.image || "/assets/default-avatar.png"}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
                  height={32}
                  width={32}
                  priority
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name}</span>
              </li>
              <li className="px-4">
                <Button
                  onPress={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  color="danger"
                  variant="solid"
                  className="rounded-xl w-full"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block bg-blue-600 dark:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-xl mx-2 text-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;