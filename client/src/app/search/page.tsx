import React, { Suspense } from "react";
import SearchBar from "./components/SearchBar";
import OffersSearch from "./components/offersSearch";
import FormContact from "./components/formContact";

const page = () => {
  return (
    <div className="relative  top-10 md:top-20 flex flex-wrap lg:flex-nowrap  gap-5 h-[calc(100vh-7rem)]  m-5 rounded-md">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
      <div className="grid overflow-x-auto grid-cols-1 sm:grid-cols-2 rounded-lg lg:grid-cols-3 gap-5 w-full bg-bg300 p-2 md:p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <OffersSearch />
        </Suspense>
      </div>
      <FormContact />
    </div>
  );
};

export default page;
