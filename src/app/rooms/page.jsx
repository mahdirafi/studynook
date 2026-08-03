
import { FiGrid } from "react-icons/fi";
import FilterSidebar from "../Components/FilterSidebar";
import RoomsCard from "../Components/RoomsCard";

const RoomsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.amenities) query.set("amenities", params.amenities);
  if (params.minRate) query.set("minRate", params.minRate);
  if (params.maxRate) query.set("maxRate", params.maxRate);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?${query.toString()}`,
    { cache: "no-store" }
  );
  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white dark:bg-gray-900/70 transition-colors">
      <div className="flex items-center gap-3 mb-8">
  <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-xl shadow-lg shadow-blue-600/25 dark:shadow-blue-500/20">
    <FiGrid className="text-white" size={24} />
  </div>
  <div>
    <h1 className="text-3xl font-bold !text-gray-900 dark:!text-gray-100 tracking-tight">
      All Study Rooms
    </h1>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
      Browse the full catalog. Filter by amenity, price, or search by name.
    </p>
  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <FilterSidebar currentParams={params} />

        <div>
          <p className="text-sm text-[#a39d8c] dark:text-gray-500 mb-4">
            Showing{" "}
            <span className="font-medium text-[#2b2b28] dark:text-gray-200">
              {rooms.length}
            </span>{" "}
            rooms
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomsCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;