import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../hooks/use-request";

const OrderCreated = () => {
  const [ordData, setOrdData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const { ordId } = useParams();
  const navigate = useNavigate();

  const getOrderDetails = async () => {
    try {
      const { data } = await axios.get("/api/orders/" + ordId);
      setOrdData(data);
    } catch (error) {
      console.error("Error fetching order details", error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  useEffect(() => {
    if (!ordData) return;

    const findTimeLeft = () => {
      const secLeft = (new Date(ordData.expiresAt) - new Date()) / 1000;
      setTimeLeft(Math.max(0, Math.round(secLeft)));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [ordData]);
  const { currentUser } = useAuth();
  const { doRequest, errors } = useRequest({
    url: "/api/payments/",
    method: "post",
    body: { orderId: ordData?.id },
    onSuccess: (payment) => {
      navigate("/orders");
    },
  });

  return (
    <div>
      <div>OrderCreated</div>
      <div>
        <div>
          <StripeCheckout
            token={({ id }) => {
              doRequest({ token: id });
            }}
            stripeKey="pk_test_51PW0RRP4AoCC8Kc9yoblKAEU88bvEX95eRKI86sQ72o6cjlVdgJSdSezdFTH2V0qx5otJ5EVO7IRWjkMvJtGLlhE00i0AxsiGH"
            amount={ordData?.ticket?.price * 100}
            email={currentUser?.email}
          />
        </div>
        {timeLeft !== null && timeLeft === 0 ? (
          <h1>Order Expired</h1>
        ) : (
          <h1>{timeLeft} seconds</h1>
        )}
      </div>
    </div>
  );
};

export default OrderCreated;
