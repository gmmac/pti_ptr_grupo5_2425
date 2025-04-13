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
	if (!cartContext) return <p>Erro: CartContext não disponível</p>;

	const { totalPrice, putPurchaseInBd } = cartContext;

	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isReady, setIsReady] = useState(false); // <- flag para saber quando PaymentElement está pronto

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsProcessing(true);

		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: import.meta.env.VITE_URL + "/payment/confirmed",
			},
			redirect: "if_required", // só redireciona se necessário
		});
		console.log(paymentIntent?.status);

		if (error) {
			setMessage(error.message);
		} else if (paymentIntent?.status === "succeeded") {
			console.log("peepeepoopoo");

			await putPurchaseInBd(); // <- guarda no backend
			setMessage("Compra criada com sucesso!");
		} else {
			setMessage("Um erro inesperado ocorreu.");
		}

		setIsProcessing(false);
	};

	return (
		<form id="payment-form" className="d-flex flex-column gap-3">
			<PaymentElement
				options={{ layout: "tabs" }}
				onReady={() => setIsReady(true)} // <- ainda mais seguro
			/>
			<Button
				disabled={!isReady || isProcessing || !stripe || !elements}
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
