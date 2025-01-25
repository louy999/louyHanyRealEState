"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";

const FormContactDev = ({ dataDev }) => {
  const [phone, setPhoneNumber] = useState("");

  return (
    <div className="rounded-md w-full  shadow-md   relative    md:-translate-y-[100px]  bg-bg300 h-fit">
      <Image
        className="w-full h-fit"
        src={`${process.env.img}/image/${dataDev.image_developer}`}
        width={1000}
        height={1000}
        alt="Rounded avatar"
      />
      <h2 className="text-xl font-bold p-4">
        Contact the sales department of {dataDev ? dataDev.name : "loading..."}{" "}
      </h2>
      <div className="px-4 pb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full my-3 p-2 border border-black rounded-md"
        />
        <PhoneInput
          country={"eg"}
          value={phone}
          onChange={(value) => setPhoneNumber(value)}
          inputStyle={{
            width: "100%",
            borderRadius: "8px",
          }}
        />
        <textarea
          id="chat"
          rows={3}
          className={`block p-2.5 border border-black resize-none w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-3`}
          placeholder="Your message..."
        ></textarea>
      </div>
    </div>
  );
};

export default FormContactDev;
