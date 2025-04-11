import React, { useEffect, useState } from "react";
import { Button, Stack, Image } from "react-bootstrap";
import { Heart, Cart } from "react-bootstrap-icons";
import { Tag } from "primereact/tag";
import { useCart } from "../../contexts/CartProvider";

export default function UsedEquipmentCard({ usedEquipment }) {
	const { addItemToCart } = useCart();

	return (
		<Stack
			direction="vertical"
			style={{
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
				borderRadius: "var(--rounded-sm)",
				padding: "16px",
			}}
			gap={2}
			className="rounded-sm p-4 justify-content-center align-items-center"
		>
			{/* Informações do tipo e marca */}
			<Stack direction="horizontal" gap={2} className="justify-content-between">
				<Stack
					direction="horizontal"
					className="justify-content-center align-items-center"
					gap={2}
				>
					<i className="pi pi-tag" style={{ color: "var(--dark-grey)" }}></i>
					<p className="m-0">{usedEquipment.price}€</p>
				</Stack>
				<Tag
					value={usedEquipment?.EquipmentStatus?.state}
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
					{usedEquipment?.Store?.name}
				</h5>
				<Stack direction="horizontal" gap={2}>
					<Button
						className="rounded-pill"
						style={{ backgroundColor: "var(--variant-two)", border: "none" }}
					>
						<Heart size={20} style={{ color: "var(--white)" }} />
					</Button>
					<Button
						className="rounded-pill"
						style={{ backgroundColor: "var(--variant-two)", border: "none" }}
						onClick={() => {
							addItemToCart(usedEquipment.id);
						}}
					>
						<Cart size={20} style={{ color: "var(--white)" }} />
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
}
