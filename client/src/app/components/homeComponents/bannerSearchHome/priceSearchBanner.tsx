import React from "react";
interface PriceSearchBannerProps {
  changeSet: (value: string) => void;
  valueSet: string;
}
const PriceSearchBanner: React.FC<PriceSearchBannerProps> = ({
  changeSet,
  valueSet,
}) => {
  return (
    <select
      className="select select-info w-full h-[50px] lg:w-fit bg-white"
      onChange={(e) => changeSet(e.target.value)}
      value={valueSet}
    >
      <option disabled selected value="">
        Down Payment
      </option>
      <option value={`300000,800000`}>300K To 800K</option>
      <option value={`1000000,4000000`}>1M To 4M</option>
      <option value={`5000000,10000000`}>5M To 10M</option>
      <option value={`12000000,20000000`}>12M To 20M</option>
    </select>
  );
};

export default PriceSearchBanner;
