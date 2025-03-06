import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface LocationSearchProps {
  locationInputUse: string[];
  setLocationInputUse: React.Dispatch<React.SetStateAction<string[]>>;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  locationInputUse = [],
  setLocationInputUse,
}) => {
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
    setLocationInputUse((prev) =>
      Array.isArray(prev)
        ? prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
        : [value]
    );
  };

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
        <span>Filter by Location</span>
        <FaAngleDown />
      </h3>
      <div className="flex flex-col gap-2">
        {locations.map((location) => (
          <label key={location.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="location"
              className="form-checkbox"
              value={location.value}
              checked={
                Array.isArray(locationInputUse) &&
                locationInputUse.includes(location.value)
              }
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
