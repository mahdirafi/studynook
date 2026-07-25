import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaRegCalendar } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';

const CourseCard = ({ course }) => {
  const { _id, thumbnail, price, title, instructor, category, duration } = course;

  return (
    <Card className="group w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:hover:-translate-y-2">
      {/* Image with overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Category badge - top left */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-md backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
          <MdLocationOn className="text-xs sm:text-sm" />
          <span className="max-w-[100px] truncate sm:max-w-[140px]">{category}</span>
        </div>

        {/* Title on image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
          <h2 className="line-clamp-1 text-base font-bold text-white drop-shadow-md sm:text-lg md:text-xl">
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-3.5 sm:gap-3 sm:p-5">
        {/* Instructor */}
        {instructor && (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary sm:h-7 sm:w-7 sm:text-xs">
              {instructor.charAt(0).toUpperCase()}
            </div>
            <span className="truncate text-xs font-medium text-gray-700 sm:text-sm">
              {instructor}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-xs text-gray-600 sm:pt-3 sm:text-sm">
          <div className="flex items-center gap-1.5">
            <FaRegCalendar className="text-primary" />
            <span>{duration}</span>
          </div>
          <div className="text-sm font-semibold text-gray-900 sm:text-base">
            ${price}{' '}
            <span className="text-[10px] font-normal text-gray-500 sm:text-xs">
              / person
            </span>
          </div>
        </div>

        <Link href={`/courses/${_id}`} className="mt-1 w-full">
          <Button
            variant="solid"
            color="primary"
            className="w-full rounded-xl border-2 border-cyan-300  text-sm font-medium transition-transform group-hover:scale-[1.02] sm:text-base"
            endContent={<FiExternalLink />}
          >
            Enroll Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CourseCard;