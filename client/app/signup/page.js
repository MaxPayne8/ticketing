"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useRequest from "@/hooks/use-request";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.push("/"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  const getData = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-2 border-2 border-slate-400 p-10 rounded-lg text-slate-900"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xl text-slate-200">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xl text-slate-200">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors}
        <button className="bg-red-500 text-slate-100 mx-auto rounded-lg w-20 my-4">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Page;
