import BookingCard from "@/app/Components/BookingCard";
import { DeleteAlert } from "@/app/Components/DeleteAlert";
import { EditModal } from "@/app/Components/EditModals";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle
} from "react-icons/fi";
 

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({headers: await headers()});
  const user = session?.user
  console.log(user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });

 
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] dark:bg-[#15140f]">
        <p className="text-[#4a473f] dark:text-[#c8c2ae] text-lg font-medium">
          Could not find any room
        </p>
      </div>
    );
  }

 
  const room = await res.json();

  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] dark:bg-[#15140f]">
        <p className="text-[#4a473f] dark:text-[#c8c2ae] text-lg font-medium">
          Could not find any room
        </p>
      </div>
    );
  }

 
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
    <div className="min-h-screen bg-[#faf6ef] dark:bg-[#15140f] px-6 py-8 md:px-12 md:py-10 transition-colors">
      {/* Back link */}
      <Link
        href="/rooms"
        className="inline-flex items-center gap-2 text-[#2b2b28] dark:text-[#f2eee2] text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
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
              className="text-3xl md:text-4xl font-semibold text-[#2b2b28] dark:text-[#f2eee2]"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              {name}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1.5">
              <FiCheckCircle size={13} />
              {totalBookings ?? 0} bookings
            </span>
          </div>

          <p className="text-sm text-[#a39d8c] dark:text-[#8a8570] mt-1">
            Listed {formattedDate}
          </p>

          <p className="text-[#4a473f] dark:text-[#c8c2ae] leading-relaxed mt-5">
            {description}
          </p>

          {/* Amenities */}
          <div className="mt-8">
            <h2
              className="text-lg font-semibold text-[#2b2b28] dark:text-[#f2eee2] mb-3"
              style={{ fontFamily: "var(--font-fraunces, serif)" }}
            >
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {amenities?.length > 0 ? (
                amenities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#f6ddb9] dark:bg-[#4a3a20] text-[#8a5a2b] dark:text-[#e8bc82] text-sm font-medium px-3.5 py-1.5"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#a39d8c] dark:text-[#8a8570]"> No Amenents add</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Price & booking card */}
          <div>
            <BookingCard room={room} formattedDate={formattedDate}/>
          </div>

            <div className="flex items-center justify-between mx-3">
              <div>
                <EditModal room={room} />
              </div>
              <div>
                <DeleteAlert room={room}/>
              </div>
          </div>


          {/* Listed by card */}
          <div className="rounded-2xl bg-white dark:bg-[#1e1c16] border border-[#ece4d8] dark:border-[#38352a] p-6 shadow-xl dark:shadow-black/40">
            <p className="text-xs tracking-wide text-[#a39d8c] dark:text-[#8a8570] font-medium mb-4">
              LISTED BY
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={listedBy?.avatar || user?.image}
                alt={listedBy?.name || "User"}
                width={80}
                height={80}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-[#2b2b28] dark:text-[#f2eee2]">
                  {listedBy?.name || user?.name}
                </p>
                <p className="text-sm text-[#a39d8c] dark:text-[#8a8570]">
                  {listedBy?.email || user?.email}
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