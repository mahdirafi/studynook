"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const AMENITIES = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

const FilterSidebar = ({ currentParams }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(currentParams.search || "");
  const [selectedAmenities, setSelectedAmenities] = useState(
    currentParams.amenities ? currentParams.amenities.split(",") : []
  );
  const [minRate, setMinRate] = useState(currentParams.minRate || "");
  const [maxRate, setMaxRate] = useState(currentParams.maxRate || "");

  const updateURL = (overrides = {}) => {
    const next = { search, amenities: selectedAmenities.join(","), minRate, maxRate, ...overrides };

    const query = new URLSearchParams();
    if (next.search) query.set("search", next.search);
    if (next.amenities) query.set("amenities", next.amenities);
    if (next.minRate) query.set("minRate", next.minRate);
    if (next.maxRate) query.set("maxRate", next.maxRate);

    router.push(`${pathname}?${query.toString()}`);
  };

  const toggleAmenity = (item) => {
    const updated = selectedAmenities.includes(item)
      ? selectedAmenities.filter((a) => a !== item)
      : [...selectedAmenities, item];
    setSelectedAmenities(updated);
    updateURL({ amenities: updated.join(",") });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
    router.push(pathname);
  };

  return (
    <div className="!bg-white dark:!bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 h-fit shadow-[0_4px_20px_-6px_rgba(0,0,0,0.12)] dark:shadow-black/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold !text-gray-900 dark:!text-gray-100">Refine</h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white rounded-full px-3 py-1.5 transition-colors duration-200"
        >
          <FiX size={14} /> Reset
        </button>
      </div>

      <label className="text-xs text-gray-500 dark:text-gray-400 font-medium">Search by name</label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && updateURL()}
        onBlur={() => updateURL()}
        placeholder="e.g. Quiet Pod"
        className="w-full border border-gray-200 dark:border-gray-700 !bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm mt-1.5 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
      />

      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Amenities</p>
      <div className="flex flex-col gap-2 mb-5">
        {AMENITIES.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(item)}
              onChange={() => toggleAmenity(item)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-500 focus:ring-blue-500/40 focus:ring-offset-0 accent-blue-600 dark:accent-blue-500"
            />
            {item}
          </label>
        ))}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Hourly rate ($)</p>
      <div className="flex gap-2">
        <input
          value={minRate}
          onChange={(e) => setMinRate(e.target.value)}
          onBlur={() => updateURL()}
          placeholder="Min"
          type="number"
          className="w-full border border-gray-200 dark:border-gray-700 !bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
        <input
          value={maxRate}
          onChange={(e) => setMaxRate(e.target.value)}
          onBlur={() => updateURL()}
          placeholder="Max"
          type="number"
          className="w-full border border-gray-200 dark:border-gray-700 !bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;