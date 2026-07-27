import RoomsCard from "../Components/RoomsCard";

const RoomsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
    cache: "no-store",
  });
  const rooms = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold text-black mb-3">All Study Rooms</h1>
      <p className="text-muted mb-6">
        Browse the full catalog. Filter by amenity, price, or search by name.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {rooms.map((room) => (
    <RoomsCard key={room._id} room={room} />
  ))}
</div>

    </div>
  );
};

export default RoomsPage;