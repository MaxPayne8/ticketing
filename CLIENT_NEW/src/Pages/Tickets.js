import React, { Children, useEffect, useState } from "react";
import { useAuth } from "../Utils/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import TicketCard from "../Components/TicketCard";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const { currentUser } = useAuth();
  console.log(currentUser);
  const fetchAllTickets = async () => {
    const tickets = await axios.get("/api/tickets");
    console.log(tickets.data);
    setTickets(tickets.data);
  };
  useEffect(() => {
    fetchAllTickets();
  }, []);
  return (
    <>
      {currentUser ? (
        <div>
          <Link to="/ticket-new">
            <div>Create a new Ticket!</div>
          </Link>
          <div>
            Tickets
            <div className="flex gap-10 p-10">
              {tickets.map((tkt) => (
                <Link to={`/ticket/${tkt.id}`}>
                  <TicketCard title={tkt.title} price={tkt.price} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Sign In First</div>
      )}
    </>
  );
};

export default Tickets;
