/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const DevImageShow = ({ dataDev }: any) => {
  const [numberImage, setNumberImage] = useState(0);

  if (
    !dataDev ||
    !dataDev.show_developer ||
    dataDev.show_developer.length === 0
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Image
        src={dataDev.show_developer[numberImage]}
        alt={`Image ${numberImage}`}
        width={1000}
        height={1000}
        className="w-screen h-[70vh]"
      />
      <div className="mt-4">
        <button
          onClick={() => setNumberImage((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-200 rounded-md absolute top-[35%] left-10 text-4xl"
        >
          <FaArrowAltCircleLeft />
        </button>
        <button
          onClick={() =>
            setNumberImage((prev) =>
              Math.min(prev + 1, dataDev.show_developer.length - 1)
            )
          }
          className="px-4 py-2 bg-gray-200 rounded-md absolute top-[35%] right-10 text-4xl"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default DevImageShow;
