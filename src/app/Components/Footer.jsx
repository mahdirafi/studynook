// components/Footer.jsx
import Link from "next/link";
import {
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
    { name: "Courses", href: "/courses" },
    { name: "Add Course", href: "/add-course" },
    { name: "Dashboard", href: "/dashboard" },
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
  { icon: FiFacebook, href: "https://facebook.com" },
  { icon: FiTwitter, href: "https://twitter.com" },
  { icon: FiInstagram, href: "https://instagram.com" },
  { icon: FiLinkedin, href: "https://linkedin.com" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <FiBookOpen className="text-white" size={22} />
              </div>
              <span className="text-xl font-bold text-white">Study <span className="text-blue-600">Nook</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering learners worldwide with quality courses taught by
              industry experts. Learn anytime, anywhere, at your own pace.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-blue-600 text-gray-300 hover:text-white p-2.5 rounded-full transition-colors duration-300"
                    aria-label="social link"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <FiMapPin className="mt-0.5 shrink-0" size={16} />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiMail className="shrink-0" size={16} />
                <a
                  href="mailto:support@mentora.com"
                  className="hover:text-blue-500 transition-colors"
                >
                  support@mentora.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiPhone className="shrink-0" size={16} />
                <a
                  href="tel:+8801000000000"
                  className="hover:text-blue-500 transition-colors"
                >
                  +880 1000-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
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