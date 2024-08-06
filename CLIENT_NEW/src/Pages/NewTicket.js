// SignUpPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/use-request";
// import { useAuth } from "../Utils/AuthContext";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: { title, price },
    onSuccess: async () => {
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
        <label className="font-semibold text-xl text-slate-900">Title</label>
        <input
          className="border-black border-2 p-2 rounded"
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="font-semibold text-xl text-slate-900">Price</label>
        <input
          className="border-black border-2 p-2 rounded"
          type="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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

export default NewTicket;
