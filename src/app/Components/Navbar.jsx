"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
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
  const {data : session, isPending} = authClient.useSession();
  const user= session?.user
  console.log(user);

  

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="w-full bg-gray-50 px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-xl">
            <FiBookOpen className="text-white" size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Study <span className="text-blue-600">Nook</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right Side */}
        <ul className="hidden md:flex items-center gap-5">
          <li>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Profile
            </Link>
          </li>

          {isPending ? (
            <li className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <>
              <li>
                <Image
                  referrerPolicy="no-referrer"
                  src={user.image || "/assets/default-avatar.png"}
                  alt={user.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                  height={40}
                  width={40}
                  priority
                />
              </li>
              <li>
                <Button
                  onPress={handleSignOut}
                  color="danger"
                  variant="outline"
                  className="rounded-none border-red-500"
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
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
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
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-4 px-2 pb-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li>
            <hr className="border-gray-200" />
          </li>

          <li>
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Profile
            </Link>
          </li>

          {isPending ? (
            <li className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : user ? (
            <>
              <li className="flex items-center gap-2">
                <Image
                  referrerPolicy="no-referrer"
                  src={user.image || "/assets/default-avatar.png"}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover"
                  height={32}
                  width={32}
                  priority
                />
                <span className="text-gray-700 font-medium">{user.name}</span>
              </li>
              <li>
                <Button
                  onPress={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  color="danger"
                  variant="solid"
                  className="rounded-none"
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
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
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