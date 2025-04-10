import React, { useState, useEffect } from "react";
import { Button, Stack, Modal } from "react-bootstrap";
import ItemCart from "./ItemCart";
import { useCart } from "../../contexts/CartProvider";

export default function OffCanvasCart() {
	const [showModal, setShowModal] = useState(false);
	const {
		removeItemFromCart,
		numCartItems,
		totalPrice,
		cartItems,
		isCartOpen,
		closeCart,
		clearCart,
	} = useCart();
	if (!isCartOpen) return null;

	const onClickClearAll = () => {};
	return (
		<>
			<div
				className="cart-overlay"
				onClick={closeCart}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background: "rgba(0, 0, 0, 0.5)" /* Fundo escuro semi-transparente */,
					zIndex: "2",
					transition: "opacity 0.3s ease-in-out",
				}}
			></div>
			<Stack
				style={{
					backgroundColor: "var(--white)",
					color: "var(dark-grey)",
					fontFamily: "var(--body-font)",
					position: "fixed",
					right: "0",
					top: "0",
					width: "400px",
					height: "95%",
					transition: "transform 0.3s ease-in-out",
					zIndex: "3",
				}}
				className="p-4 m-3 rounded-sm"
				gap={3}
			>
				<Stack
					direction="horizontal"
					className="justify-content-between border-bottom pb-1"
				>
					<h5>Cart({numCartItems})</h5>
					<Button
						onClick={closeCart}
						style={{ background: "none", border: "none" }}
					>
						<i
							className="pi pi-times"
							style={{ color: "var(--dark-grey)" }}
						></i>
					</Button>
				</Stack>
				<Stack direction="horizontal" className="justify-content-end">
					<Button
						className="m-0 me-3 p-0"
						style={{
							fontFamily: "var(--body-font)",
							textDecoration: "underline",
							opacity: numCartItems == 0 ? "50%" : "100%", // Altera a opacidade com base em numCartItems
							fontSize: "15px",
							cursor: numCartItems == 0 ? "not-allowed" : "pointer", // Cursor mude para "not-allowed" quando desabilitado
							background: "none",
							border: "none",
							color:
								numCartItems == 0 ? "var(--light-grey)" : "var(--dark-grey)", // Altere a cor para indicar desabilitação
						}}
						onClick={() => setShowModal(true)}
						disabled={numCartItems == 0}
					>
						Clean cart
					</Button>
				</Stack>
				<Stack
					direction="vertical"
					style={{
						maxHeight: "100%",
						overflowY: "scroll",
						overflowX: "hidden",
					}}
				>
					{cartItems ? (
						cartItems.map((item, index) => (
							<ItemCart
								key={index}
								equipment={item}
								onRemove={removeItemFromCart}
							/>
						))
					) : (
						<p className="text-center">Cart is empty :(</p>
					)}
				</Stack>
				<Stack
					direction="horizontal"
					className="justify-content-between align-items-center border-top pt-2"
				>
					<h5 className="m-0">Total Price</h5>{" "}
					<h5 className="m-0">{totalPrice}€</h5>
				</Stack>
				<Button
					className="rounded-pill py-2 fs-5"
					style={{
						backgroundColor: "var(--variant-one)",
						border: "none",
						fontFamily: "var(--title-font)",
					}}
				>
					Pay
				</Button>
			</Stack>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Stack direction="horizontal" gap={3}>
						<i className="pi pi-exclamation-triangle"></i>
						<p className="m-0">Are you sure you want to clear the cart?</p>
					</Stack>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="rounded-pill"
						variant="secondary"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button
						className="rounded-pill"
						style={{
							backgroundColor: "var(--danger)",
							border: "none",
						}}
						onClick={() => {
							clearCart();
							setShowModal(false);
						}}
					>
						Remove
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
