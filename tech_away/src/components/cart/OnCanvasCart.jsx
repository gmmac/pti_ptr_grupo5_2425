import React from "react";
import { useCart } from "../../contexts/CartProvider";
import { Stack } from "react-bootstrap";
import ItemCart from "./ItemCart";

export default function OnCanvasCart() {
	const cartContext = useCart();

	if (!cartContext) {
		return <p>Erro: CartContext não disponível</p>;
	}

	const { removeItemFromCart, numCartItems, totalPrice, cartItems } =
		cartContext;

	return (
		<Stack gap={2}>
			<Stack direction="horizontal" gap={2}>
				<h5
					className="border rounded-circle d-flex align-items-center justify-content-center"
					style={{ width: "35px", height: "35px" }}
				>
					1
				</h5>
				<h5> View your cart</h5>
			</Stack>

			{cartItems ? (
				<Stack
					className="flex-grow-1 overflow-y"
					style={{
						maxHeight: "100%",
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
				"nada"
			)}
		</Stack>
	);
}
