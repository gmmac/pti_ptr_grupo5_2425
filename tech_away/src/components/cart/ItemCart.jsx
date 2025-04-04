import React, { useState } from "react";
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
		onRemove(equipment.id);
		setShowModal(false);
	};

	return (
		<Container
			className="background-white rounded-sm p-4"
			style={{ boxShadow: "var(--shadow-default)" }}
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
						Cancelar
					</Button>
					<Button
						className="rounded-pill"
						style={{
							backgroundColor: "var(--danger)",
							border: "none",
						}}
						onClick={handleRemove}
					>
						Remover
					</Button>
				</Modal.Footer>
			</Modal>

			<Row>
				<Col className="d-flex justify-content-center align-items-center">
					<Image
						src={`../../../public/assets/pc.jpg`}
						width={100}
						style={{
							mixBlendMode: "darken",
						}}
					/>
				</Col>
				<Col>
					<Row className="mb-2">
						<Stack direction="verrical" className="align-items-start">
							<h5>{equipment.modelName}</h5>
							<p>{equipment.price} EUR</p>
							<Tag
								style={{
									backgroundColor: "var(--variant-one)",
									fontFamily: "var(--body-font)",
								}}
								value={equipment.statusName}
							></Tag>
						</Stack>
					</Row>
					<Row>
						<Stack
							direction="horizontal"
							className="justify-content-end"
							gap={2}
						>
							<Button
								className="rounded-circle"
								style={{
									backgroundColor: "var(--variant-two)",
									border: "none",
								}}
							>
								<i className="pi pi-heart"></i>
							</Button>
							<Button
								onClick={() => setShowModal(true)}
								className="rounded-circle"
								style={{ backgroundColor: "var(--danger)", border: "none" }}
							>
								<i className="pi pi-trash"></i>
							</Button>
						</Stack>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
