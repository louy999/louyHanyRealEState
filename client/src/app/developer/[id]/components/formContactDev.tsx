/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import axios from "axios";

const FormContactDev = ({ dataDev }: any) => {
  const [number, setPhoneNumber] = useState("");
  const [des, setDes] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // تعريف شكل البيانات القادمة من API
  interface FormResponse {
    data: {
      number: string;
    };
  }

  const fetchAddForm = async () => {
    if (name === "") {
      setErr("⚠️ Please enter your name.");
      return;
    }
    if (number === "") {
      setErr("⚠️ Please enter your phone number.");
      return;
    }
    if (des === "") {
      setErr("⚠️ Please enter your message.");
      return;
    }

    try {
      setErr("");
      setLoading(true);

      const res = await axios.post(`${process.env.local}/form`, {
        name,
        number,
        des: `${dataDev.id} ${des}`,
      });

      console.log("Response from API:", res.data);

      // فرض نوع البيانات لتجنب خطأ TypeScript
      const responseData = res.data as FormResponse;

      if (responseData?.data?.number) {
        setErr(
          `✅ Your request has been received successfully! Your request number is ${responseData.data.number}. We will contact you soon.`
        );
      } else {
        setErr("❌ Unexpected response from the server.");
      }
    } catch (error: any) {
      console.error("API Error:", error);
      setErr(
        error.response?.data?.message ||
          "❌ Failed to send the request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md w-full shadow-md relative md:-translate-y-[100px] bg-bg300 h-fit">
      <Image
        className="w-full h-fit"
        src={`${process.env.img}/image/${dataDev.image_developer}`}
        width={1000}
        height={1000}
        alt="Developer Image"
      />
      <h2 className="text-xl font-bold p-4">
        Contact the sales department of {dataDev ? dataDev.name : "loading..."}{" "}
      </h2>
      <div className="px-4 pb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full my-3 p-2 border border-black rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <PhoneInput
          country={"eg"}
          value={number}
          onChange={(value) => setPhoneNumber(value)}
          inputStyle={{
            width: "100%",
            borderRadius: "8px",
          }}
        />
        <textarea
          rows={3}
          onChange={(e) => setDes(e.target.value)}
          value={des}
          className="block mb-3 p-2.5 border border-black resize-none w-full text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-3"
          placeholder="Your message..."
        ></textarea>

        {loading ? (
          <button
            type="button"
            className="text-white bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={fetchAddForm}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            Send
          </button>
        )}

        <div className="capitalize">{err}</div>
      </div>
    </div>
  );
};

export default FormContactDev;
