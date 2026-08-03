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
  //  {#c4a,4}
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token);

  const session = await auth.api.getSession({headers: await headers()});
  const user = session?.user
  console.log(user);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,{
    //  {#c4a,4}
    headers:{
      authorization:`Bearer ${token}`
    }
  }, {
    cache: "no-store",
  });


  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
          Could not find any room
        </p>
      </div>
    );
  }


  const room = await res.json();


  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-8 md:px-12 md:py-10 transition-colors">
      {/* Back link */}
      <Link
        href="/rooms"
        className="inline-flex items-center gap-2 !text-gray-900 dark:!text-gray-100 text-sm font-medium mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <FiArrowLeft size={16} />
        Back
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        {/* Left column */}
        <div>
          {/* Hero image */}
          <div className="relative w-full h-[300px] md:h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20">
            <Image
              src={images?.[0] || "/placeholder-room.jpg"}
              alt={name || "Room"}
              fill
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mt-6">
            <h1 className="text-3xl md:text-4xl font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
              {name}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium px-3 py-1.5">
              <FiCheckCircle size={13} />
              {totalBookings ?? 0} bookings
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Listed {formattedDate}
          </p>

          <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed tracking-wide mt-5">
            {description}
          </p>

          {/* Amenities */}
          <div className="mt-8">
            <h2 className="text-lg font-bold !text-gray-900 dark:!text-gray-100 tracking-tight mb-3">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {amenities?.length > 0 ? (
                amenities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-medium px-3.5 py-1.5"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No amenities added</p>
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
          <div className="rounded-2xl !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20">
            <p className="text-xs tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-4">
              LISTED BY
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={listedBy?.avatar || user?.image}
                alt={listedBy?.name || "User"}
                width={80}
                height={80}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <div>
                <p className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                  {listedBy?.name || user?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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