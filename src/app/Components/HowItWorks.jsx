// components/HowItWorks.jsx
"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCalendar, FiCheckCircle, FiSearch } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    number: "01",
    title: "Find Your Room",
    description:
      "Browse rooms by location, capacity, and amenities to find your perfect study spot.",
  },
  {
    icon: FiCalendar,
    number: "02",
    title: "Pick a Time Slot",
    description:
      "Choose a date and time that works for you — hourly or full-day bookings available.",
  },
  {
    icon: FiCheckCircle,
    number: "03",
    title: "Confirm & Study",
    description:
      "Get instant confirmation and show up — your room is ready and waiting for you.",
  },
];

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Booking a Room Takes{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            No complicated forms, no waiting — just find, book, and start
            studying in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-9 left-0 right-0 h-px">
            <div
              className={`h-full bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 origin-left transition-transform duration-[1200ms] ease-out ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                style={{ transitionDelay: isVisible ? `${index * 200}ms` : "0ms" }}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Icon circle */}
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-white border-2 border-blue-100 shadow-md shadow-blue-900/5 flex items-center justify-center mb-6 hover:scale-110 hover:border-blue-400 transition-all duration-300">
                  <Icon className="text-blue-600" size={28} />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Button
            as={Link}
            href="/rooms"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-7 py-6 flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-colors"
          >
            Browse Rooms
            <FiArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;