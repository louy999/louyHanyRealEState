import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const LocationSearch: React.FC = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const locations = [
    { value: "new_cairo", label: "New Cairo" },
    { value: "new_capital", label: "New Capital" },
    { value: "october", label: "October" },
    { value: "zayed", label: "Zayed" },
    { value: "new_zayed", label: "New Zayed" },
    { value: "north_coast", label: "North Coast" },
  ];

  const handleLocationChange = (value: string) => {
    setSelectedLocation((prev) => (prev === value ? null : value)); // تحديد أو إلغاء التحديد
  };

  useEffect(() => {
    if (selectedLocation) {
      router.push(`?location=${selectedLocation}`);
    }
  }, [selectedLocation]);

  return (
    <div
      className={`p-2 md:p-4 bg-white rounded-lg shadow-md my-2 overflow-y-hidden ${
        open ? "h-fit" : "h-12"
      }`}
    >
      <h3
        className="text-lg font-semibold mb-4 flex justify-between items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span> Filter by Location</span>
        <FaAngleDown />
      </h3>
      <div className="flex flex-col gap-2">
        {locations.map((location) => (
          <label key={location.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="location"
              className="form-radio"
              value={location.value}
              checked={selectedLocation === location.value}
              onChange={() => handleLocationChange(location.value)}
            />
            {location.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LocationSearch;
