"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DeveloperSearch from "./searchComponents/DeveloperSearch";
import LocationSearch from "./searchComponents/LocationSearch";
import TypesUnitsSearch from "./searchComponents/TypeUnitSearch";
// import AreaSearch from "./searchComponents/areaSearch";
import FinishedSearch from "./searchComponents/finshedSearch";
import DeliveryDate from "./searchComponents/deliveryDate";
import { FaRegWindowClose } from "react-icons/fa";
import MinDownPayment from "./searchComponents/minDownPayment";
import MaxDownPayment from "./searchComponents/maxDownPayment";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [closeSearchBar, setCloseSearchBar] = useState(true);
  const [locationInputUse, setLocationInputUse] = useState<string[]>([]);
  const [typeUnitInput, setTypeUnitInput] = useState<string[]>([]);
  const [minDownPaymentInput, setMinDownPaymentInput] = useState("");
  const [maxDownPaymentInput, setMaxDownPaymentInput] = useState("");
  // const [areaInput, setAreaInput] = useState<string[]>([]);
  const [finishedInput, setFinishedInput] = useState<string[]>([]);
  const [deliveryDateInput, setDeliveryDateInput] = useState<string[]>([]);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (locationInputUse.length > 0) {
      params.set("location", locationInputUse.join(","));
    } else {
      params.delete("location");
    }

    if (typeUnitInput) {
      params.set("typeUnit", typeUnitInput.join(","));
    } else {
      params.delete("typeUnit");
    }
    if (minDownPaymentInput) {
      params.set("down_payment_min", minDownPaymentInput);
    } else {
      params.delete("down_payment_min");
    }
    if (maxDownPaymentInput) {
      params.set("down_payment_max", maxDownPaymentInput);
    } else {
      params.delete("down_payment_max");
    }
    if (finishedInput) {
      params.set("finished", finishedInput.join(","));
    } else {
      params.delete("finished");
    }
    // if (areaInput) {
    //   params.set("areas", areaInput.join(","));
    // } else {
    //   params.delete("areas");
    // }
    if (deliveryDateInput) {
      params.set("delivery", deliveryDateInput.join(","));
    } else {
      params.delete("delivery");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }, [
    locationInputUse,
    finishedInput,
    maxDownPaymentInput,
    minDownPaymentInput,
    router,
    searchParams,
    typeUnitInput,
    deliveryDateInput,
  ]);

  return (
    <div
      className={`${
        closeSearchBar
          ? "lg:w-1/4 h-fit lg:h-full overflow-x-auto"
          : "w-10  lg:h-full h-10 overflow-hidden"
      } shadow-lg fixed top-20 lg:top-0 lg:relative z-20 bg-bg300 rounded-lg left-0 p-2 md:p-4  duration-300`}
    >
      <div
        className="flex items-center justify-start mb-3 text-2xl cursor-pointer w-10"
        onClick={() => setCloseSearchBar((prev) => !prev)}
      >
        <FaRegWindowClose />
      </div>
      <DeveloperSearch />
      <LocationSearch
        locationInputUse={locationInputUse}
        setLocationInputUse={setLocationInputUse}
      />
      <TypesUnitsSearch
        typeUnitInputUse={typeUnitInput}
        setTypeUnitInputUse={setTypeUnitInput}
      />
      <div className="bg-white rounded-md p-2 mb-3">
        <div>Down Payment</div>
        <MinDownPayment
          minDownPaymentInputUse={minDownPaymentInput}
          setMinPaymentInputUse={setMinDownPaymentInput}
        />
        <MaxDownPayment
          maxDownPaymentInputUse={maxDownPaymentInput}
          setMaxPaymentInputUse={setMaxDownPaymentInput}
        />
      </div>
      {/* <AreaSearch areaInputUse={areaInput} setAreaInputUse={setAreaInput} /> */}
      <FinishedSearch
        finishedInputUse={finishedInput}
        setFinishedInputUse={setFinishedInput}
      />
      <DeliveryDate
        deliveryDateInputUse={deliveryDateInput}
        setDeliveryDateInputUse={setDeliveryDateInput}
      />
      <div
        onClick={() => {
          setLocationInputUse([]);
          setTypeUnitInput([]);
          setMinDownPaymentInput("");
          setMaxDownPaymentInput("");
          setFinishedInput([]);
          setDeliveryDateInput([]);
          router.push("?", { scroll: false });
        }}
        className="capitalize w-full bg-primary200 p-2 text-center rounded-md shadow-md hover:bg-primary100 cursor-pointer duration-300 text-white"
      >
        reset
      </div>
    </div>
  );
};

export default SearchBar;
