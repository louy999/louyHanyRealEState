"use client";
import Link from "next/link";
import { getCookie } from "cookies-next/client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

// Define the expected structure of the user data
interface UserData {
  name: string;
  image_profile: string;
}

const LinksNavBar = () => {
  const [dataUsers, setDataUsers] = useState<UserData | null>(null);
  const pathname = usePathname();
  const value = getCookie("token");

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

  console.log(dataUsers);

  return (
    <>
      <ul className="rounded-box mt-3 w-52 p-2 gap-5 items-center hidden md:flex">
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
      {value === undefined ? (
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
            <Link
              href="/register"
              className="cursor-pointer md:hidden lg:block"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex justify-center items-center gap-1 capitalize text-xl font-bold  ">
          <Image
            src={`${process.env.img}/image/${dataUsers?.image_profile}`}
            width={200}
            alt="Profile Picture"
            className="w-10 h-10 rounded-full"
            height={200}
          />
          <div>{dataUsers?.name}</div>
        </div>
      )}
    </>
  );
};

export default LinksNavBar;
