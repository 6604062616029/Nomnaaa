import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = useEcomStore((state) => state.token);
  const clearCart = useEcomStore((state) => state.clearCart);

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message);
    } else if (payload.paymentIntent.status === "succeeded") {
      saveOrder(token, payload)
        .then(() => {
          clearCart();
          toast.success("Payment Success!!!");
          navigate("/user/history");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error saving order");
        });
    } else {
      toast.warning("ชำระเงินไม่สำเร็จ");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form className="space-y-6 p-6 bg-white rounded-lg shadow-md" id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>
      {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
    </form>
  );
}
