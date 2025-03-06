"use client";
import React from "react";

interface FinishedSearchProps {
  finishedInputUse: string[];
  setFinishedInputUse: React.Dispatch<React.SetStateAction<string[]>>;
}

const FinishedSearch: React.FC<FinishedSearchProps> = ({
  finishedInputUse,
  setFinishedInputUse,
}) => {
  const options = ["fully finished", "semi finished", "core & shell"];

  const handleChange = (value: string) => {
    setFinishedInputUse((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-white p-2 rounded-md capitalize">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-1">
          <input
            type="checkbox"
            className="form-checkbox"
            value={option}
            checked={finishedInputUse.includes(option)}
            onChange={() => handleChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default FinishedSearch;
