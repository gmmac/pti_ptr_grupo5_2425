import { useEffect, useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import { useCart } from "../../contexts/CartProvider";

import { Button } from "react-bootstrap";

export default function PaymentForm() {
	const cartContext = useCart();

	if (!cartContext) {
		return <p>Erro: CartContext não disponível</p>;
	}

	const { totalPrice } = cartContext;

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
				return_url: import.meta.env.VITE_URL + "/payment/confirmed",
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
		<form id="payment-form" className="d-flex flex-column gap-3">
			<PaymentElement options={{ layout: "tabs" }} />
			<Button
				disabled={isProcessing || !stripe || !elements}
				id="submit"
				className="rounded-pill py-2 fs-5"
				style={{
					backgroundColor: "var(--variant-one)",
					border: "none",
					fontFamily: "var(--title-font)",
				}}
				onClick={handleSubmit}
			>
				{isProcessing ? "Processing..." : `Pay ${totalPrice}€`}
			</Button>
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
}
