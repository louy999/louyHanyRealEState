"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaPoundSign, FaWhatsapp, FaPhoneVolume } from "react-icons/fa";
import { BiSolidBath } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { TbMeterSquare } from "react-icons/tb";
import { TfiArrowsVertical } from "react-icons/tfi";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

type Offer = {
  id: string;
  developer_name: string;
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
  title: string;
};

const OffersMapHome = ({ offers }: { offers: Offer[] }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("types");

  const filteredOffers = search
    ? offers.filter(
        (offer) => offer.types.toLowerCase() === search.toLowerCase()
      )
    : offers;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
      {filteredOffers
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((offer) => (
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
            <h2 className="card-title absolute top-5 right-5 bg-white p-1 rounded-md text-lg font-semibold text-accent100 capitalize">
              {offer.location}
            </h2>
            <div className="card-body mt-4">
              <div className="mb-2">
                <h2 className="card-title lg:text-lg font-semibold text-accent100 capitalize -mb-2 text-sm md:text-base">
                  {offer.title}
                </h2>
                <Link
                  href={`/developer/${offer.developer_id}`}
                  className="text-sm text-slate-500 pl-2 capitalize flex items-center gap-1 mt-2"
                >
                  {offer.developer_name}
                  <FiExternalLink />
                </Link>
              </div>

              <div className="flex items-center gap-2 w-full m-2">
                <div className=" flex gap-2 pr-2">
                  {offer.types === "apartment" && (
                    <>
                      <p className="bg-bg100 text-accent100 bg-opacity-80 flex items-center p-1 text-xl rounded-md w-fit gap-1">
                        <IoBed />
                        {offer.bed}
                        <p className="hidden md:block">bed</p>
                      </p>
                      <p className="bg-bg100 text-accent100 bg-opacity-80 flex items-center p-1 text-xl rounded-md w-fit gap-1">
                        <BiSolidBath />
                        {offer.bath}
                        <p className="hidden md:block">beth</p>
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className=" flex justify-start items-center gap-2">
                <p className="p-2 capitalize center w-fit bg-bg100 text-black rounded-lg flex justify-start items-center ">
                  <TfiArrowsVertical className="text-xl mr-1 rotate-45" />
                  {offer.areas}
                  <TbMeterSquare />
                </p>
                <p className="p-2 capitalize center w-fit bg-bg100 text-black rounded-lg flex justify-start items-center ">
                  {offer.furniture}
                </p>
              </div>
              <h2 className="card-title flex items-center rounded-md text-sm md:text-base font-semibold text-accent100 capitalize">
                Down Payment: {Number(offer.down_payment).toLocaleString()}
                <FaPoundSign />
              </h2>
              <p className="text-sm text-slate-500 capitalize">
                Installment: {offer.installment}
              </p>
              <div className="card-actions mt-2 flex justify-center gap-5">
                <Link
                  href={`https://wa.me/201144357034?text= ${offer.id}`}
                  className="w-full text-center bg-primary100 text-white rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300  md:hidden"
                  target="_blank"
                >
                  Whatsapp
                  <FaWhatsapp />
                </Link>
                <Link
                  href={` https://web.whatsapp.com/send?phone=+201144357034&text=${offer.id}`}
                  className="w-full text-center bg-primary100 text-white rounded-md py-2 md:flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300  hidden"
                  target="_blank"
                >
                  <FaWhatsapp />
                  Whatsapp
                </Link>
                <div className="w-full text-center bg-bg300 text-black rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300">
                  <FaPhoneVolume /> Call
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OffersMapHome;
