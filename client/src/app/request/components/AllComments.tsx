import React from "react";
import Image from "next/image";

const AllComments = () => {
  return (
    <article className="w-full rounded-md p-4 shadow-lg bg-white">
      <div className="flex items-center mb-4">
        <Image
          className="w-10 h-10 me-4 rounded-full"
          src=""
          alt=""
          width={1000}
          height={1000}
        />
        <div className="font-medium dark:text-white">
          <p>
            Jese Leos
            <time
              dateTime="2014-08-16 19:00"
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
              Joined on August 2014
            </time>
          </p>
        </div>
      </div>

      <p className="mb-3 text-gray-500 dark:text-gray-400">
        It is obviously not the same build quality as those very expensive
        watches. But that is like comparing a Citroën to a Ferrari. This watch
        was well under £100! An absolute bargain.
      </p>

      <aside>
        <div className="flex items-center mt-3">
          <a
            href="#"
            className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Replay
          </a>
        </div>
      </aside>
    </article>
  );
};

export default AllComments;
