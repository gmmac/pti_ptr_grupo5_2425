import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, Image, Modal } from "react-bootstrap";
import { Tag } from "primereact/tag";
import { useCart } from "../../contexts/CartProvider";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function UsedEquipmentCard({ usedEquipment }) {
	const { user } = useAuth();
	const { addItemToCart } = useCart();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const navigate = useNavigate();

	const handleAddToCart = () => {
		if (!user) {
			console.log("User not logged in, showing login modal");

			setShowLoginModal(true);
			return;
		}
		addItemToCart(usedEquipment.ID);
	};
	const handleCloseModal = () => setShowLoginModal(false);
	const handleGoToLogin = () => navigate("/login");

	return (
		<>
			<Stack
				direction="vertical"
				style={{
					fontFamily: "var(--body-font)",
					color: "var(--dark-grey)",
					backgroundColor: "var(--white)",
					boxShadow: "var(--shadow-default)",
					borderRadius: "var(--rounded-sm)",
					padding: "16px",
					minHeight: "270px",
				}}
				gap={2}
				className="rounded-sm p-4 justify-content-between align-items-center"
			>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-between"
				>
					<Stack
						direction="horizontal"
						className="justify-content-center align-items-center"
						gap={2}
					>
						<i className="pi pi-tag" style={{ color: "var(--dark-grey)" }}></i>
						<p className="m-0">{usedEquipment?.Price}€</p>
					</Stack>
					<Tag
						value={usedEquipment?.State}
						rounded
						style={{
							backgroundColor: "var(--variant-one)",
							fontFamily: "var(--body-font)",
						}}
					/>
				</Stack>

				{/* Imagem do equipamento */}
				<Image
					src="../../public/assets/ip.png"
					className="w-50"
					style={{
						objectFit: "cover",
						mixBlendMode: "darken",
					}}
				/>

				{/* Preço e botões de interação */}
				<Stack
					direction="horizontal"
					className="justify-content-between align-items-center"
					gap={2}
				>
					{/* Nome do equipamento */}
					<h5
						style={{
							color: "var(--variant-two)",
							fontFamily: "var(--title-font)",
						}}
						className="m-0 text-bold"
					>
						{usedEquipment?.Store}
					</h5>

					<Stack direction="horizontal" gap={2}>
						<Button
							className="px-3 rounded-pill d-flex justify-content-center align-items-center"
							style={{
								backgroundColor: "var(--variant-two)",
								border: "none",
								color: "var(--white)",
							}}
						>
							<i className="pi pi-heart" style={{ fontSize: "1.2rem" }}></i>
						</Button>
						<Button
							className="px-3 rounded-pill d-flex justify-content-center align-items-center"
							style={{
								backgroundColor: "var(--variant-two)",
								border: "none",
								color: "var(--white)",
							}}
							onClick={handleAddToCart}
						>
							<i
								className="pi pi-shopping-cart"
								style={{ fontSize: "1.2rem" }}
							></i>
						</Button>
					</Stack>
				</Stack>
			</Stack>
			<Modal show={showLoginModal} onHide={handleCloseModal} centered>
				<Modal.Header closeButton>
					<Modal.Title>Login Required</Modal.Title>
				</Modal.Header>
				<Modal.Body>You need to log in to add items to your cart.</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleCloseModal}
						className="rounded-pill"
					>
						Cancel
					</Button>
					<Button
						onClick={handleGoToLogin}
						className="rounded-pill"
						style={{
							backgroundColor: "var(--variant-two)",
							border: "none",
						}}
					>
						Go to Login
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
