"use client";
import { authClient } from "@/lib/auth-client";
import { PlusShape } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyListingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log("Session user:", user)

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Session user:", user)
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

  if (isPending) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-black mb-3">My Listings</h1>
          <p className="text-muted">Rooms you currently host on StudyNook.</p>
        </div>
        <Link href="/add-room">
          <Button className="bg-blue-500 rounded-sm text-white">
            <PlusShape /> Add Room
          </Button>
        </Link>
      </div>

      {/* Room list */}
      {loading ? (
        <p>Loading your rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="py-22 text-muted text-center text-4xl">You have not listed any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="border border-[#ece4d8] rounded-xl overflow-hidden bg-white"
            >
              {room.images?.[0] && (
                <div className="relative w-full h-40">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-[#2b2b28]">{room.name}</h3>
                <p className="text-sm text-[#8a8574]">
                  ${room.hourlyRate?.value}/hr
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListingPage;