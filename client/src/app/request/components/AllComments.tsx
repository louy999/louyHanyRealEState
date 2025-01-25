"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SomeInfo from "./SomeInfo";
import AllReplay from "./AllReplay";
import { getCookie } from "cookies-next/client";
import { MdDeleteForever } from "react-icons/md";
// import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
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
const AllComments = () => {
  const [loading, setLoading] = useState(false);
  const [dataFetchComment, setDataFetchComment] = useState<
    FetchCommentsResponse["data"]
  >([]);

  const token = getCookie("token");
  const DeleteComment = async (idComment: string) => {
    try {
      const res = await axios.delete<DeleteCommentResponse>(
        `${process.env.local}/req/${idComment}`
      );
      console.log(res.data.data.message);
      toast.success("This request is deleted");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
    fetchAllComment();
  }, []);

  return (
    <>
      {loading ? (
        dataFetchComment
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((comment) => (
            <section
              className="w-full rounded-md p-4 shadow-lg bg-white mb-5"
              id={comment.id}
              key={comment.id}
            >
              <div className="flex gap-5 justify-between">
                <SomeInfo info={comment} />
                {token ? (
                  token === comment.user_id ? (
                    <div className="flex gap-2 text-3xl">
                      <MdDeleteForever
                        className="text-accent100 hover:text-accent200 duration-300 cursor-pointer "
                        onClick={() => DeleteComment(comment.id)}
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
                {comment.request}
              </p>
              <AllReplay info={comment} />
            </section>
          ))
      ) : (
        <>
          <div
            role="status"
            className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 mb-5"
          >
            <div className="flex items-center mt-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 :text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full :bg-gray-700"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700"></div>

            <span className="sr-only">Loading...</span>
          </div>
          <div
            role="status"
            className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6  mb-5"
          >
            <div className="flex items-center mt-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 :text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full :bg-gray-700"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700"></div>

            <span className="sr-only">Loading...</span>
          </div>
          <div
            role="status"
            className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 "
          >
            <div className="flex items-center mt-4">
              <svg
                className="w-10 h-10 me-3 text-gray-200 :text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full :bg-gray-700"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full :bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full :bg-gray-700"></div>

            <span className="sr-only">Loading...</span>
          </div>
        </>
      )}
    </>
  );
};

export default AllComments;
