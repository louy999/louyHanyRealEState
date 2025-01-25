"use client";
import React from "react";
import DeveloperSearch from "./searchComponents/DeveloperSearch";
import LocationSearch from "./searchComponents/LocationSearch";
import TypesUnitsSearch from "./searchComponents/TypeUnitSearch";

const SearchBar = () => {
  return (
    <div className="w-2/4 md:w-1/4 shadow-lg absolute md:relative z-20 bg-bg300  rounded-lg h-full  left-0 p-2 md:p-4 overflow-x-auto">
      <div className="flex items-center justify-end">
        <div>close</div>
      </div>
      <DeveloperSearch />
      <LocationSearch />
      <TypesUnitsSearch />
      <div>down payment</div>
      <div>installment</div>
      <div>area</div>
      <div>Finishing</div>
      <div>delivery date</div>
      <div>bed</div>
      <div>bath</div>
    </div>
  );
};

export default SearchBar;
