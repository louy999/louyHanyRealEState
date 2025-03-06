"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaPoundSign } from "react-icons/fa";
import { BiSolidBath } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { TbMeterSquare } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiArrowsVertical } from "react-icons/tfi";
import { FiExternalLink } from "react-icons/fi";

interface Offer {
  id: number;
  image_offer: string;
  location: string;
  title: string;
  developer_name: string;
  types: string;
  bed: number;
  bath: number;
  areas: number;
  down_payment: number;
  installment: string;
  date: string;
  delivery_date: string;
  furniture: string;
}

const OffersSearch = () => {
  const [dataOffer, setDataOffer] = useState<Offer[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllOffers = async () => {
      try {
        const res = await axios.get<{ data: Offer[] }>(
          `${process.env.local}/offer`
        );
        setDataOffer(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllOffers();
  }, []);

  const locationParam = searchParams.get("location");
  const selectedLocations = locationParam ? locationParam.split(",") : [];

  const typeUnitParam = searchParams.get("typeUnit");

  const minDownPaymentParam = searchParams.get("down_payment_min");
  const maxDownPaymentParam = searchParams.get("down_payment_max");

  const minDownPayment = minDownPaymentParam
    ? parseFloat(minDownPaymentParam.replace(/,/g, ""))
    : 0;

  const maxDownPayment = maxDownPaymentParam
    ? parseFloat(maxDownPaymentParam.replace(/,/g, ""))
    : Infinity;

  const filteredOffers = dataOffer.filter((offer) => {
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(offer.location.toLowerCase());

    const matchesTypeUnit =
      !typeUnitParam ||
      offer.types.toLowerCase() === typeUnitParam.toLowerCase();

    const matchesDownPayment =
      offer.down_payment >= minDownPayment &&
      offer.down_payment <= maxDownPayment;
    const finishedParam = searchParams.get("finished");
    const selectedFinished = finishedParam ? finishedParam.split(",") : [];
    const matchesFinished =
      selectedFinished.length === 0 ||
      selectedFinished.some((status) =>
        offer.furniture.includes(status.toLowerCase())
      );
    const deliveryDateParam = searchParams.get("delivery");
    const selectedDeliveryDates = deliveryDateParam
      ? deliveryDateParam.split(",")
      : [];
    const matchesDeliveryDate =
      selectedDeliveryDates.length === 0 ||
      selectedDeliveryDates.includes(offer.delivery_date);
    return (
      matchesLocation &&
      matchesTypeUnit &&
      matchesDownPayment &&
      matchesFinished &&
      matchesDeliveryDate
    );
  });

  return (
    <>
      {filteredOffers
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((offer) => (
          <div
            key={offer.id}
            className="bg-gray-100 rounded-lg shadow-md p-4 relative h-fit"
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
              {offer.location.toLowerCase().split("_")}
            </h2>
            <div className="card-body mt-4">
              <div className="mb-2">
                <h2 className="card-title lg:text-lg font-semibold text-accent100 capitalize -mb-2 text-sm md:text-base">
                  {offer.title}
                </h2>
                <Link
                  href={`/developer/${offer.id}`}
                  className="text-sm text-slate-500 pl-2 capitalize flex items-center gap-1 pt-2"
                >
                  {offer.developer_name}
                  <FiExternalLink />
                </Link>
              </div>

              <div className="flex items-center gap-2 w-full m-2">
                <div className=" flex gap-2 pr-2">
                  {offer.types === "apartment" && (
                    <>
                      <p className="bg-bg100 text-accent100 bg-opacity-80 flex items-center p-1 text-xl rounded-md w-fit">
                        {offer.bed}
                        <IoBed />
                      </p>
                      <p className="bg-bg100 text-accent100 bg-opacity-80 flex items-center p-1 text-xl rounded-md w-fit">
                        {offer.bath}
                        <BiSolidBath />
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
                  <FaWhatsapp /> Whatsapp
                </Link>
                <div className="w-full text-center bg-bg300 text-black rounded-md py-2 flex justify-center items-center gap-2 cursor-pointer hover:opacity-55 duration-300">
                  <FaPhoneVolume /> Call
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default OffersSearch;
