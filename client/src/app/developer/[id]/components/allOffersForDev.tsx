"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaPoundSign } from "react-icons/fa";
import { BiSolidBath } from "react-icons/bi";
import { IoBed } from "react-icons/io5";
import { TbMeterSquare } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TfiArrowsVertical } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const AllOffersForDev = ({ dataDev }) => {
  const [dataOffer, setDataOffer] = useState([]);

  useEffect(() => {
    const resOfferDev = async () => {
      try {
        const res = await axios.get(
          `${process.env.local}/offer/name/${dataDev.id}`
        );
        setDataOffer(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    resOfferDev();
  }, [dataDev]);

  return (
    <div className="w-full">
      <h2 className="text-center text-2xl font-bold mb-5">
        All Offers for {dataDev?.name || "Loading..."}
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {dataOffer.map((offer) => (
          <SwiperSlide key={offer.id}>
            <div className="bg-gray-100 rounded-lg shadow-md p-4 relative w-full">
              <figure>
                <Image
                  src={`${process.env.img}/image/${offer.image_offer}`}
                  width={1000}
                  height={1000}
                  alt="Offer Image"
                  className="rounded-md"
                />
              </figure>
              <h2 className="absolute top-5 right-5 bg-white p-1 rounded-md text-lg font-semibold text-accent100 capitalize">
                {offer.location}
              </h2>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-accent100 capitalize mb-2">
                  {offer.title}
                </h2>
                <div className="flex items-center gap-2 w-full">
                  {offer.types === "apartment" && (
                    <div className="flex gap-2">
                      <p className="flex items-center p-1 bg-bg100 text-accent100 rounded-md">
                        {offer.bed} <IoBed />
                      </p>
                      <p className="flex items-center p-1 bg-bg100 text-accent100 rounded-md">
                        {offer.bath} <BiSolidBath />
                      </p>
                    </div>
                  )}
                  <p className="p-2 capitalize bg-bg100 text-black rounded-lg flex items-center">
                    <TfiArrowsVertical className="text-xl mr-1 rotate-45" />{" "}
                    {offer.areas} <TbMeterSquare />
                  </p>
                </div>
                <h2 className="text-lg font-semibold text-accent100 capitalize mt-2">
                  Down Payment: {Number(offer.down_payment).toLocaleString()}{" "}
                  <FaPoundSign />
                </h2>
                <p className="text-sm text-slate-500 capitalize">
                  Installment: {offer.installment}
                </p>
                <div className="mt-4 flex justify-center gap-5">
                  <Link
                    href={`https://wa.me/201144357034?text=مرحبًا، أرغب بمعرفة المزيد عن العرض رقم: ${offer.id}`}
                    className="w-full text-center bg-primary100 text-white rounded-md py-2 flex justify-center items-center gap-2"
                  >
                    Whatsapp <FaWhatsapp />
                  </Link>
                  <div className="w-full text-center bg-bg300 text-black rounded-md py-2 flex justify-center items-center gap-2">
                    <FaPhoneVolume /> Call
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AllOffersForDev;
