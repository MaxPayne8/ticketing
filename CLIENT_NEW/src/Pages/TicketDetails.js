import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/use-request";

const TicketDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const { doRequest, errors } = useRequest({
    url: "/api/orders/",
    method: "post",
    body: { ticketId: ticket.id },
    onSuccess: (order) => {
      navigate(`/order/${order.id}`);
    },
  });

  const getTicketDetails = async () => {
    try {
      const { data } = await axios.get("/api/tickets/" + id);
      setTicket(data);
      console.log(data);

      // if (data.userId) {
      //   const { data: userDet } = await axios.post("/api/users/getuser", {
      //     userId: data.userId,
      //   });
      //   setUserEmail(userDet.email); // Assuming the user data includes email
      //  }
    } catch (error) {
      console.error("Error fetching ticket details", error);
    }
  };

  useEffect(() => {
    getTicketDetails();
  }, []);

  return (
    <div>
      <h1>{ticket.title}</h1>
      <p>{ticket.price}</p>

      <button
        className="text-slate-200 bg-slate-950 rounded-lg"
        onClick={doRequest}
      >
        Purchase
      </button>
      {errors}
    </div>
  );
};

export default TicketDetails;
