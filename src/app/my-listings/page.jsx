"use client";
import { authClient } from "@/lib/auth-client";
import { PlusShape } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";

const MyListingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyRooms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/my-listings?email=${user?.email}`
        );
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Failed to fetch my listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, [user?.email]);

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl shadow-md shadow-blue-600/20 dark:shadow-blue-500/20">
              <FiHome className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
                My Listings
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Rooms you currently host on StudyNook.
              </p>
            </div>
          </div>
          <Link href="/add-room">
            <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-full text-white font-medium shadow-sm shadow-blue-600/30 dark:shadow-blue-500/30 px-5">
              <PlusShape /> Add Room
            </Button>
          </Link>
        </div>

        {/* Room list */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden !bg-white dark:!bg-gray-900 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-100 dark:bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 !bg-white dark:!bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="bg-blue-50 dark:bg-gray-800 p-5 rounded-full">
              <FiHome className="text-blue-500 dark:text-blue-400" size={32} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              You have not listed any rooms yet.
            </p>
            <Link href="/add-room">
              <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-full text-white font-medium">
                <PlusShape /> Add your first room
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="group border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden !bg-white dark:!bg-gray-900 shadow-sm hover:shadow-md dark:hover:shadow-black/30 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-200"
              >
                {room.images?.[0] && (
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold !text-gray-900 dark:!text-gray-100">
                    {room.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                    ${room.hourlyRate?.value}/hr
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListingPage;