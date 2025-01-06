"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image";

const LoginPage = () => {
  const [phone, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorsInput, setErrorsInput] = useState({
    phone: false,
    password: false,
  });

  // API Request for login
  const LoginFetch = async () => {
    try {
      const res = await axios.post(`${process.env.local}/users/auth`, {
        phone,
        password,
      });
      console.log("Login Successful:", res.data);
      // You can add navigation logic after successful login
    } catch (error) {
      console.error("Login Failed:", error);
      alert("An error occurred during login. Please try again.");
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
      <div className="absolute left-0 top-0 h-screen w-2/4">
        <Image
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          layout="fill" // Ensures the image fills the div
          objectFit="cover" // Ensures the image covers the space
          priority={true} // Ensures the image loads faster
        />{" "}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone Number
          </label>
          <PhoneInput
            country={"us"} // Default country set to US
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
        <button
          onClick={handleLogin}
          className="w-full bg-accent100 text-white py-2 rounded-lg hover:bg-text200 transition duration-300 mb-4"
        >
          Login
        </button>

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
