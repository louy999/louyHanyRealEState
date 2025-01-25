"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DevImageShow from "./devImageShow";
import FormContactDev from "./formContactDev";
import InfoDeveloper from "./infoDeveloper";
import { usePathname } from "next/navigation";
import AllOffersForDev from "./allOffersForDev";
interface DeveloperData {
  show_developer: string[];
  id: string;
  date: string;
  name: string;
  image_developer: string;
  location: string[];
  description: string;
}

const AllComponentsDev = () => {
  const [dataDev, setDataDev] = useState([]);

  const pathname = usePathname();
  useEffect(() => {
    const detailsDevFetch = async () => {
      try {
        const res = await axios.get<{ data: DeveloperData }>(
          `${process.env.local}/dev/${pathname.slice(11)}`
        );
        setDataDev(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    detailsDevFetch();
  }, [pathname]);

  return (
    <div className="">
      <DevImageShow dataDev={dataDev} />
      <div className="flex justify-between  flex-wrap md:flex-nowrap items-start">
        <div className="relative w-1/4">
          <FormContactDev dataDev={dataDev} />
        </div>
        <InfoDeveloper dataDev={dataDev} />
      </div>
      <AllOffersForDev dataDev={dataDev} />
    </div>
  );
};

export default AllComponentsDev;
