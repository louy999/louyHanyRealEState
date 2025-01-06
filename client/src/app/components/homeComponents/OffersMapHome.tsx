import React from "react";
import axios from "axios";
import Image from "next/image";
import { FaPoundSign } from "react-icons/fa";
import { BiSolidBath } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { TbMeterSquare } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiArrowsVertical } from "react-icons/tfi";

import Link from "next/link";

type Offer = {
  id: string;
  areas: string;
  bath: string | null;
  bed: string | null;
  cat: string;
  date: string;
  developer_id: string;
  down_payment: string;
  furniture: string | null;
  image_offer: string;
  installment: string;
  location: string;
  status: boolean;
  types: string;
};

const OffersMapHome: React.FC = async (props) => {
  try {
    const res = await axios.get<{ data: Offer[] }>(
      `${process.env.local}/offer`
    );
    const offers = res.data.data;
    console.log(props);

    return (
      <div className="w-11/12 bg-white bg-opacity-40 rounded-md p-4 flex justify-start flex-wrap mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-gray-100 rounded-lg shadow-md p-4 relative"
            >
              <figure>
                <Image
                  src={`${process.env.img}/image/${offer.image_offer}`}
                  width={1000}
                  height={1000}
                  alt="Offer Image"
                  className="rounded-md"
                />
              </figure>
              <h2 className="card-title absolute top-5 right-5 bg-white p-1 rounded-md text-lg font-semibold text-text200 capitalize">
                {offer.location}
              </h2>
              <div className="card-body mt-4">
                <h2 className="card-title p-1 flex gap-0 items-center rounded-md text-lg font-semibold text-text200 capitalize">
                  {offer.title}
                </h2>
                <p className="text-gray-600">furniture: {offer.furniture}</p>
                <div className="flex justify-start items-center gap-2">
                  {offer.types === "apartment" ? (
                    <>
                      <p className="text-white bg-text200 bg-opacity-80 flex items-center p-1 text-xl rounded-md">
                        {offer.bed} <IoBed />
                      </p>
                      <p className="text-white bg-text200 bg-opacity-80 flex items-center p-1 text-xl rounded-md">
                        {offer.bath} <BiSolidBath />
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                  <p className="text-gray-600 flex items-center text-xl">
                    <TfiArrowsVertical className="text-xl mr-1 rotate-45" />{" "}
                    {offer.areas}
                    <TbMeterSquare />
                  </p>
                </div>
                <p className="text-gray-600">
                  Installment: {offer.installment}
                </p>
                <h2 className="card-title  flex  items-center rounded-md text-lg font-semibold text-text200 capitalize">
                  Down Payment: {Number(offer.down_payment).toLocaleString()}
                  <FaPoundSign />
                </h2>
                <div className="card-actions  mt-2 flex justify-center gap-5">
                  <Link
                    href={`https://wa.me/201144357034?text=مرحبًا، أرغب بمعرفة المزيد عن العرض رقم: ${offer.id}`}
                    className="w-full text-center bg-primary100 text-white rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300"
                  >
                    Whatsapp
                    <FaWhatsapp />
                  </Link>
                  <div className="w-full text-center bg-text200 text-white rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300">
                    <FaPhoneVolume /> Call
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Not Found</div>;
  }
};

export default OffersMapHome;
