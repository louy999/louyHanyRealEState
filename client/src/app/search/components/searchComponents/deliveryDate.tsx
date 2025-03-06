"use client";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

interface DeliveryDateProps {
  deliveryDateInputUse: string[];
  setDeliveryDateInputUse: React.Dispatch<React.SetStateAction<string[]>>;
}

const DeliveryDate: React.FC<DeliveryDateProps> = ({
  deliveryDateInputUse,
  setDeliveryDateInputUse,
}) => {
  const [deliveryDates, setDeliveryDates] = useState<
    { value: string; label: string }[]
  >([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDeliveryDates = async () => {
      try {
        const res = await axios.get(`${process.env.local}/offer/delivery`);
        const rawData = (res.data as { data: { delivery_date: string }[] })
          .data;

        const uniqueDates = Array.from(
          new Set(
            rawData.map((item: { delivery_date: string }) => item.delivery_date)
          )
        ).map((date) => ({
          value: date,
          label: date.charAt(0).toUpperCase() + date.slice(1),
        }));

        setDeliveryDates(uniqueDates);
      } catch (error) {
        console.error("Error fetching delivery dates:", error);
      }
    };

    fetchDeliveryDates();
  }, []);

  const handleChange = (value: string) => {
    setDeliveryDateInputUse((prev) =>
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
        <span>Delivery Date</span>
        <FaAngleDown />
      </h3>
      <div className="flex flex-col gap-2">
        {deliveryDates.map((date) => (
          <label key={date.value} className="flex items-center gap-1">
            <input
              type="checkbox"
              className="form-checkbox"
              value={date.value}
              checked={deliveryDateInputUse.includes(date.value)}
              onChange={() => handleChange(date.value)}
            />
            {date.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDate;
