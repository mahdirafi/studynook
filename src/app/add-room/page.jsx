"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomPage = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    floor: "",
    seatCapacity: "",
    hourlyRate: "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.hourlyRate) {
      toast.error("Room name and hourly rate are required.");
      return;
    }

    setSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      images: formData.imageUrl.trim() ? [formData.imageUrl.trim()] : [],
      floor: formData.floor.trim(),
      seatCapacity: {
        label: formData.seatCapacity.trim(),
      },
      hourlyRate: {
        value: Number(formData.hourlyRate),
      },
      amenities: selectedAmenities,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to add room.");
      }

      const data = await res.json();
      const newRoomId = data?.insertedId || data?._id || data?.id;

      toast.success("Room published successfully!");

      if (newRoomId) {
        router.push(`/rooms/${newRoomId}`);
      } else {
        router.push("/rooms");
      }
    } catch (err) {
      console.error("Failed to add room:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6ef] px-6 py-10 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1
          className="text-4xl font-semibold text-[#2b2b28] mb-2"
          style={{ fontFamily: "var(--font-fraunces, serif)" }}
        >
          Add a New Room
        </h1>
        <p className="text-[#8a8574] text-sm mb-8">
          Share your study room with others. You can edit or remove it any time.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl bg-white border border-[#ece4d8] p-7 md:p-8"
        >
          {/* Room Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-[#2b2b28]">
              Room Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Room Name ...."
              required
              value={formData.name}
              onChange={handleChange}
              className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold text-[#2b2b28]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Write description ...."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="text-sm font-semibold text-[#2b2b28]">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] placeholder:text-[#b3ac98] outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Floor / Capacity / Hourly Rate */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="floor" className="text-sm font-semibold text-[#2b2b28]">
                Floor
              </label>
              <input
                id="floor"
                name="floor"
                type="text"
                value={formData.floor}
                onChange={handleChange}
                placeholder="e.g. 3rd Floor"
                className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] placeholder:text-[#b3ac98] outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="seatCapacity" className="text-sm font-semibold text-[#2b2b28]">
                Capacity
              </label>
              <input
                id="seatCapacity"
                name="seatCapacity"
                type="number"
                min="1"
                value={formData.seatCapacity}
                onChange={handleChange}
                className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="hourlyRate" className="text-sm font-semibold text-[#2b2b28]">
                Hourly Rate ($)
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="rounded-xl border border-[#e4dcc9] bg-[#faf6ef] px-4 py-2.5 text-sm text-[#2b2b28] outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#2b2b28]">Amenities</p>
            <div className="grid grid-cols-3 gap-3">
              {AMENITIES_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-[#e4dcc9] bg-[#f3ede0] text-[#4a473f] hover:border-[#d8cfb8]"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0 ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-600"
                          : "border-[#c3bba4]"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="mt-1 w-fit flex items-center justify-center rounded-xl bg-[#1f3d2e] hover:bg-[#183024] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-6 py-3"
          >
            {submitting ? "Publishing..." : "Publish Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomPage;