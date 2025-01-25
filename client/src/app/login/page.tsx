"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [phone, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSure, setLoadingSure] = useState(false);
  const [errorsInput, setErrorsInput] = useState({
    phone: false,
    password: false,
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // API Request for login
  interface LoginResponse {
    data: {
      id: string;
      token: string;
      name: string;
      phone: string;
      image_profile: string;
    };
  }
  useEffect(() => {
    const fetchSureToken = async () => {
      setLoadingSure(true);
      try {
        const res = await axios.get(
          `${process.env.local}/users/${getCookie("token")}`
        );
        console.log(res.data.data);

        if (res.data.data === undefined) {
          deleteCookie(token);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingSure(false);
      }
    };
    if (getCookie("token")) {
      fetchSureToken();
    }
  }, []);

  const LoginFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>(
        `${process.env.local}/users/auth`,
        {
          phone,
          password,
        }
      );
      setCookie("token", res.data.data.id);
      router.push("/");

      // You can add navigation logic after successful login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login Failed:", setErr(error.response.data.message));
      setTimeout(() => {
        setErr("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Handle login button click
  const handleLogin = () => {
    const newErrors = {
      phone: phone.trim() === "",
      password: password.trim() === "",
    };
    setErrorsInput(newErrors);

    // Call LoginFetch only if no errors
    if (!newErrors.phone && !newErrors.password) {
      LoginFetch();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute right-0 top-0 h-screen w-full  md:w-7/12 ">
        <Image
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          layout="fill" // Ensures the image fills the div
          objectFit="cover" // Ensures the image covers the space
          priority={true}
        />{" "}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 z-10 relative">
        {loadingSure && (
          <div className="bg-black z-10 w-full h-full absolute left-0 top-0 bg-opacity-70 rounded-lg flex justify-center items-center text-white">
            Loading...
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        {/* Phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number
          </label>
          <PhoneInput
            country={"eg"} // Default country set to US
            value={phone}
            onChange={(value) => setPhoneNumber(value)}
            inputStyle={{
              width: "100%",
              borderRadius: "8px",
              border: errorsInput.phone ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {errorsInput.phone && (
            <p className="text-red-500 text-sm mt-1">
              Please enter your phone number.
            </p>
          )}
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full px-4 py-2 border rounded-lg outline-none ${
              errorsInput.password ? "border-red-500" : ""
            }`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorsInput.password && (
            <p className="text-red-500 text-sm mt-1">
              Please enter your password.
            </p>
          )}
        </div>
        {/* Login Button */}
        {loading ? (
          <button
            disabled
            type="button"
            className="py-2.5 px-5 me-2 font-medium bg-accent100 w-full flex rounded-lg border justify-center text-white text-md items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-gray-200 animate-spin "
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
                fill="#014e60"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-accent100 text-white py-2 rounded-lg hover:bg-text200 transition duration-300 mb-4"
          >
            Login
          </button>
        )}
        {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
        {/* Register Hyperlink */}
        <div className="text-center">
          <Link href="/register" className="text-primary100 hover:underline">
            Don&apos;t have an account? Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
