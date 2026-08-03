 'use client'
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiStar, FiUsers } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-b from-blue-50/60 via-white to-white py-14 md:py-24 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-blue-200/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-32 w-[350px] h-[350px] bg-indigo-200/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Learn Without Limits
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Unlock Your Potential With{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg">
              Join thousands of learners mastering new skills through
              hands-on courses taught by industry professionals. Learn at
              your own pace, anytime, anywhere.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Button
                as={Link}
                href="/courses"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-7 py-6 flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-colors"
              >
                Get Started
                <FiArrowRight size={18} />
              </Button>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-3 transition-colors"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"].map(
                    (img, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative"
                      >
                        <Image
                          src={img}
                          alt="learner"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  10k+ learners
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  4.9/5
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Single Image */}
          <div className="relative">
            <div className="relative w-full h-[320px] md:h-[460px] rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 ring-1 ring-black/5">
              <Image
                src="/hero-1.jpg"
                alt="Students learning together"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="hidden md:flex absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-4 items-center gap-3">
              <div className="bg-blue-100 p-2.5 rounded-xl">
                <FiUsers className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg leading-none">
                  500+
                </p>
                <p className="text-gray-500 text-xs mt-0.5">Study Rooms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;