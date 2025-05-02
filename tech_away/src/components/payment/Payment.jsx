import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import api from "../../utils/axios";
import PaymentForm from "./PaymentForm";
import { useCart } from "../../contexts/CartProvider";

export default function Payment() {
	const cartContext = useCart();

	if (!cartContext) {
		return <p>Erro: CartContext não disponível</p>;
	}

	const { totalPrice } = cartContext;

	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		if (!stripePromise) {
			api.get("/api/payment/config").then(async (r) => {
				const { publishableKey } = await r.data;
        
				const stripe = await loadStripe(publishableKey);
				setStripePromise(stripe);
			});
		}

		api
			.post("/api/payment/create-payment-intent", { totalPrice: totalPrice })
			.then(async (r) => {
				const { clientSecret } = await r.data;
				setClientSecret(clientSecret);
			});
	}, [totalPrice]);

	return (
		<>
			{stripePromise && clientSecret && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<PaymentForm />
				</Elements>
			)}
		</>
	);
}
