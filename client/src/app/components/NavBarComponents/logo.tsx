import React from "react";
import Link from "next/link";
import Image from "next/image";

const LogoNavbar = () => {
  return (
    <div className="navbar-start">
      <Link
        href="/"
        className="font-semibold	tracking-wide	 text-xl logo font-montecarlo flex items-center gap-2"
      >
        <Image
          className="w-10 h-10 rounded-full"
          src="/EGBRO-logo.jpg"
          alt="Rounded avatar"
          width={1000}
          height={1000}
        />
        <div className="flex flex-wrap items-center   ">
          <span className="w-full text-start">Louy Hany</span>
          <span className="text-xs  w-24 text-center">Real Estate</span>
        </div>
      </Link>
    </div>
  );
};

export default LogoNavbar;
