/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

interface UserData {
  id: string;
  name: string;
  image_profile: string;
  date: string;
}

interface UserApiResponse {
  data: UserData;
}

const SomeInfo = ({ info }: { info: any }) => {
  const [dataUser, setDataUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<UserApiResponse>(
          `${process.env.local}/users/${info.user_id}`
        );
        setDataUser(res.data.data); // TypeScript now knows `res.data` contains `data: UserData`
      } catch (error: any) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [info]);

  return (
    <div className="flex items-center mb-4">
      {dataUser && dataUser.image_profile && dataUser.name ? (
        <>
          <Image
            className="w-10 h-10 me-4 rounded-full"
            src={`${process.env.img}/image/${dataUser.image_profile}`}
            alt="User Profile"
            width={1000}
            height={1000}
          />
          <div className="font-medium">
            <p>
              {dataUser.name}
              <time
                dateTime={dataUser.date}
                className="block text-sm text-gray-500"
              >
                {dataUser.date
                  ? formatDistanceToNow(new Date(info.date), {
                      addSuffix: true,
                    })
                  : "Invalid date"}
              </time>
            </p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SomeInfo;
