import Image from "next/image";
import Link from "next/link";
import { FiDollarSign, FiLayers, FiUsers } from "react-icons/fi";

export default function RoomsCard({ room }) {
  const {
    _id,
    images,
    name,
    description,
    floor,
    seatCapacity,
    hourlyRate,
    totalBookings,
    amenities,
  } = room;

  const safeAmenities = amenities || [];
  const visibleAmenities = safeAmenities.slice(0, 3);
  const extraCount = safeAmenities.length - visibleAmenities.length;

  return (
    <div className="w-full max-w-[300px] h-full flex flex-col rounded-3xl !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.18)] dark:shadow-black/20 dark:hover:shadow-black/30 hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-200">
      {/* Image */}
      <div className="p-2">
        <div className="relative h-[190px] w-full rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={images?.[0] || "/placeholder-room.jpg"}
            alt={name || "Room"}
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 flex flex-col flex-1 gap-3">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="!text-gray-900 dark:!text-gray-100 text-lg font-semibold leading-snug line-clamp-1">
            {name}
          </h3>
          <span className="shrink-0 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-sm font-medium px-2.5 py-1">
            $ {hourlyRate?.amount ?? hourlyRate?.value ?? 0}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 min-h-[2.6rem]">
          {description}
        </p>

        {/* Meta rows */}
        <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FiLayers size={15} className="text-gray-400 dark:text-gray-500" />
            <span>{floor || "N/A"}</span>
            <span className="text-gray-300 dark:text-gray-700 mx-1">•</span>
            <FiUsers size={15} className="text-gray-400 dark:text-gray-500" />
            <span>{seatCapacity?.label || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDollarSign size={15} className="text-gray-400 dark:text-gray-500" />
            <span>{totalBookings ?? 0} bookings</span>
          </div>
        </div>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-2 min-h-[34px]">
          {visibleAmenities.map((item) => (
            <span
              key={item}
              className="rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium px-3 py-1.5"
            >
              {item}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium px-3 py-1.5">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* View Details */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-auto w-full text-center rounded-md border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 transition-colors !text-gray-900 dark:!text-gray-100 text-sm font-semibold py-2.5 block hover:!text-white hover:!bg-blue-600 dark:hover:!bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}