// SignUpPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/use-request";
import { useAuth } from "../Utils/AuthContext";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: async () => {
      await getCurrentUser(); // Fetch the current user
      navigate("/tickets"); // Redirect to /tickets page on success
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-2 border-2 border-slate-400 p-10 rounded-lg text-slate-900"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xl text-slate-900">Email</label>
        <input
          className="border-black border-2 p-2 rounded"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="font-semibold text-xl text-slate-900">Password</label>
        <input
          className="border-black border-2 p-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors}
        <button
          className="bg-red-500 text-slate-100 mx-auto rounded-lg w-20 my-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
