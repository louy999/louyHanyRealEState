"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SomeInfo from "./SomeInfo";
import AllReplay from "./AllReplay";
import { getCookie } from "cookies-next/client";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import LoadingComment from "./loadingComment";

interface DeleteCommentResponse {
  data: {
    message: string;
  };
}

interface FetchCommentsResponse {
  data: {
    id: string;
    user_id: string;
    request: string;
    date: string;
  }[];
}
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const AllComments = () => {
  const [loading, setLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [dataFetchComment, setDataFetchComment] = useState<
    FetchCommentsResponse["data"]
  >([]);
  const [newReq, setNewReq] = useState("");

  const token = getCookie("token");

  const DeleteComment = async (idComment: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await axios.delete<DeleteCommentResponse>(
        `${process.env.local}/req/${idComment}`
      );
      toast.success("This request is deleted");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllComment = async () => {
    setLoading(false);
    try {
      const res = await axios.get<FetchCommentsResponse>(
        `${process.env.local}/req`
      );
      setDataFetchComment(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };
  useEffect(() => {
    fetchAllComment();
    socket.on("all_com", () => {
      fetchAllComment();
    });
  }, []);

  const updateCommentFetch = async (id: string) => {
    try {
      await axios.patch(`${process.env.local}/req/${id}`, {
        request: newReq,
        id,
      });
      toast.success("Comment updated successfully!");

      setEditCommentId(null); // Exit edit mode
      socket.on("all_com", () => {
        fetchAllComment();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        dataFetchComment
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((comment) => (
            <section
              className="w-full rounded-md p-4 shadow-lg bg-white mb-5 overflow-hidden"
              id={`comment-${comment.id}`}
              key={comment.id}
            >
              <div className="flex relative gap-5 justify-between">
                <SomeInfo info={comment} />
                {token && token === comment.user_id && (
                  <div className="flex gap-2 text-3xl">
                    <MdDeleteForever
                      className="text-accent100 hover:text-accent200 duration-300 cursor-pointer"
                      onClick={() => DeleteComment(comment.id)}
                    />
                    <TbEdit
                      className="text-primary100 hover:text-primary200 duration-300 cursor-pointer"
                      onClick={() => {
                        setEditCommentId(comment.id);
                        setNewReq(comment.request);
                      }}
                    />
                  </div>
                )}
              </div>
              {editCommentId === comment.id ? (
                <>
                  <textarea
                    id="chat"
                    value={newReq}
                    rows={3}
                    onChange={(e) => setNewReq(e.target.value)}
                    className="block mx-4 p-2.5 resize-none border-black border-2 w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message..."
                  ></textarea>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 ml-4"
                    onClick={() => updateCommentFetch(comment.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg mt-2 ml-2"
                    onClick={() => setEditCommentId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <p className="mb-3 text-gray-500">{comment.request}</p>
              )}
              <AllReplay info={comment} />
            </section>
          ))
      ) : (
        <LoadingComment />
      )}
    </>
  );
};

export default AllComments;
