import { DeleteAlert } from "@/app/Components/DeleteAlert";
import { EditModal } from "@/app/Components/EditModals";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiDollarSign,
  FiLayers,
  FiUsers,
} from "react-icons/fi";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });

  // ১. fetch fail check (network/HTTP error, যেমন 404/500)
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef]">
        <p className="text-[#4a473f] text-lg font-medium">
          Could not find any room
        </p>
      </div>
    );
  }

  // ২. আগে room parse করো
  const room = await res.json();

  // ৩. তারপর null check (backend যদি 200 status-এ null/empty পাঠায়)
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef]">
        <p className="text-[#4a473f] text-lg font-medium">
          Could not find any room
        </p>
      </div>
    );
  }

  // ৪. এখন safe-ভাবে destructure করো
  const {
    images,
    name,
    description,
    floor,
    seatCapacity,
    hourlyRate,
    totalBookings,
    listedBy,
    listedAt,
    amenities,
  } = room;

  const formattedDate = listedAt
    ? new Date(listedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-[#faf6ef] px-6 py-8 md:px-12 md:py-10">
      {/* Back link */}
      <Link
        href="/rooms"
        className="inline-flex items-center gap-2 text-[#2b2b28] text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
      >
        <FiArrowLeft size={16} />
        Back
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left column */}
        <div>
          {/* Hero image */}
          <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={images?.[0] || "/placeholder-room.jpg"}
              alt={name || "Room"}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mt-6">
            <h1
              className="text-3xl md:text-4xl font-semibold text-[#2b2b28]"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              {name}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-1.5">
              <FiCheckCircle size={13} />
              {totalBookings ?? 0} bookings
            </span>
          </div>

          <p className="text-sm text-[#a39d8c] mt-1">
            Listed {formattedDate}
          </p>

          <p className="text-[#4a473f] leading-relaxed mt-5">
            {description}
          </p>

          {/* Amenities */}
          <div className="mt-8">
            <h2
              className="text-lg font-semibold text-[#2b2b28] mb-3"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {amenities?.length > 0 ? (
                amenities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#f6ddb9] text-[#8a5a2b] text-sm font-medium px-3.5 py-1.5"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#a39d8c]">কোনো amenity যোগ করা হয়নি।</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Price & booking card */}
          <div className="rounded-2xl bg-white border border-[#ece4d8] p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-emerald-800">
                 $ {hourlyRate?.amount ?? hourlyRate?.value ?? 0}
              </span>
              <span className="text-sm text-[#a39d8c]">per hour</span>
            </div>

            <div className="flex flex-col gap-3 mt-5 text-sm text-[#4a473f]">
              <div className="flex items-center gap-2.5">
                <FiLayers size={15} className="text-[#a39d8c]" />
                <span>{floor || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiUsers size={15} className="text-[#a39d8c]" />
                <span>{seatCapacity?.label || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiDollarSign size={15} className="text-[#a39d8c]" />
                <span>{totalBookings ?? 0} total bookings</span>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition-colors text-white text-sm font-semibold py-3 cursor-pointer">
              <FiCalendar size={16} />
              Book Now
            </button>

            <div className="flex items-center justify-between mx-6 my-4">
              <div>
                <EditModal room={room} />
              </div>
              <div>
                <DeleteAlert room={room} />
              </div>
            </div>
          </div>

          {/* Listed by card */}
          <div className="rounded-2xl bg-white border border-[#ece4d8] p-6 shadow-xl">
            <p className="text-xs tracking-wide text-[#a39d8c] font-medium mb-4">
              LISTED BY
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={listedBy?.avatar || "/default-avatar.png"}
                alt={listedBy?.name || "User"}
                width={80}
                height={80}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-[#2b2b28]">
                  {listedBy?.name || "Unknown"}
                </p>
                <p className="text-sm text-[#a39d8c]">
                  {listedBy?.email || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;