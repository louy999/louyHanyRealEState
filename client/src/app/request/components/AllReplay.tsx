import React, { useEffect, useState } from "react";
import axios from "axios";
import SomeInfo from "./SomeInfo";
import AddReplay from "./addReplay";
import { getCookie } from "cookies-next/client";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

interface Replay {
  id: string; // Replace with the actual type of `id`
  replay: string;
  user_id: string; // Add fields as per the API response
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
import { io } from "socket.io-client";
import { TbEdit } from "react-icons/tb";
const socket = io("http://localhost:5000");

const AllReplay: React.FC<AllReplayProps> = ({ info }) => {
  const token = getCookie("token");
  const [openEditInput, setOpenEditInput] = useState(false);
  const [newRep, setNewRep] = useState("");
  const [dataReplay, setDataReplay] = useState<Replay[]>([]);
  const [show, setShow] = useState(false);

  const fetchAllReplayByRequestId = async () => {
    try {
      const res = await axios.get<ApiResponse>(
        `${process.env.local}/replay/req/${info.id}`
      );
      setDataReplay(res.data.data);
      console.log(res.data.data);

      socket.on("all_rep", () => {
        fetchAllReplayByRequestId();
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAllReplayByRequestId();
  }, [info]);
  const deleteComment = async (idComment: string) => {
    try {
      const res = await axios.delete<DeleteCommentResponse>(
        `${process.env.local}/replay/${idComment}`
      );
      console.log(res.data.data);
      toast.success("This request is deleted");
      fetchAllReplayByRequestId();
    } catch (error) {
      console.log(error);
    }
  };
  const updateReplayFetch = async (id: string) => {
    try {
      const res = await axios.patch(`${process.env.local}/replay/${id}`, {
        replay: newRep,
        id: id,
      });
      console.log(res.data);
      toast.success("Comment updated successfully!");
      setOpenEditInput(false);
      fetchAllReplayByRequestId();
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
                    token === replay.user_id ? (
                      <div className="flex gap-2 text-3xl">
                        <MdDeleteForever
                          className="text-accent100 hover:text-accent200 duration-300 cursor-pointer "
                          onClick={() => deleteComment(replay.id)}
                        />
                        <TbEdit
                          onClick={() => {
                            setOpenEditInput(true);
                            setNewRep(replay.replay);
                          }}
                          className="text-primary100 hover:text-primary200 duration-300 cursor-pointer"
                        />
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
                {openEditInput ? (
                  <>
                    <textarea
                      id="chat"
                      value={newRep}
                      rows={3}
                      onChange={(e) => setNewRep(e.target.value)}
                      className="block mx-4 p-2.5 resize-none border-black border-2 w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your message..."
                    ></textarea>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 ml-4"
                      onClick={() => updateReplayFetch(replay.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-2 ml-2"
                      onClick={() => setOpenEditInput(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <p className="mb-3 text-gray-500 :text-gray-400">
                    {replay.replay}
                  </p>
                )}
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
