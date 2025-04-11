import React from "react";
import { useCart } from "../../contexts/CartProvider";
import { Stack } from "react-bootstrap";
import ItemCart from "./ItemCart";

export default function OnCanvasCart() {
	const cartContext = useCart();

	if (!cartContext) {
		return <p>Erro: CartContext não disponível</p>;
	}

	const { removeItemFromCart, totalPrice, cartItems } =
		cartContext;

	return (
		<Stack gap={2}>
			<Stack direction="horizontal" gap={2}>
				<h5
					className="rounded-circle d-flex align-items-center justify-content-center"
					style={{
						width: "35px",
						height: "35px",
						backgroundColor: "var(--variant-two)",
						color: "white",
					}}
				>
					1
				</h5>
				<h5> View your cart</h5>
			</Stack>

			{cartItems ? (
				<Stack
					className="flex-grow-1 overflow-y"
					style={{
						height: "450px",
						overflowY: "scroll",
						overflowX: "hidden",
					}}
				>
					{cartItems.map((item, index) => (
						<ItemCart
							key={index}
							equipment={item}
							onRemove={removeItemFromCart}
						/>
					))}
				</Stack>
			) : (
				<Stack className="justify-content-center">
					<p>Cart is empty :(</p>
				</Stack>
			)}
			<Stack
				direction="horizontal"
				className="justify-content-between align-items-center border-top pt-2"
			>
				<h5 className="m-0">Total Price</h5>{" "}
				<h5 className="m-0">{totalPrice}€</h5>
			</Stack>
		</Stack>
	);
}
