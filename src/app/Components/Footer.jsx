import Link from "next/link";
import {
  FiArrowRight,
  FiBookOpen,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Bookings", href: "/my-bookings" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 dark:bg-gray-950 text-gray-600 dark:text-gray-300 overflow-hidden border-t border-gray-200 dark:border-transparent">
      {/* Subtle top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      {/* Decorative glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Newsletter Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-2xl px-8 py-7 mb-16 backdrop-blur-sm">
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">
              Stay in the loop
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Get updates on new study rooms and exclusive booking offers.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 bg-white dark:bg-white/5 border border-gray-900/10 dark:border-white/10 rounded-full px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors shrink-0"
            >
              Subscribe
              <FiArrowRight size={15} />
            </button>
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                <FiBookOpen className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Study <span className="text-blue-600 dark:text-blue-500">Nook</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering learners worldwide with quality courses taught by
              industry experts. Learn anytime, anywhere, at your own pace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 hover:bg-blue-600 hover:border-blue-600 text-gray-600 dark:text-gray-300 hover:text-white p-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 dark:bg-blue-400 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 dark:bg-blue-400 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-5 text-sm tracking-wide uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                <span className="bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 p-2 rounded-lg shrink-0">
                  <FiMapPin size={14} />
                </span>
                <span className="mt-1.5">Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <span className="bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 p-2 rounded-lg shrink-0">
                  <FiMail size={14} />
                </span>
                  <a
                    href="mailto:support@studynook.com"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    support@studynook.com
                  </a>
                </li>

              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <span className="bg-gray-900/5 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 p-2 rounded-lg shrink-0">
                  <FiPhone size={14} />
                </span>
                 
                <a
                  href="tel:+8801000000000"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900/10 dark:border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;