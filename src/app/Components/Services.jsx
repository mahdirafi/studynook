// components/Services.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiBookOpen,
  FiClock,
  FiShield,
  FiUsers,
  FiWifi,
  FiZap,
} from "react-icons/fi";

const services = [
  {
    icon: FiBookOpen,
    title: "Curated Study Rooms",
    description:
      "Handpicked quiet spaces designed for focused, distraction-free study sessions.",
    color: "blue",
  },
  {
    icon: FiClock,
    title: "Flexible Booking",
    description:
      "Book by the hour or the day — cancel or reschedule anytime, hassle-free.",
    color: "indigo",
  },
  {
    icon: FiWifi,
    title: "High-Speed Wi-Fi",
    description:
      "Every room comes with reliable, fast internet so your work never slows down.",
    color: "sky",
  },
  {
    icon: FiUsers,
    title: "Group & Solo Spaces",
    description:
      "From private pods to group tables, find the perfect setup for your team or yourself.",
    color: "violet",
  },
  {
    icon: FiShield,
    title: "Verified & Safe",
    description:
      "All rooms are verified for safety, cleanliness, and comfort before listing.",
    color: "emerald",
  },
  {
    icon: FiZap,
    title: "Instant Confirmation",
    description:
      "No waiting — get instant booking confirmation the moment you reserve a slot.",
    color: "amber",
  },
];

const colorMap = {
  blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-500",
  indigo:
    "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500",
  sky: "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 group-hover:bg-sky-600 dark:group-hover:bg-sky-500",
  violet:
    "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 dark:group-hover:bg-violet-500",
  emerald:
    "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500",
  amber:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 dark:group-hover:bg-amber-500",
};

const ServiceCard = ({ service, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const Icon = service.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: isVisible ? `${index * 80}ms` : "0ms" }}
      className={`group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-black/30 hover:-translate-y-1.5 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${colorMap[service.color]}`}
      >
        <Icon
          size={24}
          className="group-hover:text-white transition-colors duration-300"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2.5">
        {service.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
        {service.description}
      </p>

      {/* corner accent */}
      <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 group-hover:scale-150 transition-all duration-300" />
    </div>
  );
};

const Services = () => {
  return (
    <section className="relative w-full bg-gray-50/60 dark:bg-gray-950 py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-100/50 dark:bg-blue-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Study Better
            </span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
            We take care of the space, so you can focus on what matters —
            learning, working, and getting things done.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;