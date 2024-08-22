import React, { useEffect, useState } from "react";
import useRequest from "../hooks/use-request";

const Orders = () => {
  const [orders, setOrder] = useState([]);
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "get",
    onSuccess: (orders) => {
      setOrder(orders);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul className="flex flex-wrap p-4 gap-4">
        {orders.map((order) => (
          <li key={order.id} className="border-2 border-black ">
            <h4 className="text-xl font-semibold">{order.ticket.title}</h4>
            <p>Price: {order.ticket.price}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
