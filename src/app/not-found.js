import Link from "next/link";
import { FiBookOpen, FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B1120] flex items-center justify-center px-6">
      {/* Background gradient blobs - Study Nook blue/indigo */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/20 blur-[100px]" />

      {/* Dotted decoration */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
        {/* Icon badge - matches Study Nook logo mark */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)]">
          <FiBookOpen className="h-12 w-12 text-white" />
        </div>

        {/* 404 */}
        <h1 className="bg-gradient-to-r from-blue-500 via-indigo-500 to-sky-400 bg-clip-text text-[7rem] font-black leading-none tracking-tight text-transparent sm:text-[9rem]">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Looks like this lesson doesn't exist
        </h2>

        <p className="mt-4 max-w-md text-base text-slate-400 sm:text-lg">
          The page you're looking for isn't in our course catalog. It may
          have been moved, renamed, or is still being taught somewhere else.
        </p>

        {/* Status pill */}
        <div className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
          <FiSearch className="h-4 w-4 text-blue-400" />
          <span>Error Code: 404 — Page Not Found</span>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,0.7)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <FiHome className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
            Return Home
          </Link>

          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-3.5 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/10"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}