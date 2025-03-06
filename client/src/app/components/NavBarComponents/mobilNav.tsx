"use client";
import React, { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next/client";
import Image from "next/image";
interface UserData {
  name: string;
  image_profile: string;
}
const MobilNav = () => {
  const [dataUsers, setDataUsers] = useState<UserData | null>(null);
  const pathname = usePathname();
  const value = getCookie("token");

  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const res = await axios.get<{ data: UserData }>(
          `${process.env.local}/users/${value}`
        );
        setDataUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (value) {
      fetchName();
    }
  }, [value]);
  return (
    <>
      <CiMenuFries
        className="text-3xl block md:hidden cursor-pointer"
        onClick={() => setActiveMenu((prev) => !prev)}
      />
      {activeMenu && (
        <>
          <div
            className="fixed top-0 left-0  h-screen w-screen cursor-pointer"
            onClick={() => setActiveMenu(false)}
          ></div>
          <ul className="px-1 absolute right-2 top-12 z-30 bg-bg300 p-2 rounded-md w-52 ">
            <li className="mb-2">
              <Link
                href="/"
                className={`cursor-pointer  ${
                  pathname === "/"
                    ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                    : ""
                } `}
                onClick={() => setActiveMenu(false)}
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/search"
                className={`cursor-pointer  ${
                  pathname === "/search"
                    ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                    : ""
                } `}
                onClick={() => setActiveMenu(false)}
              >
                Search
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/request"
                className={`cursor-pointer  ${
                  pathname === "/request"
                    ? "bg-accent100 text-bg200 font-bold p-2 rounded-md"
                    : ""
                } `}
                onClick={() => setActiveMenu(false)}
              >
                Request
              </Link>
            </li>
            {value === undefined ? (
              <div className="flex gap-5 justify-between mt-2">
                <Link
                  className="bg-accent100 text-white w-full rounded-md text-center capitalize "
                  href="/login"
                  onClick={() => setActiveMenu(false)}
                >
                  login
                </Link>
                <Link
                  className="bg-accent100 text-white w-full rounded-md text-center capitalize "
                  href="/register"
                  onClick={() => setActiveMenu(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex  items-center gap-1 capitalize text-xl font-bold cursor-pointer">
                {" "}
                <Image
                  src={`${process.env.img}/image/${dataUsers?.image_profile}`}
                  width={200}
                  alt=""
                  className="w-8 h-8 rounded-full"
                  height={200}
                />{" "}
                <div>{dataUsers?.name}</div>
              </div>
            )}
          </ul>
        </>
      )}
    </>
  );
};

export default MobilNav;
