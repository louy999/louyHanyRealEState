import React from "react";
import LogoNavbar from "./logo";
import LinksNavBar from "./LinksNavBar";
import MobilNav from "./mobilNav";

const Navbar = () => {
  return (
    <div className="navbar shadow-md w-full md:w-8/12 bg-white bg-opacity-80 top-0 fixed z-50 md:top-7  -translate-x-2/4 left-2/4 p-2 md:rounded-md flex items-center justify-between">
      <LogoNavbar />
      <LinksNavBar />
      <MobilNav />
    </div>
  );
};

export default Navbar;
