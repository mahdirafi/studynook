"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Modal, Surface } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";

const AMENITIES_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export function EditModal({ room }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: room?.name || "",
    description: room?.description || "",
    imageUrl: room?.images?.[0] || "",
    floor: room?.floor || "",
    seatCapacity: room?.seatCapacity?.label || "",
    hourlyRate: room?.hourlyRate?.value ?? "",
  });

  const [selectedAmenities, setSelectedAmenities] = useState(
    room?.amenities || []
  );

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      console.log(payload);

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update room.");
      }

      toast.success("Room updated successfully!");
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to update room:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={open} onOpenChange={setOpen}>
      <Button
        variant="bordered"
        className="border-blue-500 dark:border-blue-400 !text-blue-600 dark:!text-blue-400 hover:!bg-blue-50 dark:hover:!bg-blue-500/10 rounded-full font-medium"
        onPress={() => setOpen(true)}
      >
        <BiEdit /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl !bg-white dark:!bg-gray-900">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-blue-600 dark:bg-blue-500 !text-white">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="!text-gray-900 dark:!text-gray-100 font-bold tracking-tight">
                Edit Room
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-gray-500 dark:text-gray-400 tracking-wide">
                Update your room details below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 rounded-2xl !bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20 p-7 md:p-8"
                >
                  {/* Room Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                      Room Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors resize-none"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="imageUrl" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                      Image URL
                    </label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      type="text"
                      required
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>

                  {/* Floor / Capacity / Hourly Rate */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="floor" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                        Floor
                      </label>
                      <input
                        id="floor"
                        name="floor"
                        type="text"
                        required
                        value={formData.floor}
                        onChange={handleChange}
                        placeholder="e.g. 3rd Floor"
                        className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="seatCapacity" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                        Capacity
                      </label>
                      <input
                        id="seatCapacity"
                        name="seatCapacity"
                        type="text"
                        required
                        value={formData.seatCapacity}
                        onChange={handleChange}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="hourlyRate" className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                        Hourly Rate ($)
                      </label>
                      <input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 px-4 py-2.5 text-sm !text-gray-900 dark:!text-gray-100 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold !text-gray-900 dark:!text-gray-100">
                      Amenities
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {AMENITIES_OPTIONS.map((amenity) => {
                        const isSelected = selectedAmenities.includes(amenity);
                        return (
                          <button
                            type="button"
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
                              isSelected
                                ? "border-blue-500 dark:border-blue-400 !bg-blue-50 dark:!bg-blue-500/10 !text-blue-700 dark:!text-blue-400"
                                : "border-gray-200 dark:border-gray-700 !bg-gray-50 dark:!bg-gray-800 !text-gray-600 dark:!text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                            }`}
                          >
                            <span
                              className={`flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0 ${
                                isSelected
                                  ? "border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-gray-900" />
                              )}
                            </span>
                            {amenity}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <Modal.Footer className="px-0 text-center">
                    <Button
                      type="button"
                      variant="secondary"
                      onPress={() => setOpen(false)}
                      className="!bg-gray-100 dark:!bg-gray-800 !text-gray-700 dark:!text-gray-300 hover:!bg-gray-200 dark:hover:!bg-gray-700 rounded-full font-medium"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="!bg-blue-600 dark:!bg-blue-500 hover:!bg-blue-700 dark:hover:!bg-blue-600 !text-white rounded-full font-medium"
                    >
                      {submitting ? "Saving..." : "Save"}
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}