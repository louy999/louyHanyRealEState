/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Link from "next/link";
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

  interface LoginResponse {
    data: {
      id: number;
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
        const res = await axios.get<LoginResponse>(
          `${process.env.local}/users/${getCookie("token")}`
        );

        if (!res.data || !res.data.data) {
          deleteCookie("token");
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
  }, [router]);

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
      setCookie("token", res.data.data.id.toString());
      router.push("/");
    } catch (error: any) {
      console.error("Login Failed:", error.response?.data?.message);
      setErr(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setErr("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    const newErrors = {
      phone: phone.trim() === "",
      password: password.trim() === "",
    };
    setErrorsInput(newErrors);

    if (!newErrors.phone && !newErrors.password) {
      LoginFetch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute right-0 top-0 h-screen w-full md:w-7/12">
        <Image
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 z-10 relative">
        {loadingSure && (
          <div className="bg-black z-10 w-full h-full absolute left-0 top-0 bg-opacity-70 rounded-lg flex justify-center items-center text-white">
            Loading...
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
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
        <button
          onClick={handleLogin}
          className="w-full bg-accent100 text-white py-2 rounded-lg hover:bg-text200 transition duration-300 mb-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {err && <p className="text-red-500 text-sm mt-1">{err}</p>}
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
