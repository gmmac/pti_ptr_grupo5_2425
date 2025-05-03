import React, { useEffect, useState } from "react";
import {
	Button,
	Col,
	Container,
	Image,
	Row,
	Stack,
	Modal,
} from "react-bootstrap";
import { Tag } from "primereact/tag";

export default function ItemCart({ equipment, onRemove }) {
	const [showModal, setShowModal] = useState(false);

	const handleRemove = () => {
		onRemove(equipment.lineId);
		setShowModal(false);
	};
	useEffect(() => {
		console.log(equipment);
	}, []);
	return (
		<Container
			className="p-2  border-bottom"
			style={{ fontFamily: "var(--body-font)", position: "relative" }}
		>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Stack direction="horizontal" gap={3}>
						<i className="pi pi-exclamation-triangle"></i>
						<p className="m-0">
							Are you sure you want to remove{" "}
							<strong>{equipment.modelName}</strong> from cart?
						</p>
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
						onClick={handleRemove}
					>
						Remove
					</Button>
				</Modal.Footer>
			</Modal>
			{/* se estiver comprado*/}
			{(equipment.purchaseDate || !equipment.putOnSaleDate) && (
				<Stack
					direction="vertical"
					className="justify-content-center align-items-center"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(16, 16, 18, 0.7)",
						color: "#fff",
						zIndex: 10,
					}}
				>
					<p className="mb-3 text-center">This equipment is not available</p>

					<Button
						style={{ backgroundColor: "var(--danger)", border: "none" }}
						className="rounded-pill d-flex justify-content-center align-items-center gap-2"
						onClick={handleRemove}
					>
						<i className="pi pi-trash"></i>
						<p className="m-0">Remove from cart</p>
					</Button>
				</Stack>
			)}
			<Row
				style={{
					filter: equipment.purchaseDate ? "grayscale(100%)" : "none",
					opacity: equipment.purchaseDate ? 0.6 : 1,
					pointerEvents: equipment.purchaseDate ? "none" : "auto",
				}}
			>
				<Col
					className="d-flex justify-content-center align-items-center"
					xs={4}
					sm={4}
					md={4}
					lg={4}
				>
					<Image
						src={`../../../public/assets/pc.jpg`}
						width={100}
						style={{
							mixBlendMode: "darken",
						}}
					/>
				</Col>
				<Col>
					<Stack direction="verrical" className="align-items-start">
						<p className="m-0">{equipment.modelName}</p>
						<p>{equipment.price} €</p>
						<Tag
							style={{
								backgroundColor: "var(--variant-one)",
								fontFamily: "var(--body-font)",
							}}
							value={equipment.statusName}
						></Tag>
					</Stack>
				</Col>
				<Col
					xs={3}
					sm={3}
					md={3}
					lg={3}
					className="d-flex flex-column justify-content-between align-items-center"
				>
					<Button
						onClick={() => setShowModal(true)}
						style={{ background: "none", border: "none" }}
						className="d-flex justify-content-center align-items-start"
					>
						<i
							className="pi pi-times"
							style={{ color: "var(--dark-grey)" }}
						></i>
					</Button>

					<Button
						className="rounded-circle d-flex justify-content-center align-items-center"
						style={{
							backgroundColor: "var(--variant-two)",
							border: "none",
							width: "35px",
							height: "35px",
							padding: 0,
						}}
					>
						<i className="pi pi-heart"></i>
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
