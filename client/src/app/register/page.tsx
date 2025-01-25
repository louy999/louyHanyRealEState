"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

// Define the response type
interface RegisterResponse {
  data: {
    data: {
      name: string;
      phone: string;
      email: string;
      password: string;
    };
  };
}

const RegisterPage = () => {
  const [phone, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsInput, setErrorsInput] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // API Request for login
  const RegisterFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.post<RegisterResponse>(
        `${process.env.local}/users`,
        {
          name,
          phone,
          password,
          email,
          access: "",
          image_profile: "",
        }
      );

      console.log("Register Successful:", res.data.data);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Register Failed:",
        setErr(error.response?.data?.message || "An error occurred")
      );
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
      name: name.trim() === "",
      email: email.trim() === "",
      phone: phone.trim() === "",
      password: password.trim() === "",
    };
    setErrorsInput(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      RegisterFetch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute left-0 top-0 h-screen w-full md:w-7/12">
        <Image
          src="https://images.unsplash.com/photo-1696491917387-62a7895af261?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-10/12 md:w-[55%] lg:w-[30%] z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <div className="flex gap-5">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errorsInput.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorsInput.email && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your email.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errorsInput.name ? "border-red-500" : ""
              }`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errorsInput.name && (
              <p className="text-red-500 text-sm mt-1">
                Please enter your name.
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number
          </label>
          <PhoneInput
            country={"eg"}
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

        {loading ? (
          <button
            disabled
            className="py-2.5 px-5 font-medium bg-gray-400 w-full flex rounded-lg justify-center text-white text-md items-center"
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
          >
            Register
          </button>
        )}
        {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
        <div className="text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
