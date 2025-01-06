"use client";
import React, { useState } from "react";
import DeveloperSearchBanner from "./developerSearchBanner";
import LocationSearchBanner from "./locationSearchBanner";
import TypesUnitsSearchBanner from "./TypesUnitsSearchBanner";
import PriceSearchBanner from "./priceSearchBanner";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const MainBanner = () => {
  const [locationInput, setLocationInput] = useState("");
  const [typesInput, setTypesInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const buildSearchUrl = () => {
    const params = [];
    if (locationInput) params.push(`location=${locationInput}`);
    if (typesInput) params.push(`types=${typesInput}`);
    if (priceInput) {
      const [minPrice, maxPrice] = priceInput
        .split(",")
        .map((val) => parseInt(val.trim()));
      params.push(`down_payment_min=${minPrice}&down_payment_max=${maxPrice}`);
    }

    return params.length > 0 ? `/search?${params.join("&")}` : null;
  };

  const searchUrl = buildSearchUrl();

  return (
    <div className="relative top-[35vh] md:top-[44vh] left-2/4 -translate-x-2/4  bg-white z-20 p-2 w-10/12 md:w-8/12 lg:min-w-fit lg:w-9/12 rounded-lg ">
      <div className="flex flex-wrap lg:flex-nowrap gap-5 h-fit ">
        <DeveloperSearchBanner />
        <LocationSearchBanner
          changeSet={setLocationInput}
          valueSet={locationInput}
        />
        <TypesUnitsSearchBanner
          changeSet={setTypesInput}
          valueSet={typesInput}
        />
        <PriceSearchBanner changeSet={setPriceInput} valueSet={priceInput} />
        {searchUrl ? (
          <Link
            href={searchUrl}
            className="flex justify-center items-center h-[50px] gap-1 p-1 rounded-md opacity-100 bg-primary100 btn btn-info text-white text-xl"
          >
            <FaSearch /> Search
          </Link>
        ) : (
          <button
            className="flex justify-center items-center h-[50px] gap-1 p-1 rounded-md  w-fit btn btn-info text-white bg-primary100 text-xl opacity-30 cursor-not-allowed"
            disabled
          >
            <FaSearch /> Search
          </button>
        )}
      </div>
    </div>
  );
};

export default MainBanner;
