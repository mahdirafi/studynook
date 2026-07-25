// components/Hero.jsx
"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    image: "/hero-1.jpg",
    subtitle: "Learn Without Limits",
    title: "Unlock Your Potential With Expert-Led Courses",
    paragraph:
      "Join thousands of learners mastering new skills through hands-on courses taught by industry professionals. Learn at your own pace, anytime, anywhere.",
  },
  {
    image: "/hero-2.jpg",
    subtitle: "Grow Your Career",
    title: "Build Real Skills That Employers Actually Want",
    paragraph:
      "From coding to design to business — get access to practical, project-based learning that prepares you for the real world.",
  },
  {
    image: "/hero-3.jpg",
    subtitle: "Learn Anywhere",
    title: "Your Classroom, Wherever You Are",
    paragraph:
      "Study on your phone, tablet, or laptop. Download lessons and learn offline whenever it's convenient for you.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => setCurrent(index);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Outer wrapper - arrows sit on the edges of this, not just the image */}
        <div className="relative">
          {/* Prev/Next Arrows - positioned on the main container edges */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-blue-600 hover:text-white text-gray-800 p-3 rounded-full shadow-lg transition-colors"
            aria-label="Previous slide"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-blue-600 hover:text-white text-gray-800 p-3 rounded-full shadow-lg transition-colors"
            aria-label="Next slide"
          >
            <FiChevronRight size={22} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Image Slider */}
            <div className="relative w-full h-[320px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl">
              {slides.map((s, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Dots */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === current ? "w-6 bg-white" : "w-2 bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 bg-blue-200 border border-blue-400/40 text-blue-600 text-sm font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full w-[37%]">
              <span className="w-1 h-1.5 rounded-full bg-blue-600"></span>
              {slide.subtitle}
            </span>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight transition-all duration-500">
                {slide.title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
                {slide.paragraph}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <Button
                  as={Link}
                  href="/courses"
                  className="bg-blue-600 text-white font-semibold rounded-full px-7 py-6 flex items-center gap-2"
                >
                  Get Started
                  <FiArrowRight size={18} />
                </Button>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;