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
    <div className="w-full max-w-[300px] h-full flex flex-col rounded-3xl bg-[#fdfaf5] border border-[#ece4d8] overflow-hidden shadow-sm">
      {/* Image */}
      <div className="p-2">
        <div className="relative h-[190px] w-full rounded-t-2xl overflow-hidden bg-[#f0ebe0]">
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
          <h3 className="text-[#2b2b28] text-lg font-semibold leading-snug line-clamp-1">
            {name}
          </h3>
          <span className="shrink-0 rounded-full bg-blue-100 text-[#155dfc] text-sm font-medium px-2.5 py-1">
            {hourlyRate?.label || "N/A"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#8a8578] leading-relaxed line-clamp-2 min-h-[2.6rem]">
          {description}
        </p>

        {/* Meta rows */}
        <div className="flex flex-col gap-1.5 text-sm text-[#6f6b5f]">
          <div className="flex items-center gap-2">
            <FiLayers size={15} className="text-[#a39d8c]" />
            <span>{floor || "N/A"}</span>
            <span className="text-[#d9d3c4] mx-1">•</span>
            <FiUsers size={15} className="text-[#a39d8c]" />
            <span>{seatCapacity?.label || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDollarSign size={15} className="text-[#a39d8c]" />
            <span>{totalBookings ?? 0} bookings</span>
          </div>
        </div>

        {/* Amenity chips */}
        <div className="flex flex-wrap gap-2 min-h-[34px]">
          {visibleAmenities.map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#f6ddb9] text-[#8a5a2b] text-xs font-medium px-3 py-1.5"
            >
              {item}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="rounded-full bg-[#f0ebe0] text-[#8a8578] text-xs font-medium px-3 py-1.5">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* View Details */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-auto w-full text-center rounded-md border border-[#e5ddcd] bg-white   transition-colors text-[#2b2b28] text-sm font-semibold py-2.5 block hover:text-white hover:bg-[#155dfc]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}