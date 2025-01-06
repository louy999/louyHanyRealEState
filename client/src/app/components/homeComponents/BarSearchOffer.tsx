import React from "react";
import Link from "next/link";

const BarSearchOffer = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-fit bg-white p-2 md:p-4 flex gap-5 rounded-md">
        <Link href="?types=apartment">Apartment</Link>
        <Link href="?types=commercial">Commercial</Link>
        <Link href="?types=offices">Offices</Link>
        <Link href="?types=clinics">Clinics</Link>
      </div>
    </div>
  );
};

export default BarSearchOffer;
