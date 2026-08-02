import { FiDollarSign, FiLayers, FiUsers } from "react-icons/fi";
import { BookingModal } from "./BookingModal";
 

const BookingCard = ({ room, formattedDate }) => {
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

  return (
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
        <div className="flex items-center gap-2.5 mb-6">
          <FiDollarSign size={15} className="text-[#a39d8c]" />
          <span>{totalBookings ?? 0} total bookings</span>
        </div>
      </div>

      <BookingModal room={room} />

    
    </div>
  );
};

export default BookingCard;