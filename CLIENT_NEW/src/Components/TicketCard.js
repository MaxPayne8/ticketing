import React from "react";

const TicketCard = ({ title, price }) => {
  return (
    <div className="flex justify-center flex-col items-center bg-gray-400 border-2 border-slate-900 h-48 w-48 gap-4">
      <h1 className="font-semibold">{title}</h1>
      <h1 className="text-blue-800">${price}</h1>
    </div>
  );
};

export default TicketCard;
