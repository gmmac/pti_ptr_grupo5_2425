import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: import.meta.env.VITE_APP_URL + "/payment/confirmed",
        },
      });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Um erro inesperado ocorreu.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <StripeForm />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        {isProcessing ? "Processando..." : "Pagar"}
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
