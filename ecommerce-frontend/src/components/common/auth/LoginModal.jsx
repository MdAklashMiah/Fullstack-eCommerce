"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userInfo } from "@/slices/userSlice";
import { useRouter } from "next/navigation";

const LoginModal = ({ isOpen, onClose, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const modalRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  // outside click
  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", JSON.stringify(res.data.token));
      dispatch(userInfo(res.data.data));
      onClose();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-[999]">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md px-6 py-8 rounded-xl shadow-xl relative"
      >
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            className="border px-4 py-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border px-4 py-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-secondary text-white py-3 rounded-lg">
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            No account yet?{" "}
            <button
              type="button"
              className="underline"
              onClick={openSignup}
            >
              Create Account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
