
import { Button, Link } from '@heroui/react';
import Image from 'next/image';
import { BiArrowBack } from 'react-icons/bi';
import { FaRegCalendar } from 'react-icons/fa';
import { FiCheck, FiUser } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

const CourseDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`, {
    cache: 'no-store',
  });
  const course = await res.json();

  const {
    _id,
    thumbnail,
    price,
    title,
    instructor,
    description,
    category,
    duration,
    highlights,
  } = course;

  return (
    <div className="min-h-screen w-11/12 max-w-7xl mx-auto bg-white">
      {/* ---------- BACK BUTTON ---------- */}
      <div className="flex items-center py-4 sm:py-6">
        <Button variant="outline" asChild size="sm" className="sm:size-md">
          <Link href="/courses" className="flex items-center gap-1.5 shadow-xl sm:gap-2">
            <BiArrowBack />
            <span className="text-xs sm:text-sm">BACK TO COURSES</span>
          </Link>
        </Button>
      </div>

      {/* ---------- BANNER ---------- */}
      <section className="relative h-[220px] w-full overflow-hidden rounded-xl sm:h-[320px] sm:rounded-2xl md:h-[380px] lg:h-[420px]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs">
          <MdLocationOn className="text-xs sm:text-sm" />
          {category}
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <div className="mx-auto grid grid-cols-1 gap-8 py-8 sm:gap-10 sm:py-10 lg:grid-cols-3 lg:gap-12 lg:py-14">
        {/* ---- left: main info ---- */}
        <div className="lg:col-span-2">
          {instructor && (
            <p className="flex items-center gap-1.5 text-xs text-[#0F2438]/50 sm:text-sm">
              <FiUser /> {instructor}
            </p>
          )}

          <h1 className="mt-2 font-serif text-2xl font-medium text-[#0F2438] sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#0F2438]/70 sm:gap-4 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <FaRegCalendar />
              {duration}
            </span>
          </div>

          <div className="mt-6 border-t border-[#0F2438]/10 pt-6 sm:mt-8 sm:pt-8">
            <h2 className="font-serif text-xl font-medium text-[#0F2438] sm:text-2xl">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0F2438]/70 sm:text-[15px]">
              {description ||
                `Learn ${title} from ${instructor || 'an expert instructor'} in this ${duration} course under ${category}.`}
            </p>
          </div>

          {highlights?.length > 0 && (
            <div className="mt-6 border-t border-[#0F2438]/10 pt-6 sm:mt-8 sm:pt-8">
              <h2 className="font-serif text-xl font-medium text-[#0F2438] sm:text-2xl">
                What You'll Learn
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-[#0F2438]/80 sm:text-[15px]"
                  >
                    <FiCheck className="mt-0.5 shrink-0 text-[#1B4B4F]" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ---- right: sticky enroll card ---- */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-[#0F2438]/10 bg-white p-5 shadow-lg sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0F2438] sm:text-3xl">
                ${price}
              </span>
              <span className="text-xs text-[#0F2438]/50 sm:text-sm">/ person</span>
            </div>

            <div className="mt-4 space-y-3 border-t border-[#0F2438]/10 pt-4 text-sm text-[#0F2438]/70 sm:mt-5 sm:pt-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FaRegCalendar /> Duration
                </span>
                <span className="font-medium text-[#0F2438]">{duration}</span>
              </div>
              {instructor && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FiUser /> Instructor
                  </span>
                  <span className="font-medium text-[#0F2438]">{instructor}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MdLocationOn /> Category
                </span>
                <span className="font-medium text-[#0F2438]">{category}</span>
              </div>
            </div>

            <Button
              variant="solid"
              color="primary"
              className="mt-5 w-full rounded-xl text-sm font-medium sm:mt-6 sm:text-base"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;