import React from "react";

interface LocationSearchBannerProps {
  changeSet: (value: string) => void;
  valueSet: string;
}

const LocationSearchBanner: React.FC<LocationSearchBannerProps> = ({
  changeSet,
  valueSet,
}) => {
  return (
    <select
      className="select select-info w-full lg:w-fit h-[50px] bg-white"
      onChange={(e) => changeSet(e.target.value)}
      value={valueSet}
    >
      <option disabled value="">
        Distention
      </option>
      <option value="new_cairo">New Cairo</option>
      <option value="new_capital">New Capital</option>
      <option value="october">October</option>
      <option value="zayed">Zayed</option>
      <option value="new_zayed">New Zayed</option>
      <option value="north_coast">North Coast</option>
    </select>
  );
};

export default LocationSearchBanner;
