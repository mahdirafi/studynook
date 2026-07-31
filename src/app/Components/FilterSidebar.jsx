"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="bg-white border border-[#ece4d8] rounded-2xl p-5 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#2b2b28]">Refine</h2>
        <button onClick={handleReset} className="text-sm text-[#a39d8c] hover:opacity-70 hover:bg-[#005f78] hover:text-white rounded-sm px-5 py-3 delay-2">
          ✕  Reset
        </button>
      </div>

      <label className="text-xs text-[#a39d8c] font-medium">Search by name</label>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && updateURL()}
        onBlur={() => updateURL()}
        placeholder="e.g. Quiet Pod"
        className="w-full border rounded-lg px-3 py-2 text-sm mt-1.5 mb-5"
      />

      <p className="text-xs text-[#a39d8c] font-medium mb-2">Amenities</p>
      <div className="flex flex-col gap-2 mb-5">
        {AMENITIES.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-[#4a473f]">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(item)}
              onChange={() => toggleAmenity(item)}
            />
            {item}
          </label>
        ))}
      </div>

      <p className="text-xs text-[#a39d8c] font-medium mb-2">Hourly rate ($)</p>
      <div className="flex gap-2">
        <input
          value={minRate}
          onChange={(e) => setMinRate(e.target.value)}
          onBlur={() => updateURL()}
          placeholder="Min"
          type="number"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
        <input
          value={maxRate}
          onChange={(e) => setMaxRate(e.target.value)}
          onBlur={() => updateURL()}
          placeholder="Max"
          type="number"
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;