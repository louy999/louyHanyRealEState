"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

const LinksNavBar = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className=" rounded-box  mt-3 w-52 p-2   gap-5  items-center hidden md:flex">
        <li>
          <Link
            href="/"
            className={`cursor-pointer ${
              pathname === "/"
                ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                : ""
            } `}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={`cursor-pointer ${
              pathname === "/search"
                ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                : ""
            } `}
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            href="/request"
            className={`cursor-pointer ${
              pathname === "/request"
                ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                : ""
            } `}
          >
            Request
          </Link>
        </li>
      </ul>
      <div className="hidden md:flex items-center gap-5 ">
        <div>
          <Link
            href="/login"
            className="cursor-pointer bg-accent100 text-bg200 font-bold p-2 rounded-md hover:p-3 duration-300"
          >
            Login
          </Link>
        </div>
        <div>
          <Link href="/register" className="cursor-pointer md:hidden lg:block">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default LinksNavBar;
