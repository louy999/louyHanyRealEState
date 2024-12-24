import React from "react";
import Link from "next/link";

const LogoNavbar = () => {
  return (
    <div className="navbar-start">
      <Link
        href="/"
        className="font-semibold	tracking-wide	 text-xl logo font-montecarlo"
      >
        Louy Hany
      </Link>
    </div>
  );
};

export default LogoNavbar;
