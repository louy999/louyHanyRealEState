"use client";
import { useState } from "react";
import { getCookie } from "cookies-next/client";
import axios from "axios";
import { toast } from "react-toastify";
interface RequestResponse {
  data: {
    id: string;
  };
}
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const AddRequest = () => {
  const token = getCookie("token");
  const [request, setRequest] = useState("");
  const [err, setErr] = useState(false);

  const addRequestFetch = async () => {
    if (token) {
      if (request) {
        try {
          const res = await axios.post<RequestResponse>(
            `${process.env.local}/req`,
            {
              request,
              user_id: token,
            }
          );
          toast.success("this request is done");
          window.location.hash = `comment-${res.data.data.id}`;
          // window.location.reload();
          socket.emit("add_request");
          setRequest("");
        } catch (error) {
          console.log(error);
        }
      } else {
        setErr(true);
        setTimeout(() => {
          setErr(false);
        }, 4000);
      }
    } else {
      toast.error("please login");
    }
  };

  return (
    <div className="w-full flex justify-center items-center p-2">
      <form
        className="mb-10 w-full md:w-3/4 lg:w-2/4 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 :bg-gray-700">
          {/* <button
          type="button"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 :text-gray-400 :hover:text-white :hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              fill="currentColor"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
            />
          </svg>
          <span className="sr-only">Upload image</span>
        </button> */}

          <textarea
            id="chat"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            rows={3}
            className={`block mx-4 p-2.5  resize-none w-full text-sm text-gray-900 bg-white rounded-lg ${
              err
                ? "border-2 border-red-500 animate__animated animate__shakeX"
                : "border border-black"
            } focus:ring-blue-500 focus:border-blue-500 `}
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            onClick={addRequestFetch}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 :text-blue-500 :hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequest;
