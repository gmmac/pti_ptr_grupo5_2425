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
			className="p-2  border-bottom"
			style={{ fontFamily: "var(--body-font)" }}
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

			<Row>
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
					<Row className="mb-2">
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
