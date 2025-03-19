import React from "react";
import { Card, Image, Stack } from "react-bootstrap";

export default function UsedEquipmentCard({ usedEquipment }) {
	return (
		<Card
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
				borderRadius: "var(--rounded-sm)",
				border: "none",
			}}
			className=""
		>
			<Card.Img
				variant="top"
				src="../../public/assets/ip.png"
				className="w-50 mx-auto mt-3"
				style={{ objectFit: "cover", mixBlendMode: "darken" }}
			/>
			<Card.Body className="ps-4">
				<Card.Title style={{ color: "var(--variant-two" }}>
					{usedEquipment?.Store?.name || "Nome da Loja"}
				</Card.Title>
				<Card.Text>
					<Stack direction="vertical" style={{ color: "var(--dark-gray)" }}>
						<p className="m-0">
							Estado: {usedEquipment?.EquipmentStatus?.state || "Desconhecido"}
						</p>
						<p className="m-0">
							Preço:{" "}
							{usedEquipment?.price
								? `${usedEquipment.price}€`
								: "Não disponível"}
						</p>
					</Stack>
				</Card.Text>
			</Card.Body>
		</Card>
		// 	<Stack
		// 		direction="vertical"
		// 		gap={3}
		// 		style={{ width: "260px", overflow: "hidden" }}
		// 	>
		// 		<Image
		// 			src="../../public/assets/ip.png"
		// 			style={{ objectFit: "cover" }}
		// 			className="rounded-sm img-fluid"
		// 		/>
		// 		<Stack
		// 			direction="vertical"
		// 			className="ps-3"
		// 			style={{ color: "var(--dark-gray)" }}
		// 		>
		// 			<p className="m-0">{usedEquipment?.Store?.name}</p>
		// 			<p className="m-0">{usedEquipment?.EquipmentStatus?.state}</p>
		// 			<p className="m-0">{usedEquipment?.price}</p>
		// 		</Stack>
		// 	</Stack>
	);
}
