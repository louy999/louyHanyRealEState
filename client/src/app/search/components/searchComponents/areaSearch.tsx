"use client";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { TbMeterSquare } from "react-icons/tb";

interface AreaSearchProps {
  areaInputUse: string[];
  setAreaInputUse: React.Dispatch<React.SetStateAction<string[]>>;
}

const AreaSearch: React.FC<AreaSearchProps> = ({
  areaInputUse,
  setAreaInputUse,
}) => {
  const [areas, setAreas] = useState<{ value: string; label: string }[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await axios.get(`${process.env.local}/offer/areas`);
        const rawData = (res.data as { data: { areas: string }[] }).data;

        const uniqueAreas = Array.from(
          new Set(rawData.map((item: { areas: string }) => item.areas))
        ).map((area) => ({
          value: area,
          label: area.charAt(0).toUpperCase() + area.slice(1),
        }));

        setAreas(uniqueAreas);
      } catch (error) {
        console.log("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  const handleAreaChange = (value: string) => {
    setAreaInputUse((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
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
        <span>Areas</span>
        <FaAngleDown />
      </h3>
      <div className="flex flex-col gap-2">
        {areas.map((area) => (
          <label key={area.value} className="flex items-center gap-1">
            <input
              type="checkbox"
              className="form-checkbox"
              value={area.value}
              checked={areaInputUse.includes(area.value)}
              onChange={() => handleAreaChange(area.value)}
            />
            {area.label}
            <TbMeterSquare />
          </label>
        ))}
      </div>
    </div>
  );
};

export default AreaSearch;
