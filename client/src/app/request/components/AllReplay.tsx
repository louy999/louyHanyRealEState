import React, { useEffect, useState } from "react";
import axios from "axios";
import SomeInfo from "./SomeInfo";
import AddReplay from "./addReplay";
import { getCookie } from "cookies-next/client";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

interface Replay {
  id: string; // Replace with the actual type of `id`
  replay: string; // Add fields as per the API response
}
interface DeleteCommentResponse {
  data: {
    message: string;
  };
}

interface Info {
  id: string; // Replace with the correct type if it's not a string
  user_id?: string; // Add other fields as needed
}

interface ApiResponse {
  data: Replay[]; // Adjust based on the actual API structure
}

interface AllReplayProps {
  info: Info;
}

const AllReplay: React.FC<AllReplayProps> = ({ info }) => {
  const token = getCookie("token");

  const [dataReplay, setDataReplay] = useState<Replay[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchAllReplayByRequestId = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          `${process.env.local}/replay/req/${info.id}`
        );
        setDataReplay(res.data.data); // TypeScript now knows `res.data` contains `data: Replay[]`
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllReplayByRequestId();
  }, [info]);
  const deleteComment = async (idComment: string) => {
    try {
      const res = await axios.delete<DeleteCommentResponse>(
        `${process.env.local}/replay/${idComment}`
      );
      console.log(res.data.data);
      toast.success("This request is deleted");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <aside>
        <div className="flex items-center mt-3">
          <button
            onClick={() => setShow((prev) => !prev)}
            className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-accent100 focus:z-10 focus:ring-4 focus:ring-gray-100 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700"
          >
            Replay ({dataReplay.length})
          </button>
        </div>
      </aside>
      {show && (
        <div className="border-l-2 pt-1 pl-2 border-black">
          {dataReplay.map((replay) => (
            <div key={replay.id} className="mt-5">
              <article
                className="w-full rounded-md p-4 shadow-lg bg-bg200 mb-5"
                id={replay.id}
              >
                <div className="flex justify-between">
                  <SomeInfo info={replay} />
                  {token ? (
                    token === info.user_id ? (
                      <div className="flex gap-2 text-3xl">
                        <MdDeleteForever
                          className="text-accent100 hover:text-accent200 duration-300 cursor-pointer "
                          onClick={() => deleteComment(replay.id)}
                        />
                        {/* <TbEdit className="text-primary100 hover:text-primary200 duration-300 cursor-pointer" /> */}
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>

                <p className="mb-3 text-gray-500 :text-gray-400">
                  {replay.replay}
                </p>
              </article>
            </div>
          ))}
          <AddReplay request_id={info.id} />
        </div>
      )}
    </>
  );
};

export default AllReplay;
